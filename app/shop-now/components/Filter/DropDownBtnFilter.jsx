"use client";
import { useState } from "react";

export default function DropDownBtnFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("New entries");

  const options = [
    "New entries",
    "Price: Low to High",
    "Price: High to Low",
    "Most Popular",
    "Best Rating",
  ];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 px-4 bg-white border-2 border-blue-600 rounded-full flex items-center justify-between text-black text-xs font-bold hover:bg-blue-50 transition-colors"
      >
        <span>{selected}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-blue-600 rounded-2xl shadow-lg overflow-hidden z-10">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelect(option)}
              className={`w-full px-4 py-2 text-left text-xs hover:bg-blue-50 transition-colors ${
                selected === option ? "bg-blue-100 font-semibold" : ""
              } ${
                index !== options.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
