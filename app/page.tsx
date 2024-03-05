"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { predictData } from "./_utilities/predictionUtilities";
import Modal from "./_components/Modal";

interface FormData {
  ja_sup: string;
  ja_sub: string;
  Re_V: string;
  Re_L: string;
  prv: string;
}

export default function Home() {
  const [predictionResult, setPredictionResult] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    ja_sup: "",
    ja_sub: "",
    Re_V: "",
    Re_L: "",
    prv: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data = await predictData(formData);
      console.log("Form submitted with data:", formData);
      console.log("Prediction result:", data);
      setPredictionResult(data.prediction);
      setModalOpen(true);
    } catch (error) {
      console.error("Failed to get prediction result:", error);
      setModalOpen(true);
      setPredictionResult(null);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setPredictionResult(null);
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-start bg-white p-4">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="text-4xl font-medium">Nusselt Number Predictor</h1>
        <p className="mt-3">
          Enter your parameters to predict the Nusselt number:
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {Object.keys(formData).map((key) => (
              <div key={key} className="relative z-0">
                <input
                  type="number"
                  name={key}
                  value={formData[key as keyof FormData]}
                  onChange={handleChange}
                  className="peer block w-full appearance-none border-0 border-b border-gray-500 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                  placeholder=""
                  required
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-blue-600 peer-focus:dark:text-blue-500">
                  {key}
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-5 rounded-md bg-black px-10 py-2 text-white"
          >
            Predict
          </button>
        </form>
        <Modal
          isOpen={modalOpen}
          onClose={closeModal}
          result={predictionResult}
        />
      </div>
    </div>
  );
}
