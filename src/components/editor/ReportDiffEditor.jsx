"use client";

import React from "react";
import { DiffEditor } from "@monaco-editor/react";

export default function ReportDiffEditor({ originalCode, modifiedCode }) {
  return (
    <DiffEditor
      height="100%"
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
