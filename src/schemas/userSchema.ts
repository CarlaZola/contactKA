// import { contactArray } from "./contact.schema";

import * as yup from "yup";

const schemaRegister = yup
  .object({
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
      .oneOf([yup.ref("password")], "As senhas não correspondem"),
    nickname: yup.string().optional(),
    phone: yup.string().required("Digite um contato"),
  })
  .required();

const schemaLogin = yup
  .object({
    email: yup
      .string()
      .email("Formato de email inválido")
      .required("Email inválido"),
    password: yup.string().required("Senha inválida"),
  })
  .required();

// const userReadResponse = userResponse.extend({
//   contacts: contactArray,
// });

// const userUpdateRequest = userRequest.deepPartial();

// const userArrayResponse = z.array(userResponse);

export {
  schemaRegister,
  schemaLogin,

  //   userReadResponse,
  //   userArrayResponse,
  //   userUpdateRequest,
};
