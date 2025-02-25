import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext()

export const ShopContextProvider = (props) => {

    const currency  = '$'
    const delivery_price = 10

    const values = {
        products,
        currency,
        delivery_price
    }

    return <ShopContext.Provider value={values}>
        {props.children}
    </ShopContext.Provider>
}