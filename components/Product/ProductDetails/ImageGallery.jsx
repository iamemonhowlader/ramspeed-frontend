"use client";

import Image from "next/image";
import { useState } from "react";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });

  // Default images if none provided
  const defaultImages = [
    "/product-gallery-1.png",
    "/product-gallery-2.png",
    "/product-gallery-3.png",
    "/product-gallery-4.png",
  ];

  const hasImages = Array.isArray(images) && images.length > 0;
  const galleryImages = hasImages ? images : defaultImages;

  return (
    <div className="w-full">
      {/* Main Image */}
      <div
        className="relative group aspect-[4/3] mb-4 bg-white rounded-lg overflow-hidden border border-gray-200 cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => {
          setZoomed(false);
          setOrigin({ x: 50, y: 50 });
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          setOrigin({ x, y });
        }}
        aria-label="Zoom product image"
      >
        <Image
          src={galleryImages[selectedImage]}
          alt="Product image"
          fill
          unoptimized
          className="object-cover h-full w-full"
          priority
          style={{
            transform: zoomed ? "scale(1.6)" : "scale(1)",
            transformOrigin: `${origin.x}% ${origin.y}%`,
            transition: "transform 300ms ease-out, transform-origin 100ms ease-out",
            willChange: "transform",
          }}
        />
      </div>

      {/* Thumbnail Navigation */}
      <div className="relative flex items-center">
        <button
          className="absolute left-0 z-10 bg-primary text-white rounded-full p-2 shadow-md  cursor-pointer"
          onClick={() =>
            setSelectedImage((prev) =>
              prev > 0 ? prev - 1 : galleryImages.length - 1
            )
          }
          aria-label="Previous image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div className="flex gap-2 overflow-x-auto py-2 px-8 w-full items-center justify-center">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`relative min-w-[80px] h-20 border-2 rounded cursor-pointer ${
                selectedImage === index ? "border-blue-600" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image}
                alt={`Product view ${index + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <button
          className="absolute right-0 z-10 bg-primary text-white cursor-pointer rounded-full p-2 shadow-md"
          onClick={() =>
            setSelectedImage((prev) =>
              prev < galleryImages.length - 1 ? prev + 1 : 0
            )
          }
          aria-label="Next image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageGallery;
