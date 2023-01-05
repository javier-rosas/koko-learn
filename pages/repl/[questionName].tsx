import React, { useEffect, useState, useCallback } from "react"
import CodeEditorWindow from "../../components/CodeEditorWindow"
import useKeyPress from "../../hooks/useKeyPress"
import Question from "../../components/Question"
import Output from "../../components/Output"
import QuestionModel from "../../models/QuestionModel"
import Navbar from "../../components/Navbar"
import { classnames } from "../../utils/general"
import { languageOptions } from "../../constants/languageOptions"
import { showSuccessToast } from "../../utils/general"
import { showErrorToast } from "../../utils/general"
import { ToastContainer } from "react-toastify"
import { QuestionType } from "../../types/QuestionType"
import { GetStaticPropsContext } from 'next'
import { connectMongo } from '../../utils/mongooseConnect'
import "react-toastify/dist/ReactToastify.css"

 
const Repl = (props: any) => {
  // state vars
  const [theme, setTheme] = useState<any>("cobalt")
  const [code, setCode] = useState("")
  const [processing, setProcessing] = useState<boolean | null>(null)
  const [language, setLanguage] = useState(languageOptions[0])
  const { question } = props

  // enterPress and contrlPress hooks
  const enterPress = useKeyPress("Enter")
  const shiftPress = useKeyPress("Shift")

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

  // change the code editor text
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

  // handle compilation
  const handleCompile = useCallback( async () => {
    setProcessing(true)
    try {
      eval(code)
      showSuccessToast("Code ran succesfully!")
      setTimeout(() => {setProcessing(false)}, 1000);
    } catch(e) {
      showErrorToast("Error", 1000)
    }
  }, [code])

  // if shift & enter are pressed, run the code
  useEffect(() => {
    if (enterPress && shiftPress) {
      handleCompile()
    }
  }, [shiftPress, enterPress, handleCompile])
  

  return (
    <>
      <Navbar 
        theme={theme} 
        setTheme={setTheme}
      />
      <div className="flex flex-row justify-between">
        <Question question={question} />
        <div className="flex flex-col px-2 py-4">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language.value}
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

export default Repl


export async function getStaticPaths() {
  try {
    await connectMongo()
    const questions = await QuestionModel.find()
    const paths = questions.map((question: QuestionType) => (
      { params: { questionName: question.name} }
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
    const question = await QuestionModel.findOne({name: questionName})
    return {
      props: {
        question: JSON.parse(JSON.stringify(question))
      }
    }
  } catch(e) {
    console.log(e)
  }
}
