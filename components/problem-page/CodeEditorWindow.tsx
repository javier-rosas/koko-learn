import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import Editor from "@monaco-editor/react"


type CodeSnippet = {
  lang:  string
  langSlug: string
  code: string
}

type CodeEditorProps = {
  onChange: (type: string, value: string | undefined) => void,
  code: string,
  theme: string,
  question: {
    code_snippets: CodeSnippet[]
  }
}

const CodeEditorWindow = ({ onChange, code, theme, question }: CodeEditorProps) => {
  
  const [value, setValue] = useState<string | undefined>(code || "")
  const lang = useSelector((state: any) => state.language.language)
  
  const handleEditorChange = (value: string | undefined) => {
    setValue(value)
    onChange("code", value)
  }

  useEffect(() => {
    if (!question) return
    if (lang.value === "python") setValue(question.code_snippets[0]?.code)
    else if (lang.value === "javascript") setValue(question.code_snippets[1]?.code)
  }, [question, lang])

  return (
    <div className="overlay rounded-md overflow-auto shadow-4xl mr-2">
      <Editor
        className=""
        height="65vh"
        width="110vh"
        language={lang.value}
        value={value}
        theme={theme}
        defaultValue=""
        onChange={handleEditorChange}
        options={{
          automaticLayout:true,
          fontSize: 13,
          autoIndent: "keep",
          formatOnType: true,
          wordWrap: "bounded",
       }}
      
      />
    </div>
  )
}

export default CodeEditorWindow
