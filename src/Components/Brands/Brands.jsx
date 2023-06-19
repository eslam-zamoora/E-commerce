import React, { useEffect, useState } from 'react'
import styles from './Brands.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Brands() {


  const [isloading, setisloading] = useState(true)

  const [allBrands, setallBrands] = useState([])

  async function getAllcategories(){
    let response = await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
    console.log(response);
    setallBrands(response.data.data)
    setisloading(false)
  }

  useEffect(()=>{
      getAllcategories()
  } , [])


  return (
    <>


{isloading ?  <div className='loadingPage'><div className="lds-circle"><div></div></div></div>
    : <div className='mt-5 container'>
    <div className="row gy-3">
      {allBrands?.map((category)=> <div key={category?._id} className='col-md-2 col-sm-3'>

        <Link to={`/specificbrand/${category?._id}`}>
        <div className="product">
          <img src={category?.image} alt='' className='w-100' height={250}/>
          <p className='text-main text-center mt-2'>{category?.name}</p>
          <p className='text-center'>{category?.slug}</p>
          
        </div>
        </Link>
        
      </div>)}
    </div>

  </div>}
    
    </>
  )
}
