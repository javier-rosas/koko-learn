import React, { useState } from "react"
import Editor from "@monaco-editor/react"

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "")

  const handleEditorChange = (value) => {
    setValue(value)
    onChange("code", value)
  }

  return (
    <div className="overlay rounded-md overflow-hidden shadow-4xl">
      <Editor
        height="65vh"
        width="100vh"
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
        options={{
          automaticLayout:true,
          fontSize:"13rem",
      }}
      />
    </div>
  )
}

export default CodeEditorWindow
