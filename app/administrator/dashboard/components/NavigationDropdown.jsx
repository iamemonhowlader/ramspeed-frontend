"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // ✅ Add this
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavigationDropdown({ name, icon: Icon, children, parentLink }) {
  const pathname = usePathname();
  // ✅ Find the parent link from the first child or detect base segment
  // e.g. /administrator/dashboard/shop-management
  // const parentLink = children[0]?.link.split("/").slice(0, 4).join("/");
  const isActive = pathname.startsWith(parentLink);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-3 lg:px-4 py-2 rounded-lg border
          ${
            isActive
              ? "bg-[#D5EBFF] text-blue-700 border-blue-200"
              : "bg-white text-gray-700 border-gray-200"
          }
          hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 hover:shadow-sm
          transition-all duration-200 whitespace-nowrap font-medium text-xs
          focus:outline-none focus:ring-0 focus:ring-blue-500 focus:ring-offset-0`}
      >
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
        <span>{name}</span>
        <ChevronDown className="w-3 h-3 md:w-3.5 md:h-3.5 ml-0.5 md:ml-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-48 md:w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1 relative"
      >
        {children.map((child) => {
          const hasSubChildren = child.children && child.children.length > 0;

          if (hasSubChildren) {
            return (
              <div key={child.name} className="relative group">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-gray-700 rounded-md
                      hover:bg-blue-50 font-medium cursor-default flex justify-between items-center"
                  >
                    <span>{child.name}</span>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    side="right"
                    align="start"
                    className="ml-1 w-48 bg-blue-50 border border-blue-200 shadow-lg p-1 rounded-lg"
                  >
                    {child.children.map((subChild) => (
                      <DropdownMenuItem key={subChild.name} asChild>
                        <Link
                          href={subChild.link}
                          className={`block w-full px-2 md:px-3 py-1.5 md:py-2 text-sm rounded-md transition-colors duration-150 font-medium ${
                            pathname === subChild.link
                              ? "bg-[#D5EBFF] text-blue-700"
                              : "text-blue-900 hover:bg-blue-100 hover:text-blue-700"
                          }`}
                        >
                          {subChild.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            );
          }

          return (
            <DropdownMenuItem key={child.name} asChild>
              <Link
                href={child.link}
                className={`w-full px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm rounded-md font-medium transition-colors duration-150 ${
                  pathname === child.link
                    ? "bg-[#D5EBFF] text-blue-700"
                    : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {child.name}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
