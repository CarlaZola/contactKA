import { yupResolver} from "@hookform/resolvers/yup"
import { useForm, SubmitHandler } from "react-hook-form";
import { TUserRequest } from "../../../interfaces/user.interface";
import { schemaRegister } from "../../../schemas/userSchema";
import { Input } from "../Input";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import {  TextMaskCustom } from "../InputMask";

const RegisterForm = () => {

    const {
        register, handleSubmit,  reset, formState: { errors } } = useForm({
        resolver: yupResolver(schemaRegister),
        mode: 'onBlur',
      });

    const { userRegister } = useContext(UserContext)

    const submit: SubmitHandler<TUserRequest> =  (data) => {
        console.log(data)
        
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        userRegister(data)
        reset()
    };  

    return (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <form onSubmit={handleSubmit(submit)}>
            <Input 
                type='text'
                label='Nome'
                register={register('full_name')}
                error={errors.full_name}
                id="name"
            />
            <Input 
                type='text'
                label='Email'
                register={register('email')}
                error={errors.email}
                id="email"
            />

            <TextMaskCustom 
                type='text'
                label='Celular'
                register={register('phone')}
                error={errors.phone}
                id="phone"
            />

            <Input 
                type='password'
                label='Senha'
                register={register('password')}
                error={errors.password}
                id="password"
            />
            <Input 
                type='password'
                label='Confirmação de Senha'
                register={register('confirm')}
                error={errors.confirm}
                id="confirm"
            />
             <Input 
                type='text'
                label='Apelido'
                register={register('nickname')}
                error={errors.nickname}
                id="nickname"
            />
            <button type="submit">Criar Conta</button>
        </form>
    )
}

export default RegisterForm