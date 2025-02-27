import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {

    const {getCartTotal, currency, delivery_price} = useContext(ShopContext)

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>SubTotal</p>
                <p>{currency} {getCartTotal()}.00</p>
            </div>
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency} {delivery_price}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b>{currency} {getCartTotal() === 0 ? 0 : getCartTotal() + delivery_price}.00</b>
            </div>
        </div>
      
    </div>
  )
}

export default CartTotal
