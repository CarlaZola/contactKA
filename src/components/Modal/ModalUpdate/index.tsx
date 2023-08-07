import { useContext } from "react";
import { ContactContext } from "../../../context/ContactContext";
import { Modal } from "../../../styles/modal";
import UpdateContactForm from "../../Form/FormUpdateContact";

const ModalUpdate = () => {
  const { setEditingContact } = useContext(ContactContext);

  return (
    <Modal className="modal">
      <div role="dialog" className="dialog_div">
        <div className="modalHeader">
          <p>Contato</p>
          <p className="btnCloseModal" onClick={() => setEditingContact(null)}>
            X
          </p>
        </div>
        <div className="modalBody">
          <UpdateContactForm />
        </div>
      </div>
    </Modal>
  );
};

export default ModalUpdate;