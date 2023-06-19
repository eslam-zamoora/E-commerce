import React, { useEffect, useState } from 'react'
import styles from './Allorders.module.css';
import axios from 'axios';




export default function Allorders() {

  const [allOrders, setallOrders] = useState([])
  const [isloading, setisloading] = useState(true)





  async function getAllOrders(){
    let response = await axios.get(`https://route-ecommerce.onrender.com/api/v1/orders`)
    console.log(response.data);
    setallOrders(response.data.data)
    setisloading(false)
  }

  useEffect(()=>{
    getAllOrders()
  },[])


  return (
    <>

{isloading ?  <div className='loadingPage'><div className="lds-circle"><div></div></div></div>
    :  <div>
    <p className='text-center my-4 h3'>All Orders</p>
    <div className="container">
        <div className="row row-cols-md-2 gy-3  gx-3">
          {allOrders?.map((cart)=>  <div key={cart?.id} className='col box-shadow'>
                  <div className="txt cart">
                    <p>cart id : <span className='text-main'>{cart?.id}</span></p>
                    <p>Number of Cart Items : <span className='text-main'>{cart?.cartItems.length}</span></p>
                    <p>created at : <span className='text-main'>{cart?.createdAt}</span></p>
                    <p>Delivered : {cart?.isDelivered ===true? <span className='text-main'>Yes</span> : <span className='text-danger'>No</span>}</p>
                    <p>Paid : {cart?.isPaid ===true? <span className='text-main'>Yes</span> : <span className='text-danger'>No</span>}</p>
                    <p>Shipping Price : <span className='text-main'>{cart?.shippingPrice}</span></p>
                    <p>Total Order Price : <span className='text-main'>{cart?.totalOrderPrice}</span></p>
                    <p>Last Update : <span className='text-main'>{cart?.updatedAt}</span></p>

                  </div>
          </div>)}
        </div>
    </div>
  </div>}

    
    </>
  )
}
