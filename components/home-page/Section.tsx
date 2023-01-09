import React from 'react'

type SectionName = { section: string }

function Section({section} : SectionName) {
  return (
    <div className="relative z-0" >
      <button 
        className="border-solid border-4 border-black 
                  rounded-md flex justify-center 
                  items-center bg-gray-300 absolute 
                  inset-2 font-bold text-lg hover:bg-lime-400 
                  ring-2 ring-blue-700"> 
        { section } 
      </button>
    </div>
  )
}

export default Section