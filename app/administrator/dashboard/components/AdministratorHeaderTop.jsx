import React from "react";
import Logo from "@/components/common/Logo";
import Searchbar from "./Searchbar";
import AvatarDashboard from "./AvatarDashboard";
import AdministratorNavigation from "./AdministratorNavigation";

const AdministratorHeaderTop = () => {
  return (
    <>
      {/* Main header container - responsive padding and layout */}
      <div className="px-4 md:px-6 lg:px-8 max-w-[1832px] w-full mx-auto flex flex-col lg:flex-row items-center justify-between py-4 md:py-6 lg:py-8 gap-4 md:gap-6 lg:gap-7">
        {/* Logo - centered on mobile, left-aligned on desktop */}
        <div className="w-full lg:w-auto flex justify-center lg:justify-start">
          <Logo />
        </div>

        {/* Search and Avatar container - responsive width and padding */}
        <div className="w-full lg:flex-1 flex flex-col sm:flex-row items-center bg-[#FBFDFF] p-3 md:p-4 shadow-sm rounded gap-3 sm:gap-4 justify-between">
          {/* Searchbar - full width on mobile */}
          <div className="w-full sm:flex-1">
            <Searchbar />
          </div>

          {/* Dashboard avatar - hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:block">
            <AvatarDashboard image="https://randomuser.me/api/portraits/men/32.jpg" />
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <AdministratorNavigation />
    </>
  );
};

export default AdministratorHeaderTop;
