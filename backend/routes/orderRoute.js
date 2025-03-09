import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { allOrders, placeOrder, placeOrderStripe, updateOrderStatus, userOrders, verifyStripe } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateOrderStatus)

// Payment Features
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)

// User Features
orderRouter.post('/userorders', authUser, userOrders)

// verify payments
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter