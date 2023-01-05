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

/**
 * Converts any string to kebab-case
 * @param {string | undefined} str question name
 * @returns {string} formatted in kebab-case
 */
const toKebabCase = (str: string | undefined): string => {
  if (!str) return ""
  return ( 
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
      .map(x => x.toLowerCase()).join('-')
  )
}

const preprocessExample = (example: string) : string[] => {
  const output = example.split(' Output')
  return output
}