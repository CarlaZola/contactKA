// import { z } from "zod"
// import { userResponse } from "../schemas/userSchema";
import { TContact } from "./contact.interface";


type TUserRequest = {
    full_name: string 
    email: string
    phone: string 
    password: string 
    confirm: string
    nickname?: string | undefined 
}


type TUserLogin = {
    email: string 
    password: string
}

type TUserUpdate = Partial<TUserRequest> 

type TUserResponse = {
    id: number;
    full_name: string 
    email: string
    phone: string 
    password: string 
    confirm: string
    createdAt: string 
    deletedAt: string | null
    nickname?: string | undefined 
    contacts: Array<TContact>

}

export type {
    TUserRequest,
    TUserResponse,
    TUserLogin,
    TUserUpdate
}