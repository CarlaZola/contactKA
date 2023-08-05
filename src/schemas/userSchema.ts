import { z } from "zod";

// import { contactArray } from "./contact.schema";

const user = z.object({
  id: z.number(),
  full_name: z.string().max(255),
  email: z.string().email("Email inválido").max(120),
  phone: z.string({
    required_error: "Celular inválido",
  }),
  password: z.string({ required_error: "Senha inválida" }).max(200),
  nickname: z.string().nullish().optional(),
  createdAt: z.string(),
  deletedAt: z.string().nullish(),
});

import * as yup from "yup";

const schemaRegister = yup.object({
    full_name: yup
    .string()
    .required("Nome de usuário obrigatório")
    .min(3, "Nome com no mínimo 3 caracteres")
    .max(50, "Seu nome já está grande parça, releva aí"),
    email: yup
    .string()
    .email("Formato de email inválido")
    .required("Email inválido"),
    password: yup
    .string()
    .required("Insira uma senha")
    .matches(/.{6,}/, "Deve conter no mínimo 6 caracteres"),
    confirm: yup
    .string()
    .required("Confirme sua senha")
    .oneOf(
        [yup.ref("password")],
        "As senhas não correspondem"),
    nickname: yup.string().optional(),
    phone: yup.string().required("Digite um contato")
}).required()


const schemaLogin = yup.object({
  email: yup
  .string()
  .email("Formato de email inválido")
  .required("Email inválido"),
  password: yup
  .string()
  .required("Senha inválida")
}).required()


const userResponse = user.omit({ password: true });

// const userReadResponse = userResponse.extend({
//   contacts: contactArray,
// });

// const userUpdateRequest = userRequest.deepPartial();

// const userArrayResponse = z.array(userResponse);

export {
  user,
  schemaRegister,
  schemaLogin,
  userResponse,
  //   userReadResponse,
  //   userArrayResponse,
  //   userUpdateRequest,
};
