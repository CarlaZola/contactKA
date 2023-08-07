/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { createContext, useContext, useEffect, useState } from "react"
// import { toast } from "react-toastify";
import { TContact, TContactRequest, TContactUpdate } from "../interfaces/contact.interface";
import { api } from "../services/api";
import { IDefaultProviderProps, UserContext } from "./UserContext";
import { toast } from "react-toastify";
import { TUserResponse } from "../interfaces/user.interface";
import axios, { AxiosResponse } from "axios";


export interface IContactContext {
    contact: TContact[] | null
    isOpen: boolean
    contactsCreate: (dataContact: TContactRequest) => Promise<void>
    loading: boolean
    setIsOpen: (value: React.SetStateAction<boolean>) => void
    editingContact: TContact | null
    setEditingContact: (value: React.SetStateAction<TContact | null>) => void
    contactsUpdate: (dataContact: TContactUpdate, idContact: number) => Promise<AxiosResponse<TContact> | undefined>
    deletingContact: number | null
    setDeletingContact: (value: React.SetStateAction<number | null>) => void
    contactsDelete: (idContact: number) => Promise<AxiosResponse<void> | undefined>
}

export const ContactContext = createContext({} as IContactContext)

export const ContactProvider = ({ children }: IDefaultProviderProps) => {
    const [contact, setContacts] = useState<TContact[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<TContact | null>(null);
    const [deletingContact, setDeletingContact] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const { user, setUser } = useContext(UserContext)
    
    useEffect(() => { 
        const id = localStorage.getItem('@id')
        if (id) {
        const token = localStorage.getItem("@token");
        const instedToken = token!.slice(1, -1);
          const getContacts = async () => {
            try {
              const response = await api.get<TUserResponse>(`client/${id}`, {
                headers: {
                  Authorization: `Bearer ${instedToken}`,
                },
              });
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
        toast.success("Contato criado com sucesso!", {
          hideProgressBar: true,
          autoClose: 1000,
        });
        setContacts([ ...contact, response.data]);
      } catch (error) {
        if(axios.isAxiosError(error)){
          toast.error("email ou nome já estão registrados!", {
              theme: `colored`,
              autoClose: 500,
              position: "top-right",
              hideProgressBar: true,                      
          })
        }
      } finally {
        setLoading(false);
        setIsOpen(false);
      }
    };
  
    const contactsDelete = async (idContact: number) => {
      const token = localStorage.getItem("@token");
      const instedToken = token!.slice(1, -1);
      try {
        const response = await api.delete(`contact/${idContact}`, {
          headers: {
            Authorization: `Bearer ${instedToken}`,
          },
        });
        toast.success("Contato Deletado!", {
          hideProgressBar: true,
          autoClose: 1000,
        });
        const newContactsList = contact.filter((cont) => cont.id !== idContact);
        setContacts(newContactsList);
        return response;
      } catch (error) {
        if(axios.isAxiosError(error)){
          toast.error(`${error.message}`, {
              theme: `colored`,
              autoClose: 500,
              position: "top-right",
              hideProgressBar: true,                      
          })
        }
      }
    };
  
    const contactsUpdate = async (dataContact: TContactUpdate, idContact: number) => {
      setLoading(true);
      const token = localStorage.getItem("@token");    
      const instedToken = token!.slice(1, -1);
      try {
        const response = await api.patch<TContact>(`contact/${idContact}`, dataContact, {
          headers: {
            Authorization: `Bearer ${instedToken}`,
          },
        });
        const newContacts = contact.map((cont: TContact) => {
          if (idContact === cont.id) {
            return { ...cont, ...dataContact };
          } else {
            return cont;
          }
        });
        toast.success("Contato alterado com sucesso!", {
          hideProgressBar: true,
          autoClose: 1000,
        });
        setContacts(newContacts)
        return response
      } catch (error) {
        if(axios.isAxiosError(error)){
          toast.error(error.message, {
              theme: `colored`,
              autoClose: 500,
              position: "top-right",
              hideProgressBar: true,                      
          })
      }
      } finally {
        setLoading(false);
        setEditingContact(null);
      }
    }

    return(
        <ContactContext.Provider value={{
            contact,
            contactsCreate,
            loading,
            isOpen,
            setIsOpen,
            editingContact,
            setEditingContact,
            contactsUpdate,
            setDeletingContact,
            deletingContact,
            contactsDelete

        }}>
            {children}
        </ContactContext.Provider>
    )
    }