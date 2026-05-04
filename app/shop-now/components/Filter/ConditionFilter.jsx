"use client";
import { useState } from "react";

export default function ConditionFilter() {
  const [selectedConditions, setSelectedConditions] = useState([]);

  const conditionOptions = [
    { id: 1, label: "New", count: 42 },
    { id: 2, label: "Used", count: 18 },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedConditions((prev) =>
      prev.includes(id)
        ? prev.filter((conditionId) => conditionId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-md rounded-md  mb-8 md:mb-0 p-4">
      <h2 className="text-3xl font-bold mb-6 text-black">Condition</h2>

      <div className="space-y-3">
        {conditionOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center justify-between cursor-pointer group"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={selectedConditions.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 rounded transition-colors ${
                  selectedConditions.includes(option.id)
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-400"
                }`}
              >
                {selectedConditions.includes(option.id) && (
                  <svg
                    className="w-full h-full text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="ml-3 text-lg text-black font-medium">
                {option.label}
              </span>
            </div>
            <span className="text-sm text-gray-500">({option.count})</span>
          </label>
        ))}
      </div>
    </div>
  );
}
