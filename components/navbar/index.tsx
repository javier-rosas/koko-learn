import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Navbar() {
  
  return (
    <div className='flex flex-row h-40 place-content-around items-center border-b-4 font-mono'>
      <Link href="/">
        <Image className="invisible sm:visible" alt="logo" src="/logo_transparent.png"  width={200} height={250}/>
      </Link>
      <h1 className='invisible sm:visible sm:mr-16 text-center'> Practice coding interview questions for free! </h1>
      <Link
        href="https://www.linkedin.com/in/javier-rosas-ruiz/"
        className='mr-2 ml-2 text-center h-10 px-2 py-2 border-2 
                  border-black rounded-md 
                  shadow-[5px_5px_0px_0px_rgba(0,0,0)] 
                  hover:shadow transition duration-200 
                  bg-white flex-shrink-0'> 
        Created By Javier Rosas 
      </Link>
    </div>
  )
}

export default Navbar