import { useContext } from "react"
import { ContactContext } from "../../../context/ContactContext"
import StyledCardContacts from "./CardContact"
import { TContact } from "../../../interfaces/contact.interface"

export interface IContactProps {
    cont:TContact;
}

const CardContact = ({cont}: IContactProps) => {

    const { setEditingContact } = useContext(ContactContext)

    return(
        <StyledCardContacts onClick={() => setEditingContact(cont)}>
            <p>
                {cont.full_name}
            </p>
            <p>
                {cont.phone}
            </p>
        </StyledCardContacts>
    )
}

export default CardContact