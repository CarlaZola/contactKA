/* eslint-disable @typescript-eslint/no-floating-promises */
import { useContext } from "react";
import { ContactContext } from "../../../context/ContactContext";
import Button from "../../../styles/button";
import { StyledModalDelete } from "../../../styles/modal";

const ModalDelete = () => {
  const { deletingContact, setDeletingContact, contactsDelete, setEditingContact } =
    useContext(ContactContext);

  const remove = () => {
    contactsDelete(deletingContact);
    setDeletingContact(null);
    setEditingContact(null);
  };

  return (
    <StyledModalDelete className="modal">
      <div role="dialog" className="dialog_div">
        <div className="modalHeader">
            <p>Tem certeza que deseja excluir tecnologia?</p>
            <p  className="btnCloseModal"  onClick={() => setDeletingContact(null)}>X</p>
        </div>
        <div className="modalBody">          
            <div className="boxButton">
                <Button className="btnCancel" type="button" onClick={() => setDeletingContact(null)}>
                Cancelar
                </Button>
                <Button className="btnConfirm" type="submit" onClick={() => remove()}>
                    Excluir
                </Button>
            </div>
        </div>
      </div>
    </StyledModalDelete>
  );
};

export default ModalDelete;