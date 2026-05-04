"use client";

import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CrossIcon from "@/components/svg/CrossIcon";
import { Camera } from "lucide-react";

export default function MultiImageUpload({
  onChange,
  onRemove,
  className,
  label = "Add product photo",
  maxFiles = 5,
  accept = "image/png, image/jpeg, image/jpg",
}) {
  const fileRef = useRef();
  const [images, setImages] = useState([]);

  useEffect(() => {
    onChange?.(images);
  }, [images, onChange]);

  function handleFiles(files) {
    const filesArr = Array.from(files);
    const newImages = [
      ...images,
      ...filesArr.filter(
        (file) => file.type.startsWith("image/") && images.length < maxFiles
      ),
    ].slice(0, maxFiles);
    setImages(newImages);
  }

  function handleInput(e) {
    handleFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  }

  function removeImage(index) {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    onRemove?.(index);
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-3">
        <span className="font-semibold text-sm sm:text-xl md:text-2xl">
          {label}
        </span>
      </div>

      <div
        className={cn(
          "bg-white flex flex-col justify-center items-center border-2 border-dashed border-blue-200 rounded-xl min-h-[160px] sm:min-h-[180px] w-full relative transition p-4 sm:p-6",
          images.length === 0 && "hover:bg-blue-50"
        )}
        tabIndex={0}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {/* Images Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center items-center w-full">
            {images.map((img, i) => (
              <div key={i} className="relative group w-full flex flex-col items-center">
                <img
                  src={URL.createObjectURL(img)}
                  alt="product"
                  className="w-full aspect-square object-cover rounded-lg shadow-sm"
                  draggable={false}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(i);
                  }}
                  className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-red-100 transition z-10"
                  aria-label="Remove image"
                >
                  <CrossIcon />
                </button>
                <div className="text-xs text-gray-500 text-center mt-2 truncate w-full">
                  {img.name}
                </div>
              </div>
            ))}

            {/* Add Box */}
            {images.length < maxFiles && (
              <div
                className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  fileRef.current?.click();
                }}
              >
                <span className="text-3xl sm:text-4xl text-blue-400">+</span>
                <span className="text-xs sm:text-sm mt-1 sm:mt-2">Add</span>
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center text-center py-8 sm:py-10 w-full">
            <Camera size={40} color="#D0D5DD" />
            <div className="font-medium mt-2 text-sm sm:text-base">
              Drop your image here{" "}
              <span
                className="text-sky-600 underline cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  fileRef.current?.click();
                }}
              >
                or browse
              </span>
            </div>
            <div className="text-gray-400 text-xs sm:text-sm mt-1">
              Support: JPG, JPEG, PNG
            </div>
            <div className="text-gray-400 text-xs sm:text-sm mt-1">
              You can upload up to {maxFiles} photos here
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileRef.current?.click();
              }}
              className="mt-4 rounded-lg bg-blue-600 text-white px-4 sm:px-6 py-1.5 text-xs sm:text-sm hover:bg-blue-500 transition"
            >
              Upload file
            </button>
          </div>
        )}

        {/* Hidden file input */}
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          accept={accept}
          multiple={true}
          onChange={handleInput}
        />
      </div>
    </div>
  );
}
