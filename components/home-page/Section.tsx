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
    <div className="relative z-0" >
      <Link 
        href={`section/${section.kebabCaseName}`}
        className="border-solid border-4 border-black 
                  rounded-md flex justify-center 
                  items-center bg-gray-300 absolute 
                  inset-2 font-bold text-lg hover:bg-yellow-500 
                  ring-2 ring-blue-700"> 
        { section.name } 
      </Link>
    </div>
  )
}

export default Section