"use client";

import { cn } from "@/lib/utils";
import BadgeTable from "@/components/common/BadgeTable";
import { Check, Cross, X } from "lucide-react";
import notImplemented from "@/lib/notImplemented";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

// Table UI helpers
const TableHeader = ({ children, className }) => (
  <div
    className={cn(
      "bg-[#F7F8F9] border border-[#E8E8E8] py-3 flex items-center text-[#0068C8] font-bold text-base xl:text-xl  justify-center px-1 m-[1px]",
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

export const clientsColumn = [
  {
    accessorKey: "id",
    header: () => <TableHeader>ID</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-primary"}>{row.getValue("id")}</TableCell>
    ),
  },
  {
    accessorKey: "fullName",
    header: () => <TableHeader>Full name</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("fullName")}</TableCell>,
  },
  {
    accessorKey: "address",
    header: () => <TableHeader>Address</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("address")}</TableCell>,
  },
  {
    accessorKey: "balance",
    header: () => <TableHeader>Balance</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <BadgeTable>€ {row.getValue("balance")}</BadgeTable>
      </TableCell>
    ),
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
            href={`/administrator/dashboard/users-management/clients/edit/${row.original.id}`}
          >
            <Button
              variant={"outline"}
              className={"font-medium w-full"}
              size={"sm"}
            >
              Edit
            </Button>
          </Link>
          <Button
            variant={"outline"}
            onClick={() => notImplemented()}
            size={"sm"}
            className={
              "border-red-600 flex-1 text-red-600 font-medium hover:bg-red-600"
            }
          >
            delete
          </Button>
        </TableCell>
      );
    },
  },
];

export default clientsColumn;
