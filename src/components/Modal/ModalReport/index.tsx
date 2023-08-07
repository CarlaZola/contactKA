import { useContext } from "react";
import {  ModalReportStyled } from "../../../styles/modal";
import { UserContext } from "../../../context/UserContext";
import { ContactContext } from "../../../context/ContactContext";
import UpdateContactForm from "../../Form/FormUpdateUser";

const ModalReport = () => {
    
    const { setOpenDetails } = useContext(ContactContext)
    const { user } = useContext(UserContext)
    

    return (
      <ModalReportStyled className="modal">
        <div role="dialog" className="dialog_div">
          <div className="modalHeader">
            <p>Informações de {user.full_name}</p>
            <p className="btnCloseModal" onClick={() =>setOpenDetails(false)}>
              X
            </p>
          </div>
          <div className="modalBody">
            <UpdateContactForm />
          </div>
        </div>
      </ModalReportStyled>
    );
};
  
  export default ModalReport;