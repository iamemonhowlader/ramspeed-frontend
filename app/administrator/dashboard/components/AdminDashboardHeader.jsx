"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Settings, HelpCircle, Search } from "lucide-react";
import Logo from "@/components/common/Logo";
import AvatarDashboard from "./AvatarDashboard";
import Searchbar from "./Searchbar";
import NavigationDropdown from "./NavigationDropdown";
import MobileNavigationDropdown from "./MobileNavigationDropdown";
import { navigationData } from "@/config/navigationData";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * AdminDashboardHeader Component
 * A true "Row Layout" premium header that integrates Branding, Navigation, Search, and Actions.
 * Features:
 * - Glassmorphism sticky container
 * - Integrated Desktop Navigation (Dropdowns)
 * - Compact Search trigger
 * - User Actions & Profile
 * - Full Mobile responsiveness with Sidebar
 */
const AdminDashboardHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-[1832px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-4 lg:gap-6">
        {/* ==================== LEFT: Logo & Mobile Trigger ==================== */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="xl:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/5 text-gray-600"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 overflow-y-auto">
                <SheetHeader className="p-6 border-b">
                  <SheetTitle className="text-left flex items-center gap-2">
                    <Logo />
                    <span className="text-sm font-bold text-gray-400">
                      Admin
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="p-4 flex flex-col gap-2">
                  {navigationData.map((item) =>
                    item.children && item.children.length > 0 ? (
                      <MobileNavigationDropdown
                        key={item.name}
                        name={item.name}
                        icon={item.icon}
                        children={item.children}
                        onLinkClick={() => setIsMobileMenuOpen(false)}
                        parentLink={item?.link}
                      />
                    ) : (
                      <Link
                        key={item.name}
                        href={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 font-medium text-sm ${
                          pathname === item?.link
                            ? "bg-primary/5 text-primary border-primary/10 shadow-sm"
                            : "bg-transparent text-gray-600 border-transparent hover:bg-gray-50"
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </Link>
                    )
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <Logo />
        </div>

        {/* ==================== CENTER: Desktop Navigation ==================== */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navigationData.slice(0, 6).map((item) =>
            item.children && item.children.length > 0 ? (
              <NavigationDropdown
                key={item.name}
                name={item.name}
                icon={item.icon}
                children={item.children}
                parentLink={item?.link}
              />
            ) : (
              <Link
                key={item.name}
                href={item.link}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 whitespace-nowrap font-medium text-xs ${
                  pathname === item?.link
                    ? "bg-primary/5 text-primary shadow-sm"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            )
          )}

          {/* "More" or Remaining items if navigation is too long */}
          {navigationData.length > 6 && (
            <NavigationDropdown
              name="More"
              icon={Settings}
              children={navigationData.slice(6)}
              parentLink="#"
            />
          )}
        </nav>

        {/* ==================== RIGHT: Search, Actions & Profile ==================== */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
          {/* Search Bar - Expandable or Responsive */}
          <div className="hidden md:block w-full max-w-[240px] lg:max-w-xs transition-all duration-300">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <Search className="w-5 h-5" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="hidden sm:flex items-center gap-1 border-l pl-4 border-gray-100">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-primary hover:bg-primary/5 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-primary hover:bg-primary/5"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>

          {/* Profile */}
          <div className="flex-shrink-0">
            <AvatarDashboard
              image="https://randomuser.me/api/portraits/men/32.jpg"
              size={40}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;
