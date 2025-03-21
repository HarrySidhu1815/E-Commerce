import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
const port = process.env.PORT || 4000

const corsOptions = {
    origin: ['https://forever-admin-silk.vercel.app', 'http://localhost:5173', 'http://localhost:5174','http://localhost:5175'], // Allow requests from your frontend domain
    methods: ['GET', 'POST'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'token', 'origin'], // Allowed headers
  }

connectDB()
connectCloudinary()

app.use(express.json())
app.use(cors(corsOptions))

// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('API is Working')
})

app.listen(port, () => {
    console.log('Server started on port ' + port)
})