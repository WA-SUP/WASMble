"use client";

import { useState } from "react";

import CodeEditorWrapper from "@components/editor/CodeEditorWrapper";
import ContentBox from "@components/common/ContentBox";
import Modal from "@components/modal/Modal";
import Guide from "@components/guide/Guide";
import Loading from "@components/loading/Loading";
import Report from "@components/report/Report";

export default function Home() {
  const [functionCode, setFunctionCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewState, setViewState] = useState("guide");

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

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
      functionCall,
      functionName,
      functionCode: normalizedFunctionCode,
      functionArguments: parsedFunctionArguments,
    };

    try {
      setViewState("loading");

      const response = await fetch("/api/performance-comparison", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result = await response.json();

        setViewState("report");
      } else {
        console.error("요청에 실패했습니다:", response.statusText);
        setViewState("guide");
      }
    } catch (error) {
      console.error("요청 중 에러 발생:", error);
      setViewState("guide");
    }

    handleCloseModal();
  };

  function renderContent() {
    switch (viewState) {
      case "loading":
        return <Loading />;
      case "report":
        return <Report />;
      case "guide":
      default:
        return <Guide />;
    }
  }

  return (
    <section className="flex flex-col lg:font-2 lg:flex-row justify-between items-center flex-grow gap-4 p-6">
      <ContentBox width="w-4/5 xl:w-[33%]">
        <CodeEditorWrapper
          onExecute={handleOpenModal}
          setFunctionCode={setFunctionCode}
        />
      </ContentBox>
      <ContentBox width="w-4/5 xl:w-[66%]">
        <div className="flex justify-center items-center h-full">
          {renderContent()}
        </div>
      </ContentBox>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        functionCode={functionCode}
        onSubmit={handleModalSubmit}
      />
    </section>
  );
}
