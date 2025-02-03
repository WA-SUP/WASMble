"use client";

import { useState } from "react";
import CodeEditorWrapper from "@components/editor/CodeEditorWrapper";
import ContentBox from "@components/common/ContentBox";
import ArgsInputModal from "@components/modal/ArgsInputModal";
import ErrorModal from "@components/modal/ErrorModal";
import Guide from "@components/guide/Guide";
import Loading from "@components/loading/Loading";
import Report from "@components/report/Report";

interface ErrorDetails {
  errorMessage: string;
  statusCode: number;
  errorStackMessage: string;
}

interface MeasurementReport {
  asCode: string;
  jsCode: string;
  measurementResults: { type: string; operationTimes: number }[];
  performanceReportId: string;
}

export default function Home(): JSX.Element {
  const [functionCode, setFunctionCode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [viewState, setViewState] = useState<"guide" | "loading" | "report">(
    "guide",
  );
  const [errorDetails, setErrorDetails] = useState<ErrorDetails>({
    errorMessage: "",
    statusCode: 500,
    errorStackMessage: "",
  });
  const [measureMentReport, setMeasureMentReport] =
    useState<MeasurementReport | null>(null);

  function handleOpenArgsInputModal(): void {
    setIsModalOpen(true);
  }

  function handleCloseArgsInputModal(): void {
    setIsModalOpen(false);
  }

  function handleOpenErrorModal(details: Partial<ErrorDetails>): void {
    setErrorDetails((prev) => ({
      ...prev,
      ...details,
    }));
    setIsErrorModalOpen(true);
  }

  function handleCloseErrorModal(): void {
    setIsErrorModalOpen(false);
  }

  async function handleModalSubmit(
    functionArguments: (string | number)[],
  ): Promise<void> {
    const functionNameMatch = functionCode.match(/function (\w+)/);
    const functionName = functionNameMatch ? functionNameMatch[1] : "";

    if (!functionName) {
      handleOpenErrorModal({
        errorMessage: "Function name could not be parsed.",
        statusCode: 400,
        errorStackMessage: "Ensure your function is properly defined.",
      });
      return;
    }

    const functionCall = `${functionName}(${functionArguments.join(", ")})`;

    const requestBody = {
      functionCall,
      functionName,
      functionCode,
      functionArguments: JSON.stringify(functionArguments),
    };

    try {
      setViewState("loading");

      const response = await fetch("/api/performance-comparison", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const result: MeasurementReport = await response.json();
        setMeasureMentReport(result);
        setViewState("report");
      } else {
        const errorData = await response.json();
        handleOpenErrorModal({
          errorMessage: errorData.message,
          statusCode: response.status,
          errorStackMessage: errorData.errorStackMessage,
        });
        setViewState("guide");
      }
    } catch (error: unknown) {
      handleOpenErrorModal({
        errorMessage: (error as Error).message,
        statusCode: 500,
        errorStackMessage: (error as Error).stack || "",
      });
      setViewState("guide");
    }

    handleCloseArgsInputModal();
  }

  function renderContent(): JSX.Element {
    switch (viewState) {
      case "loading":
        return <Loading />;
      case "report":
        return measureMentReport ? (
          <Report data={measureMentReport} />
        ) : (
          <Guide />
        );
      case "guide":
      default:
        return <Guide />;
    }
  }

  return (
    <section className="flex flex-col lg:font-2 lg:flex-row justify-between items-center flex-grow gap-4 p-6">
      <ContentBox width="w-4/5 lg:w-[33%]">
        <CodeEditorWrapper
          onExecute={handleOpenArgsInputModal}
          setFunctionCode={setFunctionCode}
        />
      </ContentBox>
      <ContentBox width="w-4/5 lg:w-[66%]">{renderContent()}</ContentBox>
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
