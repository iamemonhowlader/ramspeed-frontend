"use client";

import React from "react";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";

const AvatarDashboard = ({ size = 40 }) => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/administrator/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:bg-gray-50 p-1 rounded-xl transition-colors group">
          <div 
            className="rounded-full overflow-hidden border border-gray-100 shadow-sm bg-blue-50 flex items-center justify-center text-blue-600 font-bold flex-shrink-0"
            style={{ width: size, height: size }}
          >
            {user?.full_name ? user.full_name.charAt(0) : "A"}
          </div>
          <div className="hidden md:block">
            <p className="font-semibold text-sm text-gray-800 leading-tight">
              {user?.full_name || "Administrator"}
            </p>
            <p className="text-[#A3A3A3] text-[10px] uppercase tracking-wider font-bold">
              {user?.user_type || "Master"}
            </p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-xl border-gray-100 p-2">
        <DropdownMenuLabel className="font-normal p-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-semibold leading-none text-gray-900">{user?.full_name}</p>
            <p className="text-xs leading-none text-gray-500">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 bg-gray-100" />
        <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-lg cursor-pointer focus:bg-primary/5 focus:text-primary">
          <User className="w-4 h-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 rounded-lg cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDashboard;
