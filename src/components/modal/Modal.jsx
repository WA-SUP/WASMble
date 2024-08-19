"use client";

import { useState } from "react";
import Button from "@components/button/Button";
import ArgsInputList from "@components/argsInput/ArgsInputList";
import AddArgForm from "@components/argsInput/AddArgForm";

const Modal = ({ isOpen, onClose, functionCode, onSubmit }) => {
  const [args, setArgs] = useState([]);

  const handleAddArg = (arg) => {
    if (arg.trim() !== "") {
      setArgs([...args, arg]);
    }
  };

  const handleSubmit = () => {
    onSubmit(args);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-black flex flex-col justify-between w-3/6 h-3/6 p-10 border-indigo-500 rounded-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          text="&times;"
          className="absolute top-2 right-2 text-white bg-transparent"
          onClick={onClose}
        />
        <div className="flex justify-between">
          <h1>테스트 케이스 입력</h1>
        </div>
        <AddArgForm onAddArg={handleAddArg} />
        <ArgsInputList args={args} setArgs={setArgs} />
        <div className="flex justify-end">
          <Button
            text="확인"
            className="btn-purple-light px-4 py-2 rounded"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
