import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup' ;
import styles from './Login.module.css';







export default function Login({saveUserData}) {





  // validation with yup

  let validation = Yup.object({
    email:Yup.string().required('email is required').email('email is invalid'),
    password:Yup.string().required('password is required')
  })



  // variable is loading ??  &&& if message error

  const[isloading , setisloading] = useState(false)
  const[errormsg , seterrormsg] = useState('')


  // call api

  let navigate = useNavigate();

  async function sendDataForSignIN(values){
    
      setisloading(true)

     let {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, values).catch((err)=>{
      setisloading(false)
      // console.log(data);
      seterrormsg(err.response.data.message)
     })

    //  console.log(data);

     if(data.message === 'success'){

      localStorage.setItem('userToken' , data.token)
      saveUserData()
      setisloading(false)
      seterrormsg('')
      navigate('/home')
      // console.log(data);
     }
  }

  let formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },
    validationSchema:validation ,
    onSubmit: sendDataForSignIN
  })

 
  return (
    <>

      <div className="w-75 m-auto my-4">

          <form onSubmit={formik.handleSubmit}>

              <h3 className='text-center my-3'>Login</h3>
              {errormsg.length > 0 ?
              <div className='alert alert-danger'>{errormsg}</div>:null}
              
              

              <label htmlFor='email'>Email  :</label>
              <input type='email' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} className="form-control mb-3" onBlur={formik.handleBlur}></input>
              {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}


              <label htmlFor='password'>Password  :</label>
              <input type='password' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} className="form-control mb-3" onBlur={formik.handleBlur}></input>
              {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}


             
              {isloading?<button className='btn bg-main w-100 mt-4' type='submit'><i className='fas fa-spinner fa-spin'></i></button>:
              <button className='btn bg-main w-100 mt-4' disabled={!(formik.isValid && formik.dirty)} type='submit'>Login</button>}
              
              
              

          </form>



      </div>


    </>
  )
}
