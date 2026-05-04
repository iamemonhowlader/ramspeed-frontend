"use client";

import notImplemented from "@/lib/notImplemented";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  return (
    <button
      onClick={() => notImplemented()}
      className={
        "w-full text-sm font-medium justify-start text-[#5F6C72] cursor-pointer text-left px-[26] flex items-center gap-[6px] py-[10px]"
      }
    >
      <LogOut size={15} />
      Sign out
    </button>
  );
};

export default SignOutButton;
