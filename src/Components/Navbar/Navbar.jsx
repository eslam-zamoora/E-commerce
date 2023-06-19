import React, { useContext } from 'react'
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/freshcart-logo.svg'
import { cartContext } from '../../Context/CartContext';



export default function Navbar({userData , logout}) {

  let {numOfCartItems} = useContext(cartContext)

  return (
    <>
    <nav className="navbar navbar-expand-sm bg-main-light text-dark">
        <div className="container-fluid mx-4">
        <Link className="nav-link" to="/">
            <img src={logo} alt='' width={120} className="cursor-pointer"></img>
        </Link>
        
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">


          {userData? 
          <ul className="navbar-nav me-auto mt-2 mt-lg-0 ">
          <li className="nav-item">
            <Link className="nav-link active  " to="home" aria-current="page">Home <span className="visually-hidden">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active " to="products" aria-current="page">Products <span className="visually-hidden">(current)</span></Link>
          </li>
          
          <li className="nav-item">
            <Link className="nav-link active " to="brands" aria-current="page">Brands <span className="visually-hidden">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active " to="category" aria-current="page">Category <span className="visually-hidden">(current)</span></Link>
          </li>
         
          
        </ul> : null}
          



          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

            <li className="nav-item d-lg-flex align-items-center me-3 d-md-none d-sm-none cursor-pointer">
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-tiktok'></i>
              <i className='fab mx-2 fa-linkedin'></i>
              <i className='fab mx-2 fa-youtube'></i>
            </li>

            {/* if condition for if user login or no */}


            {userData?
            <>
            <ul className='d-flex align-items-center'>
            <li className="nav-item position-relative mx-2">
            <Link className="nav-link active " to="carts" aria-current="page"><i className="fa-solid fa-cart-plus text-main fs-4"></i> <span className='position-absolute top-0 end-0 bg-info px-1 rounded font-sm'>{numOfCartItems}</span> <span className="visually-hidden">(current)</span></Link>
          </li>
          <li className="nav-item">
            <span className='cursor-pointer' onClick={logout}>logOut</span>
          </li>
            </ul>
            </>
             :

          <>
           <li className="nav-item">
              <Link className="nav-link active" to="register" aria-current="page">Register <span className="visually-hidden">(current)</span></Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="login" aria-current="page">Login <span className="visually-hidden">(current)</span></Link>
            </li>
          
          
          </>
          
          }

           
           
           
            
          </ul>
        </div>
      </div>
    </nav>
    
    </>
  )
}
