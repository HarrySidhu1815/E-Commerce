import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

// global Variables
const currency = 'cad'
const delivery_price = 10

// gatewat initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing order using COD
const placeOrder = async(req, res) => {
    
    try {
        
        const {items, address, amount, userId} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            date: Date.now(),
            payment: false
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message: 'Order Placed'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// Placing order using Stripe
const placeOrderStripe = async(req, res) => {
    try {
        const {items, address, amount, userId} = req.body

        const {origin} = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            date: Date.now(),
            payment: false
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: delivery_price * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({success: true, session_url: session.url})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const verifyStripe = async (req, res) => {
    try {
        
        const {userId, success, orderId} = req.body

        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success: true})
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: false})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// All Orders data for admin panel
const allOrders = async(req, res) => {
    
    try {

        const orders = await orderModel.find({})
        res.json({success: true, orders})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// User dorder data for frontend
const userOrders = async(req, res) => {
    
    try {
        
        const { userId } = req.body
    
        const orders = await orderModel.find({ userId })
        res.json({success: true, orders})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

// update order status from admin panel
const updateOrderStatus = async(req, res) => {

    try {
        
        const {userId, status} = req.body
    
        await orderModel.findByIdAndUpdate(userId, {status})
        res.json({success: true, message: 'Status Updated'})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {verifyStripe, placeOrder, placeOrderStripe, allOrders, userOrders, updateOrderStatus}
