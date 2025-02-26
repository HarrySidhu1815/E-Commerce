import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext()

export const ShopContextProvider = (props) => {

    const currency  = '$'
    const delivery_price = 10
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(true)

    const values = {
        products,
        currency,
        delivery_price,
        search,
        setSearch,
        showSearch,
        setShowSearch
    }

    return <ShopContext.Provider value={values}>
        {props.children}
    </ShopContext.Provider>
}