import React from 'react'
import Logo from "../../assets/logo-black-white.svg"

function LoadingComponent() {
  return (
    <main className='h-[70vh] flex items-center justify-center'>
        <img src={Logo} alt="" className='animate-pulse w-10 lg:w-[60px]'/>
    </main>
  )
}

export default LoadingComponent