"use client";

import React from "react";
import { DiffEditor } from "@monaco-editor/react";

interface GuideDiffEditorProps {
  originalCode: string;
  modifiedCode: string;
}

export default function GuideDiffEditor({
  originalCode,
  modifiedCode,
}: GuideDiffEditorProps): React.JSX.Element {
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
