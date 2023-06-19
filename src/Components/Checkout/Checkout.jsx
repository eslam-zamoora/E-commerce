import React, { useContext } from 'react'
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';



export default function Checkout() {


  let {checkOutPayment , cartId} = useContext(cartContext)

  async function submitfun(values){
    let response = await checkOutPayment(cartId , values)
    console.log(response);
    if(response.data.status === 'success'){
        window.open(response.data.session.url)
    }else{
      toast.error('failed')
    }
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    },
    onSubmit:submitfun , 
  })


  return (
    <>
    <div>
      <div className="container">
        <form onSubmit={formik.handleSubmit} className='box-shadow p-3 mt-5 rounded'>
          <label htmlFor='details' className='mt-3'>details</label>
          <input type='text' className='form-control' name='details' id='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>

          <label htmlFor='phone' className='mt-4'>phone</label>
          <input type='tel' className='form-control' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>

          <label htmlFor='city' className='mt-4'>city</label>
          <input type='text' className='form-control' name='city' id='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}></input>

          <button type='submit' className='btn btn-info w-100 my-4'>Submit</button>

        </form>
      </div>
    </div>
    </>
  )
}
