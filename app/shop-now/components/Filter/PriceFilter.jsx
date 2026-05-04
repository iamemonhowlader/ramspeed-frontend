"use client";
import { useState } from "react";

export default function PriceFilter() {
  const [selectedPrices, setSelectedPrices] = useState([]);

  const priceOptions = [
    { id: 1, label: "€100 & under" },
    { id: 2, label: "€100 - €500" },
    { id: 3, label: "€500 - €1000" },
    { id: 4, label: "€1000 - €2000" },
    { id: 5, label: "€2000 & Over" },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedPrices((prev) =>
      prev.includes(id)
        ? prev.filter((priceId) => priceId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-md rounded-md  mb-8 md:mb-0 p-4">
      <h2 className="text-3xl font-black mb-8 text-black">Price</h2>

      <div className="space-y-4">
        {priceOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center cursor-pointer group"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={selectedPrices.includes(id => id === option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 rounded transition-colors ${
                  selectedPrices.includes(option.id)
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-400"
                }`}
              >
                {selectedPrices.includes(option.id) && (
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
            </div>
            <span className="ml-3 text-lg text-black font-medium">
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
