"use client";

import { useState } from "react";

const AddArgForm = ({ onAddArg }) => {
  const [currentArg, setCurrentArg] = useState("");

  const handleCurrentArgChange = (e) => {
    setCurrentArg(e.target.value);
  };

  const handleAddArg = (e) => {
    e.preventDefault();
    onAddArg(currentArg);
    setCurrentArg("");
  };

  return (
    <form onSubmit={handleAddArg} className="mb-4">
      <input
        type="text"
        value={currentArg}
        onChange={handleCurrentArgChange}
        className="border p-2 mr-2 w-11/12 text-black"
        placeholder="매개변수를 입력하고 엔터를 누르세요"
        autoFocus
      />
    </form>
  );
};

export default AddArgForm;
