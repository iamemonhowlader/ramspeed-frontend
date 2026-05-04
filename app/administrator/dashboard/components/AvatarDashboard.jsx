import React from "react";
import Image from "next/image";

const AvatarDashboard = ({ image, size = 52 }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Image
        src={image}
        alt="user"
        width={size}
        height={size}
        className="w-10 h-10 md:w-12 md:h-12 lg:w-[52px] lg:h-[52px] rounded-full overflow-hidden object-cover"
      />
      <div className="hidden md:block">
        <p className="font-semibold text-sm lg:text-base">John Karter</p>
        <p className="text-[#A3A3A3] text-xs lg:text-sm">User</p>
      </div>
    </div>
  );
};

export default AvatarDashboard;
