"use client";

import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function ResponsiveSignature() {
  const sigRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasWidth, setCanvasWidth] = useState(800);

  // Dynamically adjust canvas width based on container size
  useEffect(() => {
    const resizeCanvas = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setCanvasWidth(width);
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto my-4 border rounded-md p-2"
    >
      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: canvasWidth,
          height: 200,
          className: "border border-gray-300 w-full rounded-md",
        }}
      />
      <div className="flex justify-end gap-2 mt-3">
        <button
          onClick={() => sigRef.current.clear()}
          className="px-3 py-1 bg-red-500 text-white rounded-md"
        >
          Clear
        </button>
        <button
          onClick={() =>
            console.log(sigRef.current.getTrimmedCanvas().toDataURL())
          }
          className="px-3 py-1 bg-green-600 text-white rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
}
