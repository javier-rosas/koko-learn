import React from 'react'
import Image from 'next/image'
import Custom404 from '../pages/404'
import { QuestionType } from '../types/QuestionType'

function Question( { question } : any  ) {

  let name, description, examples, constraint

  try {
    ({ name, description,  examples, constraint } = question)
  } catch(e) {
    return (
      <div className='flex justify-center items-center w-[100%] font-mono'>
        <h1> Question not found. </h1>
      </div>
    )
  }

  return (
    <div className='flex flex-col p-4 font-mono text-sm'>
      <h1 className='text-3xl font-bg m-2'> {name}  </h1>
      <p className='m-2'> {description.description_text} </p>
      {examples.map((example: any, i: number) => {
        return (
          <pre key={i} className='m-2 p-2 bg-gray-300 rounded-md'>
          <p className='font-bold text-base'>Example {i + 1}</p>
            {example?.example_text?.trim()}
          </pre>
        )
      })} 
      <pre className='m-2'>
        <p className='font-bold text-base'>Constraints:</p>
        <p className='mt-1'> {constraint?.trim()} </p>
      </pre>
    </div>
  )
}

export default Question