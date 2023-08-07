import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "../../components/Form/LoginForm"
import StyledLogin from "./login"
import LinkStyle from "../../styles/link";

const LoginPage = () => {
    return (
        <StyledLogin>
            <section>
                <ToastContainer />
                <h1>ContactKA</h1>
                <div className="boxForm">
                <div className="contentLogin">
                    <h2>Login</h2>
                </div>
                <LoginForm />
                <span>Ainda não possui uma conta?</span>
                <LinkStyle to="/register">Cadastre-se</LinkStyle>
                </div>
            </section>
        </StyledLogin>
    )
}

export default LoginPage