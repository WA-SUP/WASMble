"use client";

import { useState } from "react";

export default function AddArgForm({ onAddArg }) {
  const [currentArg, setCurrentArg] = useState("");

  const handleCurrentArgChange = (e) => {
    setCurrentArg(e.target.value);
  };

  const handleKeyDown = (e) => {
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
