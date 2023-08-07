/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from "../Input"
import { yupResolver } from "@hookform/resolvers/yup"
import { schemaLogin } from "../../../schemas/userSchema"
import { TUserLogin } from "../../../interfaces/user.interface"
import { UserContext } from "../../../context/UserContext"
import { useContext } from "react"
import Button from "../../../styles/button"
import StyledLoginForm from "./loginForm"

const LoginForm = () => {

    const { register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schemaLogin)

    })
   
    const { userLogin } = useContext(UserContext)

    const submit:SubmitHandler<TUserLogin> = (data) => {
       
        userLogin(data)
        reset()
    }
    return (
        <StyledLoginForm onSubmit={handleSubmit(submit)}>
            <Input
                type="text"
                label="Email"
                register={register("email")}
                error={errors.email}
            />
            <Input
                type="password"
                label="Senha"
                register={register("password")}
                error={errors.password}
            />
            <Button type="submit">Entrar</Button>
        </StyledLoginForm>
    )
}

export default LoginForm