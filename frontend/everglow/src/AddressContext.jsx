import {AddressContext} from "./contextstore/addressstore"
export const AddressProvider = ({ children }) => {
    const [address, setAddress] = useState(localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")) : {
        country: "",
        city: "",
        state: "",
        postalCode: "",
    });

    return (
        <AddressContext value={{ address, setAddress }}>
            {children}
        </AddressContext>
    );
};