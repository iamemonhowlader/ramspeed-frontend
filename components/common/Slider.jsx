import Image from "next/image";
import { MdEuro } from "react-icons/md";

const Slider = () => {
  return (
    <div className="w-full h-auto lg:h-[500px] bg-[#192c57] rounded-2xl">
      {/* Slider Content */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
        <div className="pl-10 lg:pl-20 flex items-start justify-center flex-col">
          <p className="bg-[#dd2831] text-xs uppercase font-semibold letter-spacing-[1px] text-white rounded px-4 py-1.5 mb-4">
            Weekend Deal
          </p>
          <h2 className="text-white text-xl sm:text-4xl font-black md:text-[64px] mb-2">
            All New <br />
            For A Better You
          </h2>
          <p className="text-white text-base sm:text-2xl uppercase">
            Amazing Discounts And Deals
          </p>
          <p className="my-5  flex items-center justify-center gap-4">
            <span className="text-white"> From</span>
            <span className="text-[#FCC904] text-3xl font-bold  flex items-center justify-center gap-2">
              <span>
                <MdEuro />
              </span>
              <span> 300.45</span>
            </span>
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-lg font-medium transition-colors text-sm sm:text-base md:text-lg uppercase tracking-wide cursor-pointer inline-block w-fit lg:mx-0">
            SHOP NOW
          </button>
        </div>
        <div className="flex items-center justify-center flex-col pr-0 lg:pr-0">
          <Image
            src="/slider-1.png"
            alt="slider-1"
            width={500}
            height={500}
            className="max-h-[418px] h-[200px] object-contain sm:h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
