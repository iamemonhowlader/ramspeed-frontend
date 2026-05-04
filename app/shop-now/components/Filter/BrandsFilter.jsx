"use client";
import { useState } from "react";

export default function BrandsFilter() {
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brandOptions = [
    { id: 1, label: "Acer", count: 12 },
    { id: 2, label: "Dell", count: 8 },
    { id: 3, label: "HP", count: 15 },
    { id: 4, label: "Lenovo", count: 9 },
    { id: 5, label: "ASUS", count: 7 },
    { id: 6, label: "MSI", count: 5 },
    { id: 7, label: "Apple", count: 11 },
    { id: 8, label: "Samsung", count: 6 },
    { id: 9, label: "LG", count: 4 },
    { id: 10, label: "Sony", count: 3 },
    { id: 11, label: "Toshiba", count: 2 },
    { id: 12, label: "Microsoft", count: 10 },
  ];

  const handleCheckboxChange = (id) => {
    setSelectedBrands((prev) =>
      prev.includes(id)
        ? prev.filter((brandId) => brandId !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="w-full max-w-md rounded-md  p-4 mb-8 md:mb-0">
      <h2 className="text-3xl font-bold mb-6 text-black">Brands</h2>

      <div className="space-y-3">
        {brandOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center justify-between cursor-pointer group"
          >
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.includes(option.id)}
                onChange={() => handleCheckboxChange(option.id)}
                className="sr-only"
              />
              <div
                className={`w-5 h-5 border-2 rounded transition-colors ${
                  selectedBrands.includes(option.id)
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-400"
                }`}
              >
                {selectedBrands.includes(option.id) && (
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
