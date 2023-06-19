import React from 'react'
import styles from './NotFound.module.css';
import err from '../../assets/error.svg'

export default function NotFound() {
  return (
    <>
    <div  className='text-center'>
    <img src={err} alt='' className='my-5'></img>
    </div>
    </>
  )
}
