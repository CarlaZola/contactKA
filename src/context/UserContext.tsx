import { useNavigate } from "react-router-dom";

import { createContext, useState } from "react";

import { api } from "../services/api";
import { toast } from "react-toastify";
import { TUserRequest, TUserResponse } from "../interfaces/user.interface";
import axios from "axios";




export interface IUser {
    accessToken: string,
    user: TUserResponse,
}
  

// export interface IUserRegisterForm{
//     email: string,
//     password: string,
//     name: string,
//     confirmPassword?: string
// }

export interface IUserLoginForm{
    email: string,
    password: string
}

export interface IDefaultProviderProps{
    children: React.ReactNode   
}


interface IUsercontext{
    user: TUserResponse | null,
    userRegister: (dataRegister: TUserRequest) => Promise<void>,
    userLogin: (dataLogin: IUserLoginForm) => Promise<void>,
    userLogout: () => void
}


export const UserContext = createContext({} as IUsercontext)

export const UserProvider = ({children}: IDefaultProviderProps) => {

    const [user, setUser] = useState<TUserResponse | null>(null)

    const navigate = useNavigate()

    // useEffect(() => {
    //     const id = localStorage.getItem('@id')
    //     if(id){
    //         const userLoad = async() => {
    //             const token = localStorage.getItem('@token')
    //             try{
    //                 const response = await api.get<User>(`/users/${id}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`
    //                     }
    //                 })
    //                 setUser(response.data)
    //                 navigate('/shop')                   
    //             }
    //             catch(error){
    //                 // if((error)){
    //                 //    toast.error(`${error.message}`, {
    //                 //         hideProgressBar: true,
    //                 //         autoClose: 500,                     
    //                 //    })
    //                 // }
    //             }
    //         }
    //         userLoad()
    //     }

    // }, [])

    const userRegister = async(dataRegister: TUserRequest) => {
        try{
             await api.post<IUser>("client", dataRegister)        
            toast.success("Conta criada com sucesso!", {
                hideProgressBar: true,
                autoClose: 500,
                });
                setTimeout(() => {
                navigate(`/`);
                }, 1300);
        }catch(error){     
            console.log(error)           
        }
    }

    const userLogin = async(dataLogin: IUserLoginForm) => {
        try{
            const response = await api.post<IUser>("/login", dataLogin)
            
            localStorage.setItem("@token", response.data.accessToken)
            localStorage.setItem("@id", JSON.stringify(response.data.user.id)) 
            setUser(response.data.user)         
            navigate('/home')
        }
        catch(error){
            if(axios.isAxiosError(error)){
                toast.error("Email ou senha incorretos", {
                    hideProgressBar: true,
                    autoClose: 1000,
                  });
            }           
        }
    }   

    const userLogout = () => {
        setUser(null)
        localStorage.removeItem("@token")
        localStorage.removeItem("@id")
        localStorage.removeItem("@productsInCart")       
        navigate("/")
    }


    return(
       <UserContext.Provider value={{
        user,
        userRegister,
        userLogin,
        userLogout
       }}>
            {children}
       </UserContext.Provider>
    )
}