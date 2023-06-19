import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext()


export function CartContextProvider(props){

    const [cartId, setcartId] = useState(null)
    const [numOfCartItems, setnumOfCartItems] = useState(0)


    async function callCarts(){
        let response = await getCart()
        // console.log(response);

       if(response.data.status === 'success'){
        setcartId(response?.data?.data?._id)
        setnumOfCartItems(response?.data?.numOfCartItems)
        
       }
    }

    useEffect(()=>{
        callCarts()
    } , [])

    let headers = {
       token : localStorage.getItem('userToken')
    }

    function addToCart(id){
       return  axios.post(`https://route-ecommerce.onrender.com/api/v1/cart` , {
            "productId": id 
        } , {
            headers
        }).then((response)=> response)
        .catch((error)=> error)
    }


    function getCart(){
        return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart` , {
           headers
        }).then((response)=> response)
        .catch((error)=> error)
        // setcartId()
      }
    

      function removeProduct(productId){
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}` , {
           headers
        }).then((response)=> response)
        .catch((error)=> error)
      }


      function updateProductCount(productId , count){
        return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}` ,{ 
            count : count 
        }, {
           headers
        }).then((response)=> response)
        .catch((error)=> error)
      }


      function checkOutPayment(cartId , shippingAddress){
        return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000` ,{ 
            shippingAddress : shippingAddress 
        }, {
           headers
        }).then((response)=> response)
        .catch((error)=> error)
      }

      function deleteCart(productId , count){
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart` ,{
           headers
        }).then((response)=> response)
        .catch((error)=> error)
      }


    return <cartContext.Provider value={{setnumOfCartItems , numOfCartItems , cartId ,addToCart , getCart , removeProduct , updateProductCount , deleteCart , checkOutPayment}}>
        {props.children}
    </cartContext.Provider>
}