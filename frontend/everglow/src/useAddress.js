import { useContext } from 'react';
import { AddressContext } from '../contextstore/addressstore';
export const useAddress = () => {
    return useContext(AddressContext);
};
