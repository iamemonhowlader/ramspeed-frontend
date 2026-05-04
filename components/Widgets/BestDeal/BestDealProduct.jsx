"use client";

import Image from "next/image";

const BestDealProduct = () => {
  return (
    <div className="col-span-2 bg-[#d8d9eb] rounded-2xl px-6 sm:px-7.5 py-12 sm:py-15 relative overflow-hidden h-full flex items-center">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 lg:gap-8">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-mulish text-black mb-4 leading-tight px-4 sm:px-0">
            Enhanced featured product
          </h2>
          <p className="text-black text-sm sm:text-base md:text-lg mb-6 max-w-xs sm:max-w-md mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
            BEST DEAL OF THE DAY - CHECK FOR OTHER DEAL AND GRAB THE OFFER
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-lg font-medium transition-colors text-sm sm:text-base md:text-lg uppercase tracking-wide cursor-pointer inline-block w-fit mx-auto lg:mx-0">
            SHOP NOW
          </button>
        </div>

        {/* Right Content - iPhone Display */}
        <div className="flex-1 flex justify-center lg:justify-end items-center relative order-1 lg:order-2 w-full">
          <div className="relative flex items-center justify-center w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none">
            <Image
              src="/iphone.png"
              alt="iPhone 14 Pro"
              width={400}
              height={800}
              unoptimized
              className="h-auto w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] xl:max-w-[450px] rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-[2.5rem]"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDealProduct;
