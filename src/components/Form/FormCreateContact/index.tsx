/* eslint-disable @typescript-eslint/no-floating-promises */

/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useForm, SubmitHandler } from "react-hook-form"
import { ContactContext } from "../../../context/ContactContext";
import { Input } from "../Input";
import { TContactForm } from "../../../interfaces/contact.interface";
import { createContact } from "../../../schemas/contact.Schema";
import StyledFormCreateContact from "./formCreate";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../styles/button";
import spinner from "../../../assets/spinner.svg"
import { useContext } from "react"
import { TextMaskCustom } from "../InputMask";


const FormCreateTech = () => {

    const {contactsCreate, loading } = useContext(ContactContext)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(createContact),
    });

    const id = localStorage.getItem("@id");
    const submitNewContact: SubmitHandler<TContactForm>= (data) => {
        const contact = {
            ...data,
            userId: +(id)
        } 
        contactsCreate(contact)
        reset()
        
    };
    return (
        <StyledFormCreateContact onSubmit={handleSubmit(submitNewContact)}>
        <div>
            <Input
                id="full_name"
                label="Nome"
                type="text"
                placeholder="nome do contato"
                register={register("full_name")}
                error={errors.full_name}
            />

            <Input
                id="email"
                label="Email"
                type="text"
                register={register("email")}
                error={errors.email}
            />

        </div>
        <div>    
            <TextMaskCustom
                    id="celular"
                    label="Celular"
                    type="text"
                    register={register("phone")}
                    error={errors.phone}
                />

                <Input
                    id="nickname"
                    label="Apelido"
                    type="text"
                    register={register("nickname")}
                    error={errors.nickname}
                />
            <Button className="btnCadaster" type="submit">
                {loading ? <img src={spinner} className="loading" color="black"/> : "Criar Contato"}
            </Button>
       </div>
      
        </StyledFormCreateContact>
    );
};

export default FormCreateTech;