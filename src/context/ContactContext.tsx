import { createContext, useEffect, useState } from "react"


export const ContactContext = createContext({} as any)


export const ContactProvider = ({ children }: any) => {

    return(
        <ContactContext.Provider value={{}}>
            {children}
        </ContactContext.Provider>
    )

}