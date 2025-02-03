"use client";

import { useState } from "react";

interface AddArgFormProps {
  onAddArg: (arg: string) => void;
}

export default function AddArgForm({
  onAddArg,
}: AddArgFormProps): React.JSX.Element {
  const [currentArg, setCurrentArg] = useState<string>("");

  const handleCurrentArgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentArg(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddArg(currentArg);
      setCurrentArg("");
    }
  };

  return (
    <input
      type="text"
      value={currentArg}
      onChange={handleCurrentArgChange}
      onKeyDown={handleKeyDown}
      className="border p-2 mr-2 w-11/12 text-black"
      placeholder="매개변수를 입력하고 엔터를 누르세요"
      autoFocus
    />
  );
}
