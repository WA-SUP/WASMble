import React from "react";
import { DiffEditor } from "@monaco-editor/react";

export default function MyDiffEditor({ originalCode, modifiedCode }) {
  return (
    <DiffEditor
      height="6.9rem"
      width="98%"
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
