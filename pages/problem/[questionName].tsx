import React, { useEffect, useState, useCallback } from "react"
import Script from 'next/script'
import CodeEditorWindow from "../../components/problem-page/CodeEditorWindow"
import useKeyPress from "../../hooks/useKeyPress"
import Question from "../../components/problem-page/Question"
import Output from "../../components/problem-page/Output"
import QuestionModel from "../../models/QuestionModel"
import TestModel from "../../models/TestModel"
import Navbar from "../../components/problem-page/Navbar"
import { classnames } from "../../utils/general"
import { showSuccessToast } from "../../utils/general"
import { showErrorToast } from "../../utils/general"
import { ToastContainer } from "react-toastify"
import { QuestionType } from "../../types/QuestionType"
import { GetStaticPropsContext } from 'next'
import { connectMongo } from '../../utils/mongooseConnect'
import { useSelector } from "react-redux"
import { runCode } from "../../utils/general"
import { Panel, PanelGroup } from "react-resizable-panels";
import useWindowDimensions from "../../hooks/useWindowDimensions"
import ResizeHandle from '../../components/problem-page/ResizeHandle'
import "react-toastify/dist/ReactToastify.css"


const Repl = (props: any) => {

  // getStaticProps
  const { question, tests } = props
  
  // state vars
  const [theme, setTheme] = useState<any>("cobalt")
  const [code, setCode] = useState<string>("")
  const [processing, setProcessing] = useState<boolean | null>(null)
  const language = useSelector((state: any) => state.language.language)
  const [mobile, setMobile] = useState<boolean>(false)
  
  // enterPress and contrlPress hooks
  const enterPress = useKeyPress("Enter")
  const shiftPress = useKeyPress("Shift")

  // window height and width
  const { height, width } = useWindowDimensions();

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

  // clear output 
  const clearConsole = () => {
    let logger = document.getElementById('log')
    if (!logger) return
    logger.innerHTML = ""
  }

  // change the code editor text
  const onChange = (action: string, data: any) => {
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

  // handle compilation
  const handleCompile = useCallback( async () => {
    setProcessing(true)
    try {
      clearConsole()
      runCode(language, code, tests)
      showSuccessToast("Code ran succesfully!")
      setTimeout(() => {setProcessing(false)}, 1000);
    } catch(e) {
      console.log("Error running code", e)
      showErrorToast("Error", 1000)
    }
  }, [code, language])

  // if shift & enter are pressed, run the code
  useEffect(() => {
    if (enterPress && shiftPress) {
      handleCompile()
    }
  }, [shiftPress, enterPress, handleCompile])
  
  // set mobile or desktop size
  useEffect(() => {
    if (!width) return
    if (width < 640) {
      setMobile(true)
    }
  }, [width])

  return (
    <>
    <Script strategy="beforeInteractive" src="https://cdn.jsdelivr.net/pyodide/v0.22.0/full/pyodide.js" />
    <Navbar 
      theme={theme} 
      setTheme={setTheme}
    />
    {
      mobile ?
      <div className="flex flex-col sm:flex sm:flex-row sm:justify-between mb-32">
        <Question question={question} />
        <div className="flex flex-col px-2 py-4">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            theme={theme.value}
            question={question}
          />
          <Output 
            handleCompile={handleCompile}
            code={code}
            classnames={classnames}
            processing={processing}
          />
        </div>
      </div> 
      :
      <div className="flex flex-row justify-center">
        <PanelGroup className="max-w-screen-2xl" autoSaveId="example" direction="horizontal">
          <Panel defaultSize={40} order={1}>
            <Question question={question} />
          </Panel>
          <ResizeHandle />
          <Panel defaultSize={60} order={2}>
            <div className="flex flex-col px-2 py-4">
              <CodeEditorWindow
                code={code}
                onChange={onChange}
                theme={theme.value}
                question={question}
              />
              <Output 
                handleCompile={handleCompile}
                code={code}
                classnames={classnames}
                processing={processing}
              />              
            </div>
          </Panel>
        </PanelGroup>
      </div>
    }    
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
)}

export default Repl

export async function getStaticPaths() {
  try {
    await connectMongo()
    const questions = await QuestionModel.find()
    const paths = questions.map((question: QuestionType) => (
      { params: { questionName: question.kebabCaseName} }
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
  const questionName = params?.questionName?.toString()
  try {
    await connectMongo()
    const question = await QuestionModel.findOne({kebabCaseName: questionName})
    const tests = await TestModel.findOne({kebabCaseName: questionName})
    return {
      props: {
        question: JSON.parse(JSON.stringify(question)),
        tests: JSON.parse(JSON.stringify(tests)),
      }
    }
  } catch(e) {
    console.log(e)
  }
}


