"use client";

import React from "react";
import { DiffEditor } from "@monaco-editor/react";

interface ReportDiffEditorProps {
  originalCode: string;
  modifiedCode: string;
}

export default function ReportDiffEditor({
  originalCode,
  modifiedCode,
}: ReportDiffEditorProps): React.JSX.Element {
  return (
    <DiffEditor
      height="15rem"
      theme="vs-dark"
      language="javascript"
      original={originalCode}
      modified={modifiedCode}
      options={{
        renderSideBySide: true,
        readOnly: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      }}
    />
  );
}
