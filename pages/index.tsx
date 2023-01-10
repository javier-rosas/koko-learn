import Section from "../components/home-page/Section"
import Navbar from "../components/navbar"
import { sections } from '../constants/sections'

export default function Home() {
  return (
    <div className="flex flex-col font-mono">
      <Navbar />
      <div className="flex flex-col m-4 space-y-4 h-screen">
        { sections.map( (section, i) => <Section key={i} section={section} /> ) }
      </div>
    </div>
  )
}