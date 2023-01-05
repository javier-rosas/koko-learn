import React from 'react'
import Image from 'next/image'
import { QuestionType } from "../types/QuestionType"


function Question( { question } : any) {
  
  try {
    JSON.parse(question)
  } catch(e) {
    return <h1> Cannot Load Page </h1>
  }

  const { name, description,  examples, constraint, code_snippets } = JSON.parse(question)
  
 
  
  return (
    <>
    <div className='flex flex-col p-4'>
      <h1 className='text-3xl font-bg m-2'> {name}  </h1>
      <p className='m-2'> {description.description_text} </p>
      {examples.map((example: any, i: number) => {
        return (
        <>
        <div className='flex flex-col'>
          <div className='m-2 p-2 bg-gray-300 rounded-md'>
          <p> <strong> Example {i + 1} </strong></p>
            {example.example_text}
          </div>
        </div>
        </>
        )
      })} 
      <p><strong>Constraints:</strong></p>
      <p> {constraint} </p>
      <p> {code_snippets[0].code} </p>
    </div>
    </>
  )
}

export default Question