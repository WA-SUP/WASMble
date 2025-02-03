"use client";

import Modal from "@components/modal/Modal";
import Button from "@components/button/Button";

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
  statusCode: number;
  errorStackMessage: string;
}

const ErrorModal = ({
  isOpen,
  onClose,
  errorMessage,
  statusCode,
}: ErrorModalProps): React.JSX.Element => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="w-1/3"
      height="h-auto"
      padding=""
    >
      <div className="flex flex-col items-center justify-center px-4 py-6">
        <div className="w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full">
          <span className="text-2xl font-bold">!</span>
        </div>
        <h2 className="mt-4 text-xl py-8 font-bold text-center">
          {errorMessage}
        </h2>
      </div>

      <div className="w-full">
        <Button
          text="확인"
          className="bg-red-500 w-full text-white py-3 rounded-b-md hover:bg-red-600 transition-colors"
          onClick={onClose}
        />
      </div>
    </Modal>
  );
};

export default ErrorModal;
