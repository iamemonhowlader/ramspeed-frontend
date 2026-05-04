"use client";

import AdminDashboardHeader from "./components/AdminDashboardHeader";
import CopyRight from "./components/CopyRight";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

const Layout = ({ children }) => {
  const { user, token } = useAuthStore();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is logged in as admin
    if (!token || user?.table !== 'admin_users') {
      router.push("/administrator/login");
    } else {
      setIsAuthorized(true);
    }
  }, [token, user, router]);

  if (!isAuthorized) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Verifying session...</div>;
  }

  return (
    <main className="bg-[#FAFAFA] flex flex-col min-h-screen">
      <AdminDashboardHeader />

      <div className="max-w-[1832px] w-full mx-auto px-4 flex flex-col flex-1">
        <div className="py-8 sm:py-12 flex-1">{children}</div>
      </div>

      <footer>
        <CopyRight />
      </footer>
    </main>
  );
};

export default Layout;
