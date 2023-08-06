import * as yup from "yup";

export const createContact = yup
  .object({
    full_name: yup.string().required("Nome obrigatório"),
    email: yup.string().required("email obrigatório"),
    phone: yup.string().required("Celular obrigatório"),
    nickname: yup.string().optional(),
  })
  .required();
