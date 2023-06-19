import React, { useEffect, useState } from 'react'
import styles from './Categoryslider.module.css';
import Slider from 'react-slick';
import axios from 'axios';


export default function Categoryslider() {


  const [isloading, setisloading] = useState(true)

  const [categorySlider, setcategorySlider] = useState([])


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };

  async function getAllcategories(){
    let response = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    // console.log(response.data.data);
    setcategorySlider(response.data.data)
    setisloading(false)
  }

  useEffect(()=>{
      getAllcategories()
  } , [])



  return (
    <>

{isloading ?  <div className='loadingPage'><div className="lds-circle"><div></div></div></div>
    : <div className="container">
    <h2>Category Slider</h2>
    <Slider {...settings}>
      {categorySlider?.map((category , index)=> <div key={index}>
        <img alt='' src={category.image} className='w-100' height={200}/>
        <p className='text-center mt-1 font-sm'>{category?.name}</p>
      </div>)}
    </Slider>
  </div>}
    
    </>
  )
}
