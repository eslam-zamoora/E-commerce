import React, { useContext, useEffect, useState } from 'react'
import styles from './Carts.module.css';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Carts() {

  const [isloading, setisloading] = useState(true)

  const [products, setproducts] = useState([])
  const [price, setprice] = useState('0')

  let {setnumOfCartItems ,getCart , removeProduct , updateProductCount , deleteCart} = useContext(cartContext)


  async function deleteAll(){
    let response = await deleteCart()
    // console.log(response);
    setproducts(response.data.data)
    toast.success('All products removed')
    setprice(0)
    setnumOfCartItems(0)
  }
 
  async function getCartProducts(){
    let response = await getCart()
    console.log(response);
    setisloading(false)
    setprice(response.data?.data.totalCartPrice)
    // console.log(response.data.data.products);


    if(response?.data?.status === 'success'){
      
      setproducts(response.data.data.products)
    }else{
      toast.error('cant arrive to your Cart')
    }
  }

  async function deleteProduct(id){
    let response = await removeProduct(id)
    setproducts(response.data.data.products)
    toast.success('product removed')
    setprice(response.data.data.totalCartPrice)
    setnumOfCartItems(response.data.numOfCartItems)
    console.log(response);

  }


  async function updateQuantity(id , count){
    let response = await updateProductCount(id , count)
    setproducts(response.data.data.products)
    toast.success('product updated')
    setprice(response.data.data.totalCartPrice)

    // console.log(response);
  }


  useEffect(() => {
    getCartProducts()
    // console.log(response);
  }, [])
  

  return (
    <>

{isloading ?  <div className='loadingPage'><div className="lds-circle"><div></div></div></div>
    :  
    <div className="container mt-4 box-shadow">

            <div className="txt my-4">
              <h2 className='text-center mb-4'>Your Cart</h2>
                <div className='d-flex align-items-center justify-content-between'>
                  <div className="info">
                  <p>Number Of Cart Items : <span className='text-main h5'>{products? products.length : '0'} </span></p>
                <p>Total Price : <span className='text-main h5'>{price} </span></p>
                  </div>
                  <div className="delbtn">
                    <button className='btn btn-danger' onClick={deleteAll}>delete all</button>
                  </div>
                </div>
            </div>
      
        
            <div className="productCart">
              {products?.map((product)=><div key={product.product.id} className='row cart mt-3'>
                <div className='col-2'>
                  
                    <div className="img">
                      <img src={product.product.imageCover} alt='' className='w-100'/>
                    </div>
                  
                  </div>
                  <div className="col-10 d-flex justify-content-between align-items-center">
                    <div>
                    <h3 className='h5'>{product.product.title.split(' ').slice(0,4).join(' ')}</h3>
                    <p>price : <span className='text-main'>{product.price}</span></p>
                    <button className='btn m-0 p-0 text-danger' onClick={()=>deleteProduct(product.product.id)}><i className='fa-regular fa-trash-can'></i> remove</button>
                    </div>
                    <div className="counter">
                      <button className='btn outer-main' onClick={()=>updateQuantity(product.product.id , product.count+1)}>+</button>
                      <span className='mx-2'>{product.count}</span>
                      <button className='btn outer-main' onClick={()=>updateQuantity(product.product.id , product.count-1)}>-</button>
                    </div>
                  </div>

                  
              
              </div>)}
              <div>
                    <Link to='/checkout'>
                    <button className='btn btn-success my-5 ms-3'>Pay Online</button>
                    </Link>
                  </div>
            </div>
        
      
    </div>}
    
    </>
  )
}
