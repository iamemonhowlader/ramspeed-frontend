"use client";

import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Table UI helpers
const TableHeader = ({ children, className }) => (
  <div
    className={cn(
      "bg-[#F7F8F9] border border-[#E8E8E8] py-3 flex items-center text-[#0068C8] font-bold text-base xl:text-xl justify-center px-1 m-[1px]",
      className
    )}
  >
    {children}
  </div>
);

const TableCell = ({ children, className, wrap = false, ...props }) => (
  <div
    className={cn(
      "border border-[#E8E8E8] py-3 flex items-center h-8 justify-center px-3 text-xs text-[#191D23]",
      wrap && "break-words whitespace-normal",
      "font-semibold text-[12px] rounded-[8px] m-[1px]",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const usersAccessLevelColumns = [
  {
    accessorKey: "id",
    header: () => <TableHeader>ID</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("id")}</TableCell>,
  },
  {
    accessorKey: "fullName",
    header: () => <TableHeader>Full name</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("fullName")}</TableCell>,
  },
  {
    accessorKey: "username",
    header: () => <TableHeader>Username</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("username")}</TableCell>,
  },
  {
    accessorKey: "email",
    header: () => <TableHeader>Email</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("email")}</TableCell>,
  },
  {
    accessorKey: "active",
    header: () => <TableHeader>Active</TableHeader>,
    cell: ({ row }) => {
      const isActive = row.getValue("active");
      return (
        <TableCell
          className={`${isActive ? "border-green-400" : "border-red-600"}`}
        >
          {isActive ? (
            <Check size={14} color="green" />
          ) : (
            <X size={14} color="red" />
          )}
        </TableCell>
      );
    },
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row }) => {
      return (
        <TableCell className="flex justify-center gap-1  px-0">
          <Link
            className="flex-1"
            href={`/administrator/dashboard/users-management/users/edit/${row?.original?.id}`}
          >
            <Button
              variant={"outline"}
              className={"font-medium w-full"}
              size={"sm"}
            >
              Edit
            </Button>
          </Link>
        </TableCell>
      );
    },
  },
];

export default usersAccessLevelColumns;