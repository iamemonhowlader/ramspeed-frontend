const Feature = ({ title, subtitle, icon }) => {
  return (
    <div className="flex flex-row items-center gap-6">
      <span className="scale-70 md:scale-100">{icon}</span>
      <div className="space-y-2 md:space-y-4">
        <h3 className="text-xl lg:text-3xl text-black font-bold">{title}</h3>
        <p className=" text-xs sm:text-base">{subtitle}</p>
      </div>
    </div>
  );
};

export default Feature;
