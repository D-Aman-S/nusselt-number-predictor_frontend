import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: number | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, result }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-medium">Prediction Result</h2>
        <p className="mt-2 text-xl">
          {result !== null
            ? `The predicted Nusselt number is: ${result}`
            : "Prediction failed"}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
