import React, { useState, useEffect } from "react"
import Editor from "@monaco-editor/react"

const CodeEditorWindow = ({ onChange, language, code, theme, question }: any) => {
  
  const [value, setValue] = useState(code || "")

  const handleEditorChange = (value: any) => {
    setValue(value)
    onChange("code", value)
  }

  useEffect(() => {
    if (!question) return
    setValue(question.code_snippets[1].code)
  }, [question])

  return (
    <div className="overlay rounded-md overflow-hidden shadow-4xl">
      <Editor
        height="65vh"
        width="100vh"
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue=""
        onChange={handleEditorChange}
        options={{
          automaticLayout:true,
          fontSize: 13,
      }}
      />
    </div>
  )
}

export default CodeEditorWindow
