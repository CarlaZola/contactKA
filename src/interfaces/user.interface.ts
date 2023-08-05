import { z } from "zod"
import { userResponse } from "../schemas/userSchema";


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
type TUserResponse = z.infer<typeof userResponse>;

export type {
    TUserRequest,
    TUserResponse,
    TUserLogin
}