import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import ProductListing from './pages/products-listing'
import ProductDetails from './pages/product-details'
import Breadcrumbs from './components/Breadcrumbs'

function App() {

  return (
    <BrowserRouter>
      <div className='App'>
        <h1>Swapnil Store</h1>
        <Breadcrumbs/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<ProductListing/>}/>
          <Route path="/products/:id" element={<ProductDetails/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
