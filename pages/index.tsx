import Section from "../components/home-page/Section"
import Navbar from "../components/home-page/Navbar"
import { sections } from '../constants/sections'

const sectionList = Object.keys(sections)

export default function Home() {
  return (
    <div className="flex flex-col font-mono">
      <Navbar />
      <div className="grid grid-cols-4 gap-4 m-4 h-screen">
        { sectionList.map( section => <Section section={section} /> ) }
      </div>
    </div>
  )
}