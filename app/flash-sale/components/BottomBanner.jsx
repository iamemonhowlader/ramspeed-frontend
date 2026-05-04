const BottomBanner = () => {
  return (
    <div className="bg-[url('/special-discount.png')] py-12 bg-no-repeat bg-center bg-cover rounded-2xl p-4 sm:p-15">
      <div className="max-w-xl text-left flex flex-col gap-6">
        <p className="text-[#DD2831] text-xs sm:text-base font-semibold uppercase">
          Exclusive Airphone
        </p>
        <h2 className="font-extrabold text-3xl sm:text-5xl text-black ">
          30% discount on all <span className="text-primary">headphone</span>
        </h2>
        <button className="bg-primary hover:bg-primary/90 text-white py-3 px-6 rounded-md transition-colors duration-200 text-sm uppercase tracking-wide cursor-pointer w-fit">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BottomBanner;
