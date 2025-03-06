import { createContext, useState, useEffect } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext()

export const ShopContextProvider = (props) => {

    const currency  = '$'
    const delivery_price = 10
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(true)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()

    const addToCart = async (itemID, size) => {

        if(!size){
            toast.error('Select Product Size')
            return;
        }

        const cartData = structuredClone(cartItems)

        if(cartData[itemID]){

            if(cartData[itemID][size]){

                cartData[itemID][size] += 1

            } else {

                cartData[itemID][size] = 1
            }
        } else {

            cartData[itemID] = {}
            cartData[itemID][size] = 1
        }

        setCartItems(cartData)
    }

    const getCartCount = () => {
        let totalCount = 0
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }

        return totalCount
    }

    const updateQuantity = async (id, size, quantity) => {

        let cartData = structuredClone(cartItems)

        cartData[id][size] = quantity

        setCartItems(cartData)

    }

    const getCartTotal = () => {

        let totalAmount = 0
        for(const items in cartItems){
            let itemInfo = products.find(product => product._id === items)
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                } 
            }
        }
        return totalAmount;
    }

    const getProductData = async () => {
        try {
            
            const response = await axios.get(backend_url + '/api/product/list')

            if(response.data.success){
                setProducts(response.data.products)
            } else{
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    useEffect(()=> {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    }, [])

    const values = {
        products,
        currency,
        delivery_price,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartTotal,
        navigate,
        backend_url,
        token,
        setToken,
        setCartItems
    }

    return <ShopContext.Provider value={values}>
        {props.children}
    </ShopContext.Provider>
}