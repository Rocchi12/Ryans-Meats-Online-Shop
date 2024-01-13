import { CheckoutContext } from "../context/CheckoutContext";
import { useContext } from "react";

export const useCheckoutContext = () =>{
    const items = useContext(CheckoutContext)

    if (items === undefined) {
        throw new Error('useCheckoutContext() must be used inside the provider')
    }



    return(items)
}