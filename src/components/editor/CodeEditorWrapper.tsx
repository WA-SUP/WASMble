"use client";

import { useState } from "react";
import Button from "@components/button/Button";
import CodeEditor from "@components/editor/CodeEditor";

interface CodeEditorWrapperProps {
  setFunctionCode: (code: string) => void;
  onExecute: () => void;
}

export default function CodeEditorWrapper({
  setFunctionCode,
  onExecute,
}: CodeEditorWrapperProps): React.JSX.Element {
  const [userWrittenCode, setUserWrittenCode] = useState<string>("");

  const handleClick = () => {
    setFunctionCode(userWrittenCode);
    onExecute();
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-grow min-h-0">
        <CodeEditor onCodeChange={setUserWrittenCode} />
      </div>
      <Button
        text="매개변수 입력"
        className="mt-4 px-3 py-2 w-full rounded-md bg-color-purple font-semibold hover:bg-color-purple-light transition-colors"
        onClick={handleClick}
      />
    </div>
  );
}
