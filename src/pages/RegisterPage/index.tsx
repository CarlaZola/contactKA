import { ToastContainer } from "react-toastify"
import RegisterForm from "../../components/Form/RegisterForm"
import LinkStyle from "../../styles/link";
import StyledRegister from "./register";

const RegisterPage = () => {

    return(
        <StyledRegister>
        <section>
          <ToastContainer />
          <div className="navBar">
            <h1>ContactKA</h1>
            <LinkStyle className="linkRegister" to="/">
              Voltar
            </LinkStyle>
          </div>
  
          <div className="contentForm">
            <h2>Crie sua conta</h2>
            <RegisterForm />
          </div>
        </section>
      </StyledRegister>
    )
}

export default RegisterPage