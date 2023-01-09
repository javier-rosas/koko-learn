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
  const firstLine = "  async function main(){\n let pyodide = await loadPyodide()\n  pyodide.runPython(`"
  const actualCode = `
  ${code}
  `
  const lastLine = "`);\n}\n  main();"
  const preprocessedCode = `${firstLine}${actualCode}${lastLine}`
  eval(preprocessedCode)
}

// run code 
export const runCode = (language: LanguageType, code: string) => {
  if (language.value === "python") preprocessPythonCode(code)
  else if (language.value === "javascript") eval(code)
}