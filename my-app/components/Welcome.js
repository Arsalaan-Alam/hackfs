import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'



const Welcome = () => {
    const {address} = useContext(AuthContext)
    const visibleAddress = address?.slice(0,5) +"..."+address?.slice(-4)

  return (

    <div className='text-3xl font-bold text-center w-full m-8'>{`Welcome ${visibleAddress}`}</div>
  )
}

export default Welcome