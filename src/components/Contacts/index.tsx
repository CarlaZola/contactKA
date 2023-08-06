import { useContext } from "react"
import { ContactContext } from "../../context/ContactContext"
import CardContact from "./CardContact"
import StyledListContacts from "./listContact"
import { TContact } from "../../interfaces/contact.interface"

const ListContacts = () => {

    const { contact } = useContext(ContactContext)

    return(
        <StyledListContacts>
            {contact!.map((cont: TContact) => {
                return <CardContact key={cont.id} cont={cont}/>
            })}
        </StyledListContacts>
    )
}

export default ListContacts