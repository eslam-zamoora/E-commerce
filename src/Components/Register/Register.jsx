import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup' ;
import styles from './Register.module.css';




export default function Register() {



  // validation with yup

  let validation = Yup.object({
    name:Yup.string().required('name is required').min(4,'name min is 4').max(10,'name max is 10'),
    email:Yup.string().required('email is required').email('email is invalid'),
    password:Yup.string().required('password is required'),
    rePassword:Yup.string().required('rePassword is required').oneOf([Yup.ref('password')],'password is not matches'),
    phone:Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/,'phone is invalid')
    
  })


  // we use (yub) library above ... replaced the next commented function

  // function validate(values){

  //   let errors = {} ;


  //   if(!values.name){
  //     errors.name = "name is required"
  //   }else if(values.name.length < 4){
  //     errors.name = "name min is 4"
  //   }else if(values.name.length > 10){
  //     errors.name = "name max is 10"
  //   }

  //   if(!values.email){
  //     errors.email = "email is required"
  //   }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
  //     errors.email = "email has contain @ ....."
  //   }
    

  //   if(!values.password){
  //     errors.password = "password is required"
  //   }

  //   if(!values.rePassword){
  //     errors.rePassword = "rePassword is required"
  //   }else if(values.password !== values.rePassword){
  //     errors.rePassword = "password is not match"
  //   }


  //   if(!values.phone){
  //     errors.phone = "phone is required"
  //   }

    
  //     return errors ;





  // }



  // variable is loading ??  &&& if message error

  const[isloading , setisloading] = useState(false)
  const[errormsg , seterrormsg] = useState('')


  // call api

  let navigate = useNavigate();

  async function sendDataForSignUP(values){

      setisloading(true)

     let {data}= await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, values).catch((err)=>{
      setisloading(false)
      seterrormsg(err.response.data.message)
     })

    //  console.log(data);

     if(data.message === 'success'){
      setisloading(false)
      seterrormsg('')
      navigate('/login')
      // console.log(data);
     }
  }

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema:validation ,
    onSubmit: sendDataForSignUP
  })

 
  return (
    <>

      <div className="w-75 m-auto my-4">

          <form onSubmit={formik.handleSubmit}>

              <h3 className='text-center my-3'>Register Now</h3>
              {errormsg.length > 0 ?
              <div className='alert alert-danger'>{errormsg}</div>:null}
              
              <label htmlFor='name'>Name  :</label>
              <input type='text' name='name' id='name' value={formik.values.name} onChange={formik.handleChange} className="form-control mb-3" onBlur={formik.handleBlur}></input>
              {formik.errors.name && formik.touched.name? <div className="alert alert-danger">{formik.errors.name}</div> : null}
              
              

              <label htmlFor='email'>Email  :</label>
              <input type='email' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} className="form-control mb-3" onBlur={formik.handleBlur}></input>
              {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}


              <label htmlFor='password'>Password  :</label>
              <input type='password' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} className="form-control mb-3" onBlur={formik.handleBlur}></input>
              {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}


              <label htmlFor='rePassword'>repassword  :</label>
              <input type='password' name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} className="form-control mb-3" onBlur={formik.handleBlur}></input>
              {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null}

              <label htmlFor='phone'>Phone  :</label>
              <input type='tel' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} className="form-control mb-3" onBlur={formik.handleBlur}></input>
              {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}


              {isloading?<button className='btn bg-main w-100 mt-4' type='submit'><i className='fas fa-spinner fa-spin'></i></button>:
              <button className='btn bg-main w-100 mt-4' disabled={!(formik.isValid && formik.dirty)} type='submit'>Submit</button>}
              
              
              

          </form>



      </div>


    </>
  )
}
