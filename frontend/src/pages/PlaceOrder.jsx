import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod')
  const {navigate, backend_url, token, cartItems, setCartItems, getCartTotal, delivery_price, products} = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    postalCode: '',
    province: '',
    country: '',
    phone: ''
  })

  const onChangeHandler = async (e) => {
    const name = e.target.name
    const value = e.target.value

    setFormData(data => ({...data, [name] : value}))
  }

  const onSubmitHandler = async(e) => {
    e.preventDefault()
    try {
      
      let orderedItems = []

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0){
            let itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.sizes = item
              itemInfo.quantity = cartItems[items][item]
              orderedItems.push(itemInfo)
            }
          }
        }
      } 

      let orderedData = {
        items: orderedItems,
        amount: getCartTotal() + delivery_price,
        address: formData
      }

      switch(method){

        // API Call for COD
        case 'cod':
          const response = await axios.post(backend_url + '/api/order/place', orderedData, {headers: {token}})

          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;
        
          case 'stripe':
            const responseStripe = await axios.post(backend_url + '/api/order/stripe', orderedData, {headers: {token}})

            if(responseStripe.data.success){
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
            } else {
              toast.error(responseStripe.data.message)
            }
            break;

        default:
          break;
          }
          

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
 

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* -------------------Left Side-------------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        <div className='text-xl sm:text-2xl my-3'>
            <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
        </div>
        <div className='flex gap-3'>
          <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First Name'/>
          <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name'/>
        </div>

        <input required name="email" value={formData.email} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email address'/>
        <input required name="street" value={formData.street} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street'/>

        <div className='flex gap-3'>
          <input required name="city" value={formData.city} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City'/>
          <input required name="province" value={formData.province} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Province'/>
        </div>

        <div className='flex gap-3'>
          <input required name="postalCode" value={formData.postalCode} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Postal Code'/>
          <input required name="country" value={formData.country} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country'/>
        </div>
        <input required name="phone" value={formData.phone} onChange={onChangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone Number'/>
      </div>

      {/* ----------------Right Side------------------ */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'}/>
          {/* ---------------------- Payment Method -------------------- */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} className='h-5 mx-4'/>
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
