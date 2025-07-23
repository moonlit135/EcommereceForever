import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors({
    origin: [
        'http://localhost:5173', // Frontend local development
        'http://localhost:5174', // Admin local development
        'http://localhost:3000', // Alternative local port
        'https://ecommerece-forever.vercel.app', // Frontend Vercel deployment
        /.*\.vercel\.app$/ // Allow any Vercel deployment (including admin)
    ],
    credentials: true
}))

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API Working")
})

// Test route
app.get('/test',(req,res)=>{
    res.json({
        message: "Backend server is working!",
        timestamp: new Date().toISOString(),
        port: port
    })
})

app.listen(port, () => {
    console.log(`🚀 Server started successfully!`)
    console.log(`📍 Server running at: http://localhost:${port}`)
    console.log(`🧪 Test endpoint: http://localhost:${port}/test`)
    console.log(`📊 API endpoints available at: http://localhost:${port}/api/`)
});
