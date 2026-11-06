import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Auth from '../pages/Auth'

function AuthModel({onclose}) {

    const{userData}=useSelector((state)=>state.user)

    useEffect(()=>{
        if(userData){
            onclose()
        }
    },[userData,onclose])

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-black/10 
    backdrop-blur-sm px-4'>
      <div className='relative w-full max-w-md'>
        <button onClick={onclose}
         className='absolute top-8 right-5 text-gray-800 hover:text-black text-xl'>
            <FaTimes size={18}/>
        </button>

        <Auth isModel={true}/>
      </div>
    </div>
  )
}

export default AuthModel
