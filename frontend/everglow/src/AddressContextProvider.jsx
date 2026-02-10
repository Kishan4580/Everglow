import { AddressContext } from "./contextstore/addressstore"
import { useState, useEffect } from "react"

export const AddressContextProvider = ({ children }) => {
    // const [address, setAddress] = useState(() => {
    //     const saved = localStorage.getItem("address");
    //     return saved ? JSON.parse(saved) : {};
    // });
    const [address, setAddress] = useState(localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")) : {
        country: "",
        city: "",
        state: "",
        postalCode: "",
    })

    const updateAddress = (newAddress) => {
        setAddress(prev => {
            const updated = { ...prev };
            // for...of loop se object keys iterate karna
            for (const key of Object.keys(newAddress)) {
                if (key in updated) {
                    updated[key] = newAddress[key]; // match found, update
                } else {
                    updated[key] = newAddress[key]; // new key add
                }
            }
            return updated;
        });
    }

    // localStorage me save karo
    useEffect(() => {
        localStorage.setItem("address", JSON.stringify(address));
    }, [address]);

    return (
        <AddressContext.Provider value={{ address, setAddress, updateAddress }}>
            {children}
        </AddressContext.Provider>
    )
}