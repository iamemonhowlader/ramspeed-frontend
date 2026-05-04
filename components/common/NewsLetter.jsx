const NewsLetter = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 bg-white gap-6 md:gap-18 rounded-2xl">
      <div className="max-w-full lg:max-w-[35%]">
        <h1 className="text-xl md:text-4xl text-center font-black text-black">
          Sign Up For Newsletter & Get 20% Off
        </h1>
      </div>

      {/* Form */}
      <form className="w-full lg:w-2/3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-0">
        <input
          className="border border-black h-12 sm:h-13 px-3 rounded-md sm:rounded-r-none outline-none w-full"
          type="email"
          placeholder="Enter your email address"
          required
        />
        <button
          type="submit"
          className="h-12 sm:h-13 px-6 sm:px-10 md:px-12 font-black uppercase text-white bg-black hover:bg-black/90 transition-all rounded-md sm:rounded-l-none"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetter;
