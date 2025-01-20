import React from 'react'
import { useSelector } from 'react-redux'

function Driver() {
    const {role} = useSelector((state)=>state.UserSlice)
  return (
    <div>
         <h1 className='text-white font-bold'>{role}</h1>
    </div>
  )
}

export default Driver
