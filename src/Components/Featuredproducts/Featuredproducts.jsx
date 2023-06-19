import React, { useContext, useState } from 'react'
import styles from './Featuredproducts.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';




export default function Featuredproducts() {

  const [isloading, setisloading] = useState(true)

  let {setnumOfCartItems , addToCart} = useContext(cartContext)

  async function addProduct(id){
    let response = await addToCart(id)
    console.log(response.data);

    if(response?.data?.status === 'success'){
        toast.success(response.data.message)
        setnumOfCartItems(response.data.numOfCartItems)
       }else{
        toast.error("failed to add product" )
       }

  }

const [products, setproducts] = useState([])

  async function getProducts(){
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
    setproducts(data.data)
    setisloading(false)
    
  }

useEffect(()=>{
  getProducts()
}, [])


  return (
    <>

    {isloading ?  <div className='loadingPage'><div className="lds-circle"><div></div></div></div>
    : <div className="container my-4">
    <div className="row">
      {products.map((product , index)=>  <div className='col-md-3' key={index}>
        
        <div className="product cursor-pointer p-2">
        <Link to={`/productdetails/${product.id}`}>
          <img src={product?.imageCover} alt='' className='w-100'/>
          <span className='text-main'>{product.category.name}</span>
          <h5>{product?.title.split(' ').slice(0,2).join(' ')}</h5>
          <div className='d-flex justify-content-between align-items-center'>
              <span className='text-muted'>{product.price}</span>
              <span><i className='fas fa-star raiting-color'></i> {product.ratingsAverage}</span>
          </div>
          </Link>
          <button className='btn bg-main text-white w-100' onClick={()=> addProduct(product.id)}>+ Add Card</button>

        </div>

        
        
      </div>)}
    </div>
    </div> }
   
    </>
  )
}
