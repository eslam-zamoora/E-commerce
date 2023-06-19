import React from 'react'
import styles from './Home.module.css';
import Featuredproducts from '../Featuredproducts/Featuredproducts';
import Categoryslider from '../Categoryslider/Categoryslider';

export default function Home() {
  return (
    <>
    <div className='mt-5'><Categoryslider/></div>
    <div className="container mt-4">
      <h2>Featured Products</h2>
    </div>
    <Featuredproducts/>
    </>
  )
}
