import React, { useContext, useEffect, useState } from 'react'
import styles from './Productdetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Slider from 'react-slick';




export default function Productdetails() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  const [isloading, setisloading] = useState(true)


  let {addToCart , setnumOfCartItems} = useContext(cartContext)

  async function addProduct(id){
    let response = await addToCart(id)
    // console.log(response.data);

    if(response?.data?.status === 'success'){
        toast.success(response.data.message)
        setnumOfCartItems(response.data.numOfCartItems)
       }else{
        toast.error("failed to add product" )
       }

  }
  
  const [productData, setproductData] = useState(null)
  let params = useParams()

  async function getProductDeatails(id){

    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    console.log(data);
    setisloading(false)
    setproductData(data.data)
    
  }
  useEffect(() => {
    
    let id = params.id
    // console.log(id);
    getProductDeatails(id)
    // console.log(productData);

  }, [])


  return <>

{isloading ?  <div className='loadingPage'><div className="lds-circle"><div></div></div></div>
    : <div className='row align-items-center container'>
    <div className="col-md-4">
      <div className="img">
        <Slider {...settings}>
          {productData?.images.map((img , index)=><img key={index} src={img} alt='' className='w-100'/>)}
        </Slider>
      </div>
    </div>
    <div className="col-md-8">
      <div className="text">
        <p className='h2'>{productData?.title}</p>
        <span className='text-muted font-sm'>{productData?.brand.name} | {productData?.description}</span> 
        <br/>
        <span className='text-muted'>{productData?.category.name}</span>
        <div className='d-flex justify-content-between mt-3'>
        <p className='text-muted'>{productData?.price}</p>
        <span>  <i className='fas fa-star raiting-color'>  </i>  {productData?.ratingsAverage}</span>
        </div>
        <button className='btn bg-main text-white w-100 mt-3' onClick={()=>addProduct(productData.id)}>+ Add To Cart</button>
      </div>
    </div>
  </div>}
  
  
  </>
  
  
  
}
