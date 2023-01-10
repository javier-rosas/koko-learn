import Section from "../components/home-page/Section"
import Navbar from "../components/navbar"
import { sections } from '../constants/sections'

export default function Home() {
  return (
    <div className="flex flex-col font-mono overflow-auto">
      <Navbar />
      <div className="flex flex-row justify-center place-content-around">
        <div className="flex flex-col m-4 space-y-4 h-screen sm:w-1/2">
          { sections.map( (section, i) => <Section key={i} section={section} /> ) }
        </div>
      </div>
    </div>
  )
}