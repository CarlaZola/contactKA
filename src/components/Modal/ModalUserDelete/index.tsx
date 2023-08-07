/* eslint-disable @typescript-eslint/no-floating-promises */
import { useContext } from "react";
import Button from "../../../styles/button";
import { StyledModalDelete } from "../../../styles/modal";
import { UserContext } from "../../../context/UserContext";

const ModalUserDelete = () => {
  const { deleteUser, setDeleteUser, userDelete, setEditUser } =
    useContext(UserContext);

  const remove = () => {
    userDelete(deleteUser);
    setDeleteUser(null);
    setEditUser(null);
  };

  return (
    <StyledModalDelete className="modal">
      <div role="dialog" className="dialog_div">
        <div className="modalHeader">
            <p>Tem certeza deseja excluir sua conta?</p>
            <p  className="btnCloseModal"  onClick={() => setDeleteUser(null)}>X</p>
        </div>
        <div className="modalBody">          
            <div className="boxButton">
                <Button className="btnCancel" type="button" onClick={() => setDeleteUser(null)}>
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

export default ModalUserDelete;