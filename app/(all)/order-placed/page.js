"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const OrderPlacedContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("order_id");

  const handlePrint = () => {
    if (orderId) {
      // Open the backend print invoice URL in a new tab
      // The base URL for client-side is /backend-api (proxied)
      window.open(`/backend-api/api/frontend/print-invoice/${orderId}`, "_blank");
    } else {
      window.print();
    }
  };

  const handleBackHome = () => {
    router.push("/");
  };

  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="py-8 sm:py-12">
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center ">
            <svg
              width="133"
              height="132"
              viewBox="0 0 133 132"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.2"
                d="M66.5 115.5C93.8381 115.5 116 93.3381 116 66C116 38.6619 93.8381 16.5 66.5 16.5C39.1619 16.5 17 38.6619 17 66C17 93.3381 39.1619 115.5 66.5 115.5Z"
                fill="#0068C8"
              />
              <path
                d="M89.1875 53.625L58.9203 82.5L43.8125 68.0625"
                stroke="#0068C8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M66.5 115.5C93.8381 115.5 116 93.3381 116 66C116 38.6619 93.8381 16.5 66.5 16.5C39.1619 16.5 17 38.6619 17 66C17 93.3381 39.1619 115.5 66.5 115.5Z"
                stroke="#0068C8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-3xl font-black text-black capitalize my-8">
              Order Confirmed
            </h2>
            <p className="leading-[30px] text-gray-600">
              Thank you for your order. Your order ID is <span className="font-bold text-primary">#{orderId || "N/A"}</span>.
              <br />
              Your order has been confirmed and is being processed.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 mt-10 w-full max-w-md">
              <button 
                onClick={handlePrint}
                className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 px-8 rounded-xl transition-all duration-300 font-bold uppercase text-sm tracking-widest whitespace-nowrap shadow-lg shadow-primary/10"
              >
                Print Invoice
              </button>
              <button 
                onClick={handleBackHome}
                className="flex-1 bg-primary border-2 border-primary hover:bg-primary/90 text-white py-4 px-8 rounded-xl transition-all duration-300 font-bold uppercase text-sm tracking-widest whitespace-nowrap shadow-lg shadow-primary/20"
              >
                Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderPlaced = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <OrderPlacedContent />
    </Suspense>
  );
};

export default OrderPlaced;
