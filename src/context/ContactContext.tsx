/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { createContext, useContext, useEffect, useState } from "react"
// import { toast } from "react-toastify";
import { TContact, TContactRequest } from "../interfaces/contact.interface";
import { api } from "../services/api";
import { IDefaultProviderProps, UserContext } from "./UserContext";
import { toast } from "react-toastify";
import { TUserResponse } from "../interfaces/user.interface";

export interface IContactContext {
    contact: TContact[] | null
    isOpen: boolean
    contactsCreate: (dataContact: TContactRequest) => Promise<void>
    loading: boolean
    setIsOpen: (value: React.SetStateAction<boolean>) => void

}

export const ContactContext = createContext({} as IContactContext)

export const ContactProvider = ({ children }: IDefaultProviderProps) => {
    const [contact, setContacts] = useState<TContact[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingTech, setEditingTech] = useState(null);
    const [deletingTech, setDeletingTech] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { user, setUser } = useContext(UserContext)
    
    useEffect(() => { 
        const id = localStorage.getItem('@id')
        if (id) {
        const token = localStorage.getItem("@token");
        console.log(token)
        const instedToken = token!.slice(1, -1);
          const getContacts = async () => {
            try {
              const response = await api.get<TUserResponse>(`client/${id}`, {
                headers: {
                  Authorization: `Bearer ${instedToken}`,
                },
              });
              console.log(response)
              setUser(response.data)
              setContacts(response.data.contacts);
            } catch (error) {
              console.log(error);
            }
          };
          getContacts();
        }
      }, []);
    
    const token = localStorage.getItem("@token");
   
    const contactsCreate = async (dataContact: TContactRequest) => {
      setLoading(true)
      
      const instedToken = token!.slice(1, -1);
      try {
        const response = await api.post("contact", dataContact, {
          headers: {
            Authorization: `Bearer ${instedToken}`,
          },
        });
        toast.success("Tech criada com sucesso!", {
          hideProgressBar: true,
          autoClose: 1000,
        });
        setContacts([ ...contact, response.data]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setIsOpen(false);
      }
    };
  
    // const techsDelete = async (idTech) => {
    //   const token = localStorage.getItem("@token");
    //   try {
    //     const response = await api.delete(`/users/techs/${idTech}`, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     toast.success("Tech Deletada!", {
    //       hideProgressBar: true,
    //       autoClose: 1000,
    //     });
    //     const newTechsList = techs.filter((tech) => tech.id !== idTech);
    //     setTechs(newTechsList);
    //     return response;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  
    // const techsUpdate = async (dataTech, idTech) => {
    //   setLoading(true);
    //   const token = localStorage.getItem("@token");
    //   try {
    //     const response = await api.put(`/users/techs/${idTech}`, dataTech, {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     // const newTechs = techs.map((tech) => {
    //     //   if (idTech === tech.id) {
    //     //     return { ...tech, ...dataTech };
    //     //   } else {
    //     //     return tech;
    //     //   }
    //     // });
    //     toast.success("Tech alterada com sucesso!", {
    //       hideProgressBar: true,
    //       autoClose: 1000,
    //     });
    //     // setTechs(newTechs);
    //     return response;
  
    //   } catch (error) {
    //     console.error(error);
    //   } finally {
    //     setLoading(false);
    //     setEditingTech(null);
    //   }
    // }

    return(
        <ContactContext.Provider value={{
            contact,
            contactsCreate,
            loading,
            isOpen,
            setIsOpen
        }}>
            {children}
        </ContactContext.Provider>
    )
    }