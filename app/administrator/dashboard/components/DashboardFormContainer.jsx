import React from "react";

const DashboardFormContainer = ({ title, subtitle, children }) => {
  return (
    <div className="md:bg-[#F5FAFF] md:p-5 xl:p-15 max-w-[1500px] mx-auto space-y-4 xl:space-y-10 rounded-xl md:shadow-md lg:shadow-xl">
      {/* heading  */}
      <div className="h-3 bg-primary rounded-full" />
      <div className="mb-8">
        <h1 className="text-lg xl:text-3xl font-bold text-[#101828] mb-3">{title}</h1>
        <p className="text-xs xl:text-[16px] font-normal text-[#667085]">{subtitle}</p>
      </div>

      {children}
    </div>
  );
};

export default DashboardFormContainer;
