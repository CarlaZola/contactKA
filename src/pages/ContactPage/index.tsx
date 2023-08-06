import ListContacts from "../../components/Contacts"
import ModalCreate from "../../components/Modal/ModalCreate"
import { ContactContext } from "../../context/ContactContext"
import { useContext } from "react"
import Home from "./contactPage"
import { UserContext } from "../../context/UserContext"
import { ToastContainer } from "react-toastify"



const ContactPage = () => {
    const { user } = useContext(UserContext)
    const { isOpen, setIsOpen } = useContext(ContactContext)

    return (
        <Home>
          <ToastContainer />
          <header>
            <div className="boxHeader">
              <h1>ContactKa</h1>
              <button type="button">
                Sair
              </button>
            </div>
          </header>
    
          <main>
            <section className="contentProfileInfo">
              <h2>Olá, {user?.full_name}</h2>
              <p>{user?.phone}</p>
            </section>
    
            {isOpen ? <ModalCreate /> : null}
    
            {/* {editingTech ? <ModalUpdate /> : null}
    
            {deletingTech ? <ModalDelete /> : null} */}
    
            <section className="contentTechs">
              <div className="boxCreateTech">
                <h2>Tecnologias</h2>
                <p onClick={() => setIsOpen(true)}>+</p>
              </div>
              <div className="boxTechsCard">
                <ListContacts />
                </div>
            </section>
          </main>
        </Home>
      );
}

export default ContactPage