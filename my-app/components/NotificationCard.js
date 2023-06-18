// import { DropdownDivider } from 'flowbite-react/lib/esm/components/Dropdown/DropdownDivider'
import React from 'react'

const NotificationCard = (props) => {
  return (
    <div className='m-4 rounded bg-gray-100 p-2 space-y-3'>
    <p className='font-semibold text-gray-600'>{props.head}</p>
    <p className=' text-gray-700'>{props.content}</p>
  
    {/* <DropdownDivider/> */}
    </div>
  )
}

export default NotificationCard