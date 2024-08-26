"use client";

import { useState } from "react";
import CodeEditorWrapper from "@components/editor/CodeEditorWrapper";
import ContentBox from "@components/common/ContentBox";
import Modal from "@components/modal/Modal";

export default function Home() {
  const [functionCode, setFunctionCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  function parseArguments(functionArguments) {
    return [...functionArguments].map((element) => {
      try {
        return JSON.parse(element);
      } catch (error) {
        return element;
      }
    });
  }

  const handleModalSubmit = async (functionArguments) => {
    const functionName = functionCode.match(/function (\w+)/)[1];
    const functionCall = `${functionName}(${functionArguments.join(", ")})`;
    const normalizedFunctionCode = functionCode.replace(/\n/g, "");
    const parsedFunctionArguments = JSON.stringify(
      parseArguments(functionArguments),
    );

    const requestBody = {
      functionCode: normalizedFunctionCode,
      functionArguments: parsedFunctionArguments,
      functionCall,
      functionName,
    };

    try {
      const response = await fetch("/api/performance-comparison", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("결과:", result);
      } else {
        console.error("요청에 실패했습니다:", response.statusText);
      }
    } catch (error) {
      console.error("요청 중 에러 발생:", error);
    }

    handleCloseModal();
  };

  return (
    <>
      <section className="flex justify-between items-center flex-grow p-6">
        <ContentBox width="w-[49%]">
          <CodeEditorWrapper
            onExecute={handleOpenModal}
            setFunctionCode={setFunctionCode}
          />
        </ContentBox>
        <ContentBox width="w-[49%]">
          <div className="flex justify-center items-center h-full">
            <h1 className="text-2xl font-bold"> 성능 비교 UI</h1>
          </div>
        </ContentBox>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          functionCode={functionCode}
          onSubmit={handleModalSubmit}
        />
      </section>
    </>
  );
}
