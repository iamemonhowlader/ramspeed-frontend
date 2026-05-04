"use client";

import React from "react";
import Link from "next/link";
import { Menu, Star, Wallet, LogOut } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

const QuickActions = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const actions = [
    {
      name: "Manage Menu",
      icon: Menu,
      link: "/administrator/dashboard/menu-products",
      color: "bg-blue-500",
      image: "/dashboard/icons/menu.jpg"
    },
    {
      name: "Featured Products",
      icon: Star,
      link: "/administrator/dashboard/website-customization/features",
      color: "bg-amber-500",
      image: "/dashboard/icons/features.png"
    },
    {
      name: "Expenses",
      icon: Wallet,
      link: "/administrator/dashboard/shop-management/expenses",
      color: "bg-emerald-500",
      image: "/dashboard/icons/Expenses.jpg"
    },
    {
      name: "Logout",
      icon: LogOut,
      onClick: () => {
        if (confirm("Are you sure you want to logout?")) {
          logout();
          router.push("/administrator/login");
        }
      },
      color: "bg-rose-500",
      image: "/dashboard/icons/logout.jpg"
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
      {actions.map((action, index) => (
        <div key={index} className="group relative">
          {action.onClick ? (
            <button
              onClick={action.onClick}
              className="w-full flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`${action.color} p-4 rounded-xl text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <action.icon size={32} />
              </div>
              <span className="font-semibold text-gray-700">{action.name}</span>
            </button>
          ) : (
            <Link
              href={action.link}
              className="w-full flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className={`${action.color} p-4 rounded-xl text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <action.icon size={32} />
              </div>
              <span className="font-semibold text-gray-700">{action.name}</span>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
