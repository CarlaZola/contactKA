/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { yupResolver } from "@hookform/resolvers/yup"
import { useContext } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import Button from "../../../styles/button"
import { Input } from "../Input"
import spinner from "../../../assets/spinner.svg"
import { updateContact } from "../../../schemas/contact.Schema"
import StyledFormUpdateContact from "../FormUpdateContact/updateContact"
import { TextMaskCustom } from "../InputMask"
import { TContactUpdate } from "../../../interfaces/contact.interface"
import { toast } from "react-toastify";
import { UserContext } from "../../../context/UserContext"


const UpdateUserForm = () => {
    const id = localStorage.getItem('@id')
    const { userUpdate, editUser, setEditUser, loading, setDeleteUser } = useContext(UserContext)

    const {register, handleSubmit, formState: { errors }} = useForm({
        mode: "onBlur",
        defaultValues: {
            full_name: editUser?.full_name,
            phone: editUser?.phone,
            email: editUser?.email,
            nickname: editUser?.nickname
        },
        resolver: yupResolver(updateContact)
    })

    const submitUpdateContact: SubmitHandler<TContactUpdate> = (data) => {
        console.log(editUser.id)
        const oldValues = {
            full_name: editUser?.full_name,
            phone: editUser?.phone,
            email: editUser?.email,
            nickname: editUser?.nickname
        }
        const result: TContactUpdate = {}
        for (const key in oldValues) {      
            if(data[key] !== oldValues[key]) {              
                result[key] = data[key] 
           }
        }
        if(Object.keys(result).length === 0){
            toast.error("Nenhuma alteção realizada!", {
                hideProgressBar: true,
                autoClose: 1000,
            });
            setEditUser(null);

        }else{
            userUpdate(result, editUser.id)
        }
         
    }
        
    
    return(
        <StyledFormUpdateContact onSubmit={handleSubmit(submitUpdateContact)}>
          <div>
                <Input 
                label="Nome"
                id="title"  
                type='text'  
                register={register("full_name")}  
                error={errors.full_name}
                />  

                <Input 
                label="Email"
                id="email"  
                type='text'  
                register={register("email")}  
                error={errors.email}
                />  
          </div>

          <div>
                <TextMaskCustom 
                label="Celular"
                id="phone"  
                type='text'  
                register={register("phone")}  
                error={errors.phone}
                />  

                <Input 
                label="Apelido"
                id="nickname"  
                type='text'  
                register={register("nickname")}  
                error={errors.nickname}
                /> 

                <div className="boxButton">
                    <Button className="btnEditingTech" type="submit">{loading ? <img className="loading" src={spinner}/> : "Salvar"}</Button>
                    <Button className="btnRemoveTech" type="button" onClick={() => setDeleteUser(+(id))}>Deletar</Button>
                </div>
          </div>

           
        </StyledFormUpdateContact>
    )
}


export default UpdateUserForm