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

const NewsLetterColumns = [
  {
    accessorKey: "serial",
    header: () => <TableHeader>Serial</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-[#0068C8]"}>
        {row.getValue("serial")}
      </TableCell>
    ),
  },
  {
    accessorKey: "email",
    header: () => <TableHeader>Email</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("email")}</TableCell>,
  },
  {
    accessorKey: "phone",
    header: () => <TableHeader>Phone</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("phone")}</TableCell>,
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row }) => {
      return (
        <TableCell className="flex justify-center gap-1 px-0">
          {/* select  */}
          <div
            className={
              " bg-transparent p-[6px] flex-1 flex items-center justify-center hover:bg-white border border-[#2B8EDF] rounded"
            }
          >
            <Checkbox className={"bg-white cursor-pointer"} />
          </div>

          {/* decline  */}
          <Button
            variant={"outline"}
            onClick={() => notImplemented()}
            size={"sm"}
            className={
              "border-red-600 flex-1 text-red-600 font-medium hover:bg-red-600"
            }
          >
            Decline
          </Button>
        </TableCell>
      );
    },
  },
];

export default NewsLetterColumns;
