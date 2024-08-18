"use client";

import { useState } from "react";
import CodeEditorWrapper from "@components/editor/CodeEditorWrapper";
import ContentBox from "@components/common/ContentBox";
import Modal from "@components/modal/Modal";

export default function Home() {
  const [functionCode, setFunctionCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalResult, setModalResult] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (params) => {
    setModalResult({ functionCode, params });
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
            {modalResult && (
              <pre className="mt-4">{JSON.stringify(modalResult, null, 2)}</pre>
            )}
          </div>
        </ContentBox>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        functionCode={functionCode}
        onSubmit={handleModalSubmit}
      />
    </>
  );
}
