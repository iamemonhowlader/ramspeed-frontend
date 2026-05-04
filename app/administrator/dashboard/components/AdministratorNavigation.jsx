"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { navigationData } from "@/config/navigationData";
import NavigationDropdown from "./NavigationDropdown";
import MobileNavigationDropdown from "./MobileNavigationDropdown";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

/**
 * AdministratorNavigation Component
 * Main navigation bar with responsive design:
 * - Mobile/Tablet (< 1024px): Sidebar drawer using shadcn Sheet
 * - Desktop (1024px+): Horizontal navigation with dropdowns
 */
export default function AdministratorNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="w-full bg-[#FBFDFF] shadow-[0_23.929px_47.858px_-4.786px_rgba(145,158,171,0.16)]">
      <div className="px-4 sm:px-6 lg:px-8 max-w-[1832px] mx-auto">
        {/* ==================== Mobile/Tablet Sidebar (< 1024px) ==================== */}
        <div className="xl:hidden flex items-center justify-between py-3 sm:py-4">
          <span className="font-semibold text-gray-800 text-sm sm:text-base">
            Menu
          </span>

          {/* Mobile toggle button - Sidebar Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
              </button>
            </SheetTrigger>

            {/* Sidebar Content */}
            <SheetContent
              side="left"
              className="w-64 sm:w-72 p-4 overflow-y-auto"
            >
              <SheetHeader className="mb-6">
                <SheetTitle className="text-lg">Administrator Menu</SheetTitle>
              </SheetHeader>

              {/* Navigation Items in Sidebar */}
              <nav className="flex flex-col gap-2">
                {navigationData.map((item) => {
                  const Icon = item.icon;

                  // If item has children, render mobile dropdown
                  if (item.children && item.children.length > 0) {
                    return (
                      <MobileNavigationDropdown
                        key={item.name}
                        name={item.name}
                        icon={Icon}
                        children={item.children}
                        onLinkClick={() => setIsOpen(false)}
                        parentLink={item?.link}
                      />
                    );
                  }

                  // Otherwise, render simple link
                  return (
                    <SheetClose asChild key={item.name}>
                      <Link
                        href={item.link}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border
                          bg-white text-gray-700 border-gray-200
                          hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300
                          transition-all duration-200 font-medium text-sm ${
                            pathname === item?.link
                              ? "!text-blue-600 !bg-blue-50 !border-blue-300"
                              : ""
                          }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span>{item.name}</span>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* ==================== Desktop Navigation (>= 1024px) ==================== */}
      <div className="max-w-[1832px] w-full mx-auto hidden xl:flex items-center gap-1.5 xl:gap-2.5 px-4 py-3 xl:py-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {navigationData.map((item) => {
          const Icon = item.icon;

          // If item has children, render dropdown
          if (item.children && item.children.length > 0) {
            return (
              <NavigationDropdown
                key={item.name}
                name={item.name}
                icon={Icon}
                children={item.children}
                parentLink={item?.link}
              />
            );
          }

          // Otherwise, render simple link
          return (
            <Link
              key={item.name}
              href={item.link}
              className={`flex items-center gap-2 px-3 xl:px-4 py-2  rounded-lg border
                bg-white text-gray-700 border-gray-200
                hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm
                transition-all duration-200 whitespace-nowrap font-medium text-xs  flex-shrink-0 ${
                  pathname === item?.link
                    ? "!text-blue-600 !bg-blue-50 !border-blue-300"
                    : ""
                }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
