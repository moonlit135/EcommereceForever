import express from 'express'
import {placeOrder, allOrders, userOrders, updateStatus} from '../controllers/orderController.js'
import adminAuth  from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
// orderRouter.post('/stripe',authUser,placeOrderStripe) // Removed Stripe
// orderRouter.post('/razorpay',authUser,placeOrderRazorpay) // Removed Razorpay

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)

// verify payment
// orderRouter.post('/verifyStripe',authUser, verifyStripe) // Removed Stripe
// orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay) // Removed Razorpay

export default orderRouter