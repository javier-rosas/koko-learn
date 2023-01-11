import React from 'react'
import Image from 'next/image'
import Custom404 from '../../pages/404'
import { QuestionType } from '../../types/QuestionType'

function Question( { question } : any  ) {

  let name, description: any, examples, constraint

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
    <div className='flex flex-col p-4 font-mono text-sm max-w-3xl'>
      <h1 className='text-3xl font-bg m-2'> {name}  </h1>
      <p className='m-2'> {description.description_text} </p>
      { description.description_img_source && 
        <Image 
          className="m-1"
          loader={() => description.description_img_source}
          alt={`${name} description image`} 
          src={description.description_img_source}
          width={350}
          height={250}>
        </Image>
      }
      {examples.map((example: any, i: number) => {
        return (
          <pre key={i} className='m-2 p-2 bg-gray-300 rounded-md overflow-auto'>
            <p className='font-bold text-base'>Example {i + 1}</p>
            { example.example_img_source && 
              <Image 
                className="m-1"
                loader={() => example.example_img_source}
                alt={`${example?.example_text} description image`} 
                src={example.example_img_source}
                width={350}
                height={250}>
              </Image>
            }
            {example?.example_text?.trim()}
          </pre>
        )
      })} 
      <pre className='m-2 p-2 bg-gray-300 rounded-md overflow-auto'>
        <p className='font-bold text-base'>Constraints:</p>
          {constraint?.trim()}
      </pre>
    </div>
  )
}

export default Question