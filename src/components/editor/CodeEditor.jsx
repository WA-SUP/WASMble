"use client";

import { useRef } from "react";
import Editor from "@monaco-editor/react";

import { CODE_EDITOR_DEFAULT_VALUE } from "@constants/constant";

export default function CodeEditor({ onCodeChange }) {
  const editorRef = useRef(null);

  function handleEditorMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorChange(value, e) {
    onCodeChange(value);
  }

  return (
    <Editor
      height="90%"
      theme="vs-dark"
      defaultLanguage="javascript"
      onMount={handleEditorMount}
      onChange={handleEditorChange}
      defaultValue={CODE_EDITOR_DEFAULT_VALUE}
      options={{
        minimap: {
          enabled: false,
        },
        overviewRulerLanes: 0,
      }}
    />
  );
}
