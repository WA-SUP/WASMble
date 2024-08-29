"use client";

import { useState } from "react";
import CodeEditorWrapper from "@components/editor/CodeEditorWrapper";
import ContentBox from "@components/common/ContentBox";
import ArgsInputModal from "@components/modal/ArgsInputModal";
import ErrorModal from "@components/modal/ErrorModal";
import Guide from "@components/guide/Guide";
import Loading from "@components/loading/Loading";
import Report from "@components/report/Report";

export default function Home() {
  const [functionCode, setFunctionCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [viewState, setViewState] = useState("guide");
  const [errorDetails, setErrorDetails] = useState({});

  function handleOpenArgsInputModal() {
    setIsModalOpen(true);
  }

  function handleCloseArgsInputModal() {
    setIsModalOpen(false);
  }

  function handleOpenErrorModal({
    message = "",
    status = 500,
    errorStackMessage = "",
  }) {
    setErrorDetails({
      errorMessage: message,
      statusCode: status,
      errorStackMessage: errorStackMessage,
    });
    setIsErrorModalOpen(true);
  }

  function handleCloseErrorModal() {
    setIsErrorModalOpen(false);
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

  async function handleModalSubmit(functionArguments) {
    const functionName = functionCode.match(/function (\w+)/)[1];
    const normalizedFunctionCode = functionCode.replace(/\n/g, "");

    const functionCall = functionArguments
      ? `${functionName}(${functionArguments.join(", ")})`
      : `${functionName}()`;

    const parsedFunctionArguments = functionArguments
      ? JSON.stringify(parseArguments(functionArguments))
      : "[]";

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
        const errorData = await response.json();
        handleOpenErrorModal({
          message: errorData.message,
          status: response.status,
          errorStackMessage: errorData.errorStackMessage,
        });

        setViewState("guide");
      }
    } catch (error) {
      handleOpenErrorModal({
        message: error.message,
        status: 500,
        errorStackMessage: error.stack,
      });

      setViewState("guide");
    }

    handleCloseArgsInputModal();
  }

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
          onExecute={handleOpenArgsInputModal}
          setFunctionCode={setFunctionCode}
        />
      </ContentBox>
      <ContentBox width="w-4/5 xl:w-[66%]">
        <div className="flex justify-center items-center h-full">
          {renderContent()}
        </div>
      </ContentBox>
      <ArgsInputModal
        isOpen={isModalOpen}
        onClose={handleCloseArgsInputModal}
        functionCode={functionCode}
        onSubmit={handleModalSubmit}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        errorMessage={errorDetails.errorMessage}
        statusCode={errorDetails.statusCode}
        errorStackMessage={errorDetails.errorStackMessage}
      />
    </section>
  );
}
