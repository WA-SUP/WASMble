"use client";

import Button from "@components/button/Button";

export default function ArgsInput({ value, index, onRemove }) {
  return (
    <div key={index} className="mb-2 flex items-center w-11/12 input-item">
      <input
        type="text"
        value={value}
        className="border p-2 mr-2 flex-grow text-black"
        readOnly
      />
      <Button
        text="&times;"
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={() => onRemove(index)}
      />
    </div>
  );
}
