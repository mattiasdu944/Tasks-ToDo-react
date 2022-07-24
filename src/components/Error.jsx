import React from 'react'
import { BiError } from "react-icons/bi";
const Error = ({children}) => {
  return (
    <div className='flex items-center gap-3 py-3 px-6 bg-red-500 text-white text-md font-semibold'>
        <BiError/>{children}
    </div>
  )
}

export default Error