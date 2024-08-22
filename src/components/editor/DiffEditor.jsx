import React from "react";
import { DiffEditor } from "@monaco-editor/react";

function MyDiffEditor() {
  const originalCode = `function add(a, b) {
    return a + b;
  }`;

  const modifiedCode = `function add(a: i32, b: i32): i32 {
    return a + b;
  }`;

  return (
    <DiffEditor
      height="100px"
      theme="vs-dark"
      language="javascript"
      original={originalCode}
      modified={modifiedCode}
      options={{
        renderSideBySide: true,
        readOnly: true,
      }}
    />
  );
}

export default MyDiffEditor;
