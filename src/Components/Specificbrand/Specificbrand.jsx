import React, { useEffect, useState } from 'react'
import styles from './Specificbrand.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function Specificbrand() {
  let params = useParams()
  // console.log(params.id);

  const [isloading, setisloading] = useState(true)


  const [specific, setspecific] = useState(null)

  async function getSpecificCategory(id){
    let {data}= await axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${id}`)
    console.log(data);
    setspecific(data)
    setisloading(false)
  }


  useEffect(()=>{
    let id = params.id
    getSpecificCategory(id)
  } , [])

  return (
    <>

{isloading ?  <div className='loadingPage'><div className="lds-circle"><div></div></div></div>
    : <div className='mt-5 container'>
    <div className="row align-items-center">
      <div className="col-4">
        <img className='w-100' alt='' src={specific?.data?.image}/>
      </div>
      <div className="col-8">
        <div className="txt ms-4">
          <p>Name : <span className='text-main'>{specific?.data?.name}</span></p>
          <p>Slug : <span className='text-main'>{specific?.data?.slug}</span></p>
          <p>Update at : <span className='text-main'>{specific?.data?.updatedAt}</span></p>
        </div>
      </div>
    </div>
  </div> }
    
    </>
  )
}
