/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useNavigate } from "react-router-dom";
import jtw_decode from "jwt-decode"
import { createContext, useState, useEffect } from "react";

import { api } from "../services/api";
import { toast } from "react-toastify";
import { TUserRequest, TUserResponse } from "../interfaces/user.interface";
import axios from "axios";

export interface IUser {
    token: string,
}

export interface decode {
    exp: number
    iat: number
    id: number
    sub: string
   
}

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
    isLog: boolean 
    setIsLog: (value: React.SetStateAction<boolean>) => void
    setUser: (value: React.SetStateAction<TUserResponse | null>) => void
}


export const UserContext = createContext({} as IUsercontext)

export const UserProvider = ({children}: IDefaultProviderProps) => {

    const [user, setUser] = useState<TUserResponse | null>(null)
    const [isLog, setIsLog] = useState(false)
    const navigate = useNavigate()
    
    useEffect(() => {
        const token = localStorage.getItem('@token')
        const id = localStorage.getItem('@id')
        const instedToken = token?.slice(1, -1);

        if(token){
            const userLoad = async() => {
                
                try{
                    const response = await api.get<TUserResponse>(`client/${id!}`, {
                        headers: {
                            Authorization: `Bearer ${instedToken!}`
                        }
                    
                    })
                    
                    setUser(response.data)
                    setIsLog(true)           
                    navigate('/home')                   
                }
                catch(error){
                    // if((error)){
                    //    toast.error(`${error.message}`, {
                    //         hideProgressBar: true,
                    //         autoClose: 500,                     
                    //    })
                    // }
                    console.error(error)
                }
            }
            userLoad()
        }
    }, [])

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
            const response = await api.post<IUser>("login", dataLogin)
            localStorage.setItem("@token", JSON.stringify(response.data.token))
            const token = response.data.token
            const decode: decode = jtw_decode(token)
            localStorage.setItem("@id", JSON.stringify(decode.id))   
             
            setIsLog(true)          
            setTimeout(() => {
                navigate(`/home`);
            }, 1300);
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
        userLogout,
        isLog,
        setIsLog,
        setUser
       }}>
            {children}
       </UserContext.Provider>
    )
}