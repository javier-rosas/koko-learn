import React, { useEffect, useState, useRef } from "react"
import CodeEditorWindow from "../components/CodeEditorWindow"
import { classnames } from "../utils/general"
import { languageOptions } from "../constants/languageOptions"

import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { defineTheme } from "../lib/defineTheme"
import useKeyPress from "../hooks/useKeyPress"
import CustomInput from "../components/CustomInput"
import ThemeDropdown from "../components/ThemeDropdown"
import LanguagesDropdown from "../components/LanguagesDropdown"

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import { AnyARecord } from "dns"

const javascriptDefault = ""

const Landing = () => {
  const [code, setCode] = useState(javascriptDefault)
  const [customInput, setCustomInput] = useState("")
  const [outputDetails, setOutputDetails] = useState(null)
  const [processing, setProcessing] = useState<boolean | null>(null)
  const [theme, setTheme] = useState<any>("cobalt")
  const [language, setLanguage] = useState(languageOptions[0])

  const enterPress = useKeyPress("Enter")
  const ctrlPress = useKeyPress("Control")

  const onSelectChange = (sl: any) => {
    console.log("selected Option...", sl)
    setLanguage(sl)
  }

  useEffect(() => {
    (function () {
      var logger = document.getElementById('log');
      console.log = function (message) {
        if (!logger) return
          if (typeof message == 'object') {
              logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : message) + '<br />';
          } else {
              logger.innerHTML += message + '<br />';
          }
      }
    })();
  }, [])

  
  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress)
      console.log("ctrlPress", ctrlPress)
      handleCompile()
    }
  }, [ctrlPress, enterPress])

  const onChange = (action: any, data: any) => {
    switch (action) {
      case "code": {
        setCode(data)
        break
      }
      default: {
        console.warn("case not handled!", action, data)
      }
    }
  }

  const handleCompile = () => {
    setProcessing(true)
    eval(code)
  }

  function handleThemeChange(th: any) {
    const theme = th;
    console.log("theme...", theme);
    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }

  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg: string) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  
  const showErrorToast = (msg: string, timer: any) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  
  return (
    <>
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

      <div className="flex flex-row">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language.value}
            theme={theme.value}
          />
        </div>
        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <h1 className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            Output
          </h1>
          <div id="log" className="w-full h-56 bg-[#1e293b] rounded-md text-white font-normal text-sm overflow-y-auto p-3"/>
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border-2 border-black z-10 rounded-md shadow-[5px_5px_0px_0px_rgba(0,0,0)] px-4 py-2 hover:shadow transition duration-200 bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}>
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
        </div>
      </div>
      {/* <LiveProvider code={code} /> */}
      {/* <LiveProvider code={code}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider> */}
    </>
  )
}
export default Landing;
