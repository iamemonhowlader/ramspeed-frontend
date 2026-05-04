"use client";

import React from "react";
import Image from "next/image";
import useAuthStore from "@/store/authStore";

const AvatarDashboard = ({ size = 52 }) => {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center gap-2 md:gap-3 cursor-pointer">
      <div 
        className="rounded-full overflow-hidden border border-gray-100 shadow-sm bg-blue-50 flex items-center justify-center text-blue-600 font-bold"
        style={{ width: size, height: size }}
      >
        {user?.full_name ? user.full_name.charAt(0) : "A"}
      </div>
      <div className="hidden md:block">
        <p className="font-semibold text-sm lg:text-base text-gray-800 leading-tight">
          {user?.full_name || "Administrator"}
        </p>
        <p className="text-[#A3A3A3] text-xs lg:text-sm capitalize font-medium">
          {user?.type || "Staff"}
        </p>
      </div>
    </div>
  );
};

export default AvatarDashboard;
