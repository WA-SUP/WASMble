"use client";

import { useState, useEffect } from "react";
import Modal from "@components/modal/Modal";
import Button from "@components/button/Button";

export default function ArgsInputModal({
  isOpen,
  onClose,
  functionCode,
  onSubmit,
}) {
  const [args, setArgs] = useState({});
  const [params, setParams] = useState([]);

  useEffect(() => {
    if (functionCode) {
      const functionParams = functionCode.match(/\(([^)]+)\)/);
      if (functionParams && functionParams[1]) {
        const paramsArray = functionParams[1]
          .split(",")
          .map((param) => param.trim());
        setParams(paramsArray);
        setArgs({});
      } else {
        onSubmit();
        onClose();
      }
    }
  }, [functionCode]);

  const handleArgChange = (index, value) => {
    setArgs((prevArgs) => ({
      ...prevArgs,
      [index]: value.trim() === "" ? undefined : value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const filteredArgs = params
      .map((_, index) => args[index])
      .filter((arg) => arg !== undefined);

    onSubmit(filteredArgs);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="테스트 케이스 입력">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col justify-between h-full"
      >
        <div className="flex-grow overflow-auto">
          {params.map((param, index) => (
            <div key={index} className="flex items-center mb-4">
              <input
                type="text"
                value={args[index] || ""}
                onChange={(e) => handleArgChange(index, e.target.value)}
                className="border p-2 flex-grow text-black"
                placeholder={`${param}에 들어갈 값을 적어주세요.`}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-auto">
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
