import React, { useEffect, useState } from "react"
import CodeEditorWindow from "../components/CodeEditorWindow"
import { classnames } from "../utils/general"
import { languageOptions } from "../constants/languageOptions"
import { showSuccessToast } from "../utils/general"
import { showErrorToast } from "../utils/general"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { defineTheme } from "../lib/defineTheme"
import useKeyPress from "../hooks/useKeyPress"
import ThemeDropdown from "../components/ThemeDropdown"
import LanguagesDropdown from "../components/LanguagesDropdown"
import Question from "../components/Question"

/**
 * TODO:
 *  1) Add File Explorer 
 *    - Figuring out a way to store files (nested object), represented as mongo documents or S3, etc. 
 *    - 
 *  2) Add error messages to output box
 * @returns JSX component
 */
const Landing = () => {
  // state vars
  const [code, setCode] = useState("")
  const [processing, setProcessing] = useState<boolean | null>(null)
  const [theme, setTheme] = useState<any>("cobalt")
  const [language, setLanguage] = useState(languageOptions[0])

  // enterPress and contrlPress hooks
  const enterPress = useKeyPress("Enter")
  const shiftPress = useKeyPress("Shift")

  // select language handler
  const onSelectChange = (sl: any) => {
    setLanguage(sl)
  }

  // display console logs in Output box instead of console
  useEffect(() => {
    (function () {
      var logger = document.getElementById('log')
      console.log = function (message) {
        if (!logger) return
          if (typeof message == 'object') {
              logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />'
          } else {
              logger.innerHTML += message + '<br />'
          }
          logger.scrollTop = logger.scrollHeight;
      }
    })()
  }, [])

  // if shift & enter are pressed, run the code
  useEffect(() => {
    if (enterPress && shiftPress) {
      handleCompile()
    }
  }, [shiftPress, enterPress])

  // change code editor according to the language & theme
  const onChange = (action: any, data: any) => {
    switch (action) {
      case "code": {
        if (enterPress && shiftPress) return
        setCode((data))
        break
      }
      default: {
        console.warn("case not handled!", action, data)
      }
    }
  }

  // compile and run code
  const handleCompile = () => {
    
      /**
       * Run if you want skypack.dev modules: 'https://cdn.skypack.dev/package-name'
       */
      // setProcessing(true)
      // const script = document.createElement('script')
      // script.type = "module"
      // script.innerHTML = code
      // document.body.appendChild(script)
      // showSuccessToast("Code ran succesfully!")
      // setTimeout(() => {setProcessing(false)}, 1000)

      setProcessing(true)
      eval(code)
      showSuccessToast("Code ran succesfully!")
      setTimeout(() => {setProcessing(false)}, 1000);
  }

  // handle a change in the theme
  function handleThemeChange(th: any) {
    const theme = th;
    console.log("theme...", theme);
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  // set the theme to oceanic-next by default
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    )
  }, [])
  
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="px-2 py-2">
            <LanguagesDropdown onSelectChange={onSelectChange} />
          </div>
          <div className="px-2 py-2">
            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
          </div>
          <div className="ml-auto mr-4 self-end text-center h-10 m-2 px-2 py-2 border-2 border-black z-10 rounded-md 
                          shadow-[5px_5px_0px_0px_rgba(0,0,0)] hover:shadow transition 
                          duration-200 bg-white flex-shrink-0">
            Search Problems
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Question />
        <div className="flex flex-col px-2 py-4">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language.value}
              theme={theme.value}
            />
          <div id="log" className="bg-black mt-1 rounded-md text-white font-normal text-sm overflow-y-scroll p-3 max-h-24"/>
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-2 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}>
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
        </div>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
    
    
  )
}

export default Landing
