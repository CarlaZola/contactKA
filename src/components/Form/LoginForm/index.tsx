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

const LoginForm = () => {

    const { register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(schemaLogin)

    })
   
    const { userLogin } = useContext(UserContext)

    const submit:SubmitHandler<TUserLogin> = (data) => {
        console.log(data)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        userLogin(data)
        reset()
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
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
            <button type="submit">Entrar</button>
        </form>
    )
}

export default LoginForm