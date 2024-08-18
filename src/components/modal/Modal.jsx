"use client";

import { useState } from "react";
import Button from "../button/Button";

const Modal = ({ isOpen, onClose, functionCode, onSubmit }) => {
  const [params, setParams] = useState([""]);

  const handleParamChange = (index, value) => {
    const newParams = [...params];
    newParams[index] = value;
    setParams(newParams);
  };

  const handleAddParam = () => {
    setParams([...params, ""]);
  };

  const handleRemoveParam = (index) => {
    setParams(params.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSubmit(params);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-black flex flex-col justify-between w-3/6 h-3/6 p-10 border-indigo-500 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between">
          <h1>테스트 케이스 입력</h1>
          <button onClick={onClose} className="top-2 right-2 text-white">
            X
          </button>
        </div>
        <div className="overflow-y-auto h-4/6 pr-4">
          {params.map((param, index) => (
            <div key={index} className="mb-2 flex items-center w-11/12">
              <input
                type="text"
                value={param}
                onChange={(e) => handleParamChange(index, e.target.value)}
                className="border p-2 mr-2 flex-grow text-black"
                placeholder={`매개변수 ${index + 1}`}
              />
              {params.length > 1 && (
                <button
                  onClick={() => handleRemoveParam(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <Button
            text="추가"
            className="btn-purple-light px-4 py-2 rounded"
            onClick={handleAddParam}
          />
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
