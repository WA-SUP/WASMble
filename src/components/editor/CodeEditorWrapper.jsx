"use client";

import { useState } from "react";

import Button from "@/components/button/Button";
import CodeEditor from "@/components/editor/CodeEditor";

export default function CodeEditorWrapper() {
  const [userWrittenCode, setUserWrittenCode] = useState("");

  return (
    <>
      <CodeEditor onCodeChange={setUserWrittenCode} />
      <Button
        text="실행"
        className="mt-4 px-3 py-2 w-full rounded-md bg-color-purple font-semibold hover:bg-color-purple-light transition-colors"
      ></Button>
    </>
  );
}
