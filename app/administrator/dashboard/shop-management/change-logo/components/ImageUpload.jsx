"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Camera } from "lucide-react";
import CrossIcon from "@/components/svg/CrossIcon";

/**
 * Single Image Upload Component
 * -------------------------------------------
 * - Clickable container triggers file selection only if no image is uploaded
 * - Drag & drop supported
 * - Displays preview with remove functionality
 * - Fully responsive
 * -------------------------------------------
 */
function ImageUpload({
  src,
  file,
  errors,
  onChange,
  onRemove,
  className,
  label = "Add product photo",
  accept = "image/png, image/jpeg, image/jpg",
}) {
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Notify parent when image changes
  useEffect(() => {
    onChange?.(image);
  }, [image]);

  // Remove the old useEffect that runs once
  useEffect(() => {
    setImage(file || null);
  }, [file]);

  useEffect(() => {
    setPreviewImage(src || null);
  }, [src]);

  /** Handle file input (manual selection or drag-drop) */
  function handleFiles(files) {
    const file = files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    }
  }

  function handleInput(e) {
    setPreviewImage(null);
    handleFiles(e.target.files);
    e.target.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setPreviewImage(null);
    handleFiles(e.dataTransfer.files);
  }

  function removeImage() {
    setImage(null);
    setPreviewImage(null);
    onRemove?.();
  }

  return (
    <div className={cn("w-full", className)}>
      {/* Label */}
      <div className="mb-2 sm:mb-3">
        <span className="font-semibold text-sm sm:text-lg md:text-xl">
          {label}
        </span>
      </div>

      {/* Upload Container */}
      <div
        className={cn(
          `bg-white flex flex-col justify-center items-center border-2 border-dashed ${
            errors ? "border-red-500" : "border-blue-200"
          } rounded-xl min-h-[140px] sm:min-h-[160px] md:min-h-[180px] w-full relative transition p-3 sm:p-6`,
          !image && "hover:bg-blue-50 cursor-pointer"
        )}
        tabIndex={0}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => {
          if (!image) fileRef.current?.click();
        }}
      >
        {/* preview image */}
        {previewImage ? (
          <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] mx-auto">
            <div className="aspect-square w-full relative rounded-lg overflow-hidden shadow-sm">
              <Image
                src={previewImage}
                alt="Uploaded image"
                fill
                className="object-cover object-center"
                unoptimized
              />
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(null);
                removeImage();
              }}
              className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-red-100 transition"
              aria-label="Remove image"
            >
              <CrossIcon />
            </button>
          </div>
        ) : image ? (
          <div className="relative w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] mx-auto">
            <div className="aspect-square w-full relative rounded-lg overflow-hidden shadow-sm">
              <Image
                src={URL.createObjectURL(image)}
                alt="Uploaded image"
                fill
                className="object-cover object-center"
                unoptimized
              />
            </div>

            {/* Remove Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewImage(null);
                removeImage();
              }}
              className="absolute top-2 right-2 bg-white/80 rounded-full p-1 hover:bg-red-100 transition"
              aria-label="Remove image"
            >
              <CrossIcon />
            </button>

            {/* File Name */}
            <div className="text-xs sm:text-sm text-gray-500 text-center mt-2 truncate w-full">
              {image.name}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center text-center py-6 sm:py-8 w-full">
            <Camera size={36} className="sm:mb-2" color="#D0D5DD" />
            <div className="font-medium mt-2 text-xs sm:text-sm">
              Drop your image here{" "}
              <span className="text-sky-600 underline cursor-pointer">
                or browse
              </span>
            </div>
            <div className="text-gray-400 text-[10px] sm:text-xs mt-1">
              Support: JPG, JPEG, PNG
            </div>
          </div>
        )}

        {errors && <p className="text-red-500 text-sm mt-1">{errors}</p>}

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileRef}
          style={{ display: "none" }}
          accept={accept}
          multiple={false}
          onChange={handleInput}
        />
      </div>
    </div>
  );
}

export default ImageUpload;
