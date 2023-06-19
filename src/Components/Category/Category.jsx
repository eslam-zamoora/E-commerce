import React, { useEffect, useState } from 'react'
import styles from './Category.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Category() {


  const [isloading, setisloading] = useState(true)

  const [allCategory, setallCategory] = useState([])

  async function getAllcategories(){
    let response = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    // console.log(response.data.data);
    setallCategory(response.data.data)
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
      {allCategory?.map((category)=> <div key={category?._id} className='col-md-3 col-sm-4'>

        <Link to={`/specificcategory/${category?._id}`}>
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
