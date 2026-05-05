"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";

const SignOutButton = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <button
      onClick={handleSignOut}
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
