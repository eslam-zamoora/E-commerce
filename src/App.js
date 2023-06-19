// import './App.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Carts from './Components/Carts/Carts'
import Brands from './Components/Brands/Brands'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Category from './Components/Category/Category'
import Products from './Components/Products/Products'
import Productdetails from './Components/Productdetails/Productdetails'
import Checkout from './Components/Checkout/Checkout'
import NotFound from './Components/NotFound/NotFound'
import ProtectRoute from './Components/ProtectRoute/ProtectRoute'
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { CartContextProvider } from './Context/CartContext';
import { toast, Toaster } from 'react-hot-toast';
import Allorders from './Components/Allorders/Allorders';
import { Offline, Online } from "react-detect-offline";
import Specificcategory from './Components/Specificcategory/Specificcategory';
import Specificbrand from './Components/Specificbrand/Specificbrand';










function App() {

  
<Toaster/>

  useEffect(()=>{

    if(localStorage.getItem('userToken') !== null){

      saveUserData()
      
      
    }


  },[])


  const[userData , setuserData] = useState(null)

function saveUserData(){

  let encodedData = localStorage.getItem('userToken')
  let decodedData = jwtDecode(encodedData)
  setuserData(decodedData)

}



let routers = createHashRouter([
  {path:'',element:<Layout userData={userData} setuserData={setuserData}/>, children:[
    {path:'',element:<Home/>},
    {path:'home',element:<ProtectRoute> <Home/> </ProtectRoute>},
    {path:'Products',element:<ProtectRoute> <Products/> </ProtectRoute>},
    {path:'carts',element:<ProtectRoute> <Carts/> </ProtectRoute>},
    {path:'Brands',element:<ProtectRoute> <Brands/> </ProtectRoute>},
    {path:'Category',element:<ProtectRoute> <Category/> </ProtectRoute>},
    {path:'allorders',element:<ProtectRoute> <Allorders/> </ProtectRoute>},
    {path:'specificcategory/:id',element:<ProtectRoute> <Specificcategory/> </ProtectRoute>},
    {path:'specificbrand/:id',element:<ProtectRoute> <Specificbrand/> </ProtectRoute>},
    {path:'productdetails/:id',element:<ProtectRoute> <Productdetails/> </ProtectRoute>},
    {path:'checkout',element:<ProtectRoute> <Checkout/> </ProtectRoute>},
    {path:'Register',element:<Register/>},
    {path:'Login',element:<Login saveUserData={saveUserData}/>},
    {path:'*',element:<NotFound/>}
  ]}
])



  return  <CartContextProvider>


<RouterProvider router={routers}></RouterProvider>
<Toaster/>


<Offline><div className='network alert alert-danger'><p className='text-center'>You are currently offline</p> </div></Offline>

  </CartContextProvider>   




  
  
  
}

export default App;
