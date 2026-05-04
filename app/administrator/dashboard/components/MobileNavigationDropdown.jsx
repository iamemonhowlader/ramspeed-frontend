"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

/**
 * MobileNavigationDropdown Component
 * Nested accordion for children with own children
 * Parents with children are not clickable links
 */
export default function MobileNavigationDropdown({
  name,
  icon: Icon,
  children,
  onLinkClick,
  parentLink,
}) {
  const [expanded, setExpanded] = useState(false);
  const [subExpanded, setSubExpanded] = useState(null);
  const pathname = usePathname();
  const isActive = pathname.startsWith(parentLink);

  
  return (
    <div className="flex flex-col gap-2">
      {/* Top-level accordion button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border
          bg-white text-gray-700 border-gray-200
          hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300
          transition-all duration-200 font-medium text-sm
          ${isActive ? "!text-blue-600 !bg-blue-50 !border-blue-300" : ""}`}
        type="button"
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="flex-1 text-left">{name}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Child listing */}
      {expanded && (
        <div className="flex flex-col gap-1 pl-6 border-l-2 border-gray-200">
          {children.map((child, idx) => {
            const hasSubChildren = child.children && child.children.length > 0;

            if (hasSubChildren) {
              // Child with own children: expandable non-clickable
              return (
                <div key={child.name} className="flex flex-col">
                  <button
                    onClick={() =>
                      setSubExpanded(subExpanded === idx ? null : idx)
                    }
                    className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 font-medium justify-between hover:bg-blue-50"
                    type="button"
                  >
                    <span>{child.name}</span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        subExpanded === idx ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {subExpanded === idx && (
                    <div className="pl-6 border-l py-1 mt-1">
                      {child.children.map((subChild) => (
                        <SheetClose asChild key={subChild.name}>
                          <Link
                            href={subChild.link}
                            onClick={onLinkClick}
                            className={`block px-3 py-2 rounded text-gray-700 hover:bg-blue-100 hover:text-blue-800 text-sm font-medium ${
                              pathname === subChild?.link
                                ? "!text-blue-600 !bg-blue-50 !border-blue-300"
                                : ""
                            }`}
                          >
                            {subChild.name}
                          </Link>
                        </SheetClose>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Simple clickable link for child without children
            return (
              <SheetClose asChild key={child.name}>
                <Link
                  href={child.link}
                  onClick={onLinkClick}
                  className={`flex items-center px-3 py-2 rounded-md text-sm
                    text-gray-700 hover:bg-blue-50 hover:text-blue-600
                    transition-colors duration-150 font-medium
                    ${
                      pathname === child?.link
                        ? "!text-blue-600 !bg-blue-50 !border-blue-300"
                        : ""
                    }`}
                >
                  {child.name}
                </Link>
              </SheetClose>
            );
          })}
        </div>
      )}
    </div>
  );
}
