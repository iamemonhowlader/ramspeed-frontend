"use client";
import { useState } from "react";

export default function ColorFilter() {
  const [selectedColors, setSelectedColors] = useState([]);

  const colorOptions = [
    { id: 1, label: "Black", count: 42 },
    { id: 2, label: "White", count: 38 },
    { id: 3, label: "Red", count: 55 },
    { id: 4, label: "Blue", count: 61 },
    { id: 5, label: "Green", count: 29 },
    { id: 6, label: "Yellow", count: 33 },
    { id: 7, label: "Orange", count: 47 },
    { id: 8, label: "Purple", count: 19 },
    { id: 9, label: "Pink", count: 25 },
    { id: 10, label: "Brown", count: 11 },
    { id: 11, label: "Acer", count: 7 },
    { id: 12, label: "Apple", count: 3 },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedColors((prev) =>
      prev.includes(id)
        ? prev.filter((colorId) => colorId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-md rounded-md  mb-8 md:mb-0 p-4">
      <h2 className="text-3xl font-bold mb-6 text-black">Colors</h2>

      <div className="space-y-3">
        {colorOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center justify-between cursor-pointer group"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={selectedColors.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 rounded transition-colors ${
                  selectedColors.includes(option.id)
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-400"
                }`}
              >
                {selectedColors.includes(option.id) && (
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
