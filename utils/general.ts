import { LanguageType } from "../types/LanguageType"
import { toast } from "react-toastify"

// join list of arguments by white space
export const classnames = (...args: any) => {
  return args.join(" ");
}

// shows a succesful toast 
export const showSuccessToast = (msg: string) => {
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

// displays an error toast
export const showErrorToast = (msg: string, timer: number) => {
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

// kebab case converter
export const kebabCase = (str: string) => 
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, '-')
    .toLowerCase()

// preprocess python code
export const preprocessPythonCode = (code: string) => {
  code = "\n" + code                                                  
  const firstLine = "async function main(){\n  let pyodide = await loadPyodide()\n"
  const secondLine = "  try { \n "
  const thirdLine = " pyodide.runPython(`"
  const actualCode = `
  ${code}
  `
  const fourthLine = "`);\n"
  const fifth = " } catch(e) { \n console.log(new Error(e).message) \n}"
  const lastLine = "\n}\nmain();"
  const preprocessedCode = `${firstLine}${secondLine}${thirdLine}${actualCode}${fourthLine}${fifth}${lastLine}`
  eval(preprocessedCode)
}

// preprocess python code
export const preprocessJavascriptCode = (code: string) => {
  code = "\n" + code                                                  
  const firstLine = "async function main(){\n"
  const secondLine = "  try { \n "
  const actualCode = `
  ${code}
  `
  const thirdLine = " } catch(e) { \n console.log(new Error(e).message); \n}"
  const fourthLine = "\n}\nmain();"
  const preprocessedCode = `${firstLine}${secondLine}${actualCode}${thirdLine}${fourthLine}`
  eval(preprocessedCode)
}



// run code 
export const runCode = (language: LanguageType, code: string) => {
  if (language.value === "python") preprocessPythonCode(code)
  else if (language.value === "javascript") preprocessJavascriptCode(code)
}