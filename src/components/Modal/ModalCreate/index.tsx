import { useContext } from "react";
import { ContactContext } from "../../../context/ContactContext";
import {Modal} from "../../../styles/modal";
import FormCreateContact from "../../Form/FormCreateContact";

const ModalCreate = () => {
  const { setIsOpen } = useContext(ContactContext);

  return (
    <Modal className="modal">
      <div role="dialog" className="dialog_div">
        <div className="modalHeader">
          <h2>Cadastrar Novo Contato</h2>
          <p className="btnCloseModal" onClick={() => setIsOpen(false)}>X</p>
        </div>
        <div className="modalBody">
          <FormCreateContact />
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreate;