"use client";

import { IoPerson } from "react-icons/io5";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AccountDropdown() {
  return (
    <ul className="navbar-nav relative z-[3] flex flex-col justify-between max-[1024px]:m-0">
      <li className="nav-item relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="nav-icon text-[14px] font-medium text-[#000] relative flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-gray-100 transition"
            >
              <IoPerson size={26} color="#0068c8" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            className="min-w-[160px]  border border-blue-600 rounded-[5px] shadow-md"
          >
            <DropdownMenuItem asChild>
              <Link
                href="/my-account/sign-up"
                className="cursor-pointer w-full py-[6px] px-[14px] text-sm text-blue-600 capitalize hover:text-primary transition-colors"
              >
                Sign up
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/my-account/login"
                className="cursor-pointer w-full py-[6px] px-[14px] text-sm text-blue-600 capitalize hover:text-primary transition-colors"
              >
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/my-account/edit-profile"
                className="cursor-pointer w-full py-[6px] px-[14px] text-sm text-blue-600 capitalize hover:text-primary transition-colors"
              >
                Edit Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    </ul>
  );
}
