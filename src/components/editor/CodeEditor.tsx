"use client";

import { useRef } from "react";
import Editor, { OnMount } from "@monaco-editor/react";

import { CODE_EDITOR_DEFAULT_VALUE } from "@constants/constant";

interface CodeEditorProps {
  onCodeChange: (code: string) => void;
}

export default function CodeEditor({
  onCodeChange,
}: CodeEditorProps): React.JSX.Element {
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

  function handleEditorMount(editor: Parameters<OnMount>[0]): void {
    editorRef.current = editor;
  }

  function handleEditorChange(value: string | undefined): void {
    if (value !== undefined) {
      onCodeChange(value);
    }
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
