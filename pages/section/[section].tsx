import React from 'react'
import { sections } from '../../constants/sections'
import { GetStaticPropsContext } from 'next'
import Navbar from '../../components/navbar'
import Link from 'next/link'

function SectionPage(props: any) {
  const { problems } = props
  return (
    <>
      <Navbar />
      <div className='flex flex-row font-mono m-4 justify-center'>
        <div>
          { problems && problems.map((problem: string, i: number) => (
            <Link key={i} href={`/problem/${problem}`}>
              <div className='mt-2 mb-2 pr-10 p-4 justify-center items-center border-2 hover:bg-yellow-500 w-full'>
                <h1 key={i.toString()}> {i + 1}. {problem} </h1>
              </div>
            </Link>
          )) }
        </div>
     
      </div>
    </>
  )
}

export default SectionPage


export async function getStaticPaths() {
  try {
    const paths = sections.map((section) => (
      { params: { section: section.kebabCaseName} }
    ))
    return {
      paths,
      fallback: 'blocking'
    }
  } catch (e) {
    console.log(e)
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context 
  const sectionName = params?.section?.toString()
  const problems = sections.filter((section) => section.kebabCaseName === sectionName)[0]?.problems
  try {
    return {
      props: {
        problems,
      }
    }
  } catch(e) {
    console.log(e)
  }
}