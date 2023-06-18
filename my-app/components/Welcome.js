import React from 'react'
import { useContext } from 'react'
import { Avatar } from 'flowbite-react'

import { AuthContext } from '@/context/AuthContext'



const Welcome = () => {
    const {address,ensName,ensAvatar} = useContext(AuthContext)
    const visibleAddress = ensName?ensName:address?.slice(0,5) +"..."+address?.slice(-4)

    console.log(ensAvatar)
  return (
    <div>
      <Avatar
        alt={ensName}
        img={ensAvatar}
        rounded
      />
    <div className='text-3xl font-bold text-center w-full m-8 achc'>{`Welcome ${visibleAddress}`}</div>
    </div>
  )
}

export default Welcome