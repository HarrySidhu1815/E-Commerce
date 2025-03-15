import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Product from './pages/Product'
import About from './pages/About'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SeachBar from './components/SeachBar'
import { ToastContainer, toast } from 'react-toastify'
import Verify from './pages/Verify'
// import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SeachBar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
