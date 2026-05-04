"use client";
import React from "react";

import Product from "@/components/Product/Product";
import { navigation } from "@/utils/navigation";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import ShopNowHeading from "../components/ShopNowHeading";
import Sidebar from "../components/Sidebar";

const ShopNowSlugPage = ({ params }) => {
  const { slug } = React.use(params);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before accessing browser APIs
  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!mounted) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted]);

  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto px-4 lg:px-0">
        {/* Top Info */}
        <div className="py-8 sm:py-12">
          <ShopNowHeading slug={slug} navigation={navigation} />
          {/* Mobile Filters Toggle */}
          <div className="sm:hidden mt-2 sm:mt-0">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm"
            >
              Filters
            </button>
          </div>
        </div>
        {/* Mobile Sidebar Drawer (animated open/close) */}
        <div
          className={`fixed inset-0 z-50 sm:hidden ${
            isSidebarOpen ? "" : "pointer-events-none"
          }`}
        >
          <div
            className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div
            className={`absolute left-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close filters"
              >
                ✕
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-56px)]">
              <Sidebar />
            </div>
          </div>
        </div>
        {/* Shop Now Layout */}
        <div className="py-8 sm:py-12">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="hidden lg:flex w-full flex-col gap-20 sm:w-1/4">
              <Sidebar />
            </div>
            {/* Shop Now Products */}
            <div className="w-full sm:w-3/4">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
                {Array.from({ length: 12 }).map((_, index) => (
                  <div key={index} className="">
                    <Product />
                  </div>
                ))}
              </div>
              <div className="flex justify-center py-8 sm:py-12">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNowSlugPage;
