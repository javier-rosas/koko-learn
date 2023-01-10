import React from 'react'
import Link from 'next/link'


type SectionName = { 
  section: {
    name: string,
    kebabCaseName: string,
    problems: string[]
  } 
}

function Section({section} : SectionName) {

  return (
    <Link 
      href={`section/${section.kebabCaseName}`}
      className="border-solid border-4 border-black 
                rounded-md flex justify-center 
                items-center bg-gray-300 
                font-bold text-lg hover:bg-yellow-500 
                ring-2 ring-blue-700"> 
       <div className='flex justify-center text-center'>
        { section.name } 
       </div>
    </Link>
    
  )
}

export default Section