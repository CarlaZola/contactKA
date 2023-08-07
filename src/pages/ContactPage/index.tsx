/* eslint-disable @typescript-eslint/no-floating-promises */

import ListContacts from "../../components/Contacts"
import ModalCreate from "../../components/Modal/ModalCreate"
import { ContactContext } from "../../context/ContactContext"
import { useContext } from "react"
import Home from "./contactPage"
import { UserContext } from "../../context/UserContext"
import { ToastContainer } from "react-toastify"
import ModalUpdate from "../../components/Modal/ModalUpdate"
import { useNavigate } from "react-router-dom"
import ModalDelete from "../../components/Modal/ModalDelete"
import ModalReport from "../../components/Modal/ModalReport"
import ModalUserDelete from "../../components/Modal/ModalUserDelete"


const ContactPage = () => {

    const { user, setUser, setEditUser, deleteUser, editUser } = useContext(UserContext)
    const { isOpen, setIsOpen, editingContact, deletingContact, setOpenDetails , getContactsDetails} = useContext(ContactContext)

    const navigate = useNavigate()

    const exitProfile = () => {
      localStorage.removeItem("@token");
      setUser(null);
      navigate("/");
    };

     const details = () => {
        getContactsDetails()
        setOpenDetails(true) 
        setEditUser(user)   
    }

    return (
        <Home>
          <ToastContainer />
          <header>
            <div className="boxHeader">
              <h1>ContactKa</h1>
              <button type="button" onClick={() => details()}>+Detalhes</button>
              <button type="button" onClick={() => exitProfile()}>
                Sair
              </button>
            </div>
          </header>
  
          <main>
            <section className="contentProfileInfo">
              <h2>Olá, {user?.full_name}</h2>
            </section>
    
            {isOpen ? <ModalCreate /> : null}
    
            {editingContact ? <ModalUpdate /> : null}
    
            {deletingContact ? <ModalDelete /> : null} 

            {editUser ? <ModalReport /> : null}

            {deleteUser ? <ModalUserDelete /> : null}
    
            <section className="contentTechs">
              <div className="boxCreateTech">
                <h2>Contatos</h2>
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