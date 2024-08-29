"use client";

import { useState } from "react";
import Modal from "@components/modal/Modal";
import AddArgForm from "@components/argsInput/AddArgForm";
import ArgsInputList from "@components/argsInput/ArgsInputList";
import Button from "@components/button/Button";

export default function ArgsInputModal({
  isOpen,
  onClose,
  functionCode,
  onSubmit,
}) {
  const [args, setArgs] = useState([]);

  const handleAddArg = (arg) => {
    if (arg.trim() !== "") {
      setArgs([...args, arg]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(args);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="테스트 케이스 입력">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-between h-full"
      >
        <AddArgForm onAddArg={handleAddArg} />
        <ArgsInputList args={args} setArgs={setArgs} />
        <div className="flex justify-end">
          <Button
            text="실행"
            className="btn-purple-light px-4 py-2 rounded"
            type="submit"
          />
        </div>
      </form>
    </Modal>
  );
}
