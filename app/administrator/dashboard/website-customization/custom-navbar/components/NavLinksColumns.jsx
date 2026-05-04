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
      "border border-[#E8E8E8] py-5 flex items-center h-8 justify-center px-3 text-xs text-[#191D23]",
      wrap && "break-words whitespace-normal",
      "font-semibold text-[12px] rounded-[8px] m-[1px]",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const NavLinksColumns = [
  {
    accessorKey: "serial",
    header: () => <TableHeader>Serial</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-[#008ECC]"}>
        {row.getValue("serial")}
      </TableCell>
    ),
  },
  {
    accessorKey: "category",
    header: () => <TableHeader>Category name</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("category")}</TableCell>,
  },
  {
    accessorKey: "url",
    header: () => <TableHeader>URL</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("url")}</TableCell>,
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row }) => {
      return (
        <TableCell className="flex justify-center gap-1  px-0">
          {/* delete  */}
          {/* <Button
            variant={"outline"}
            className={
              "font-medium py-1 rounded-full bg-[#396AFF] hover:bg-white text-white hover:text-[#396AFF] "
            }
            size={"sm"}
            onClick={() => notImplemented()}
          >
            Delete
          </Button> */}

          <Button
            variant={"outline"}
            className={"font-medium flex-1"}
            size={"sm"}
            onClick={() => notImplemented()}
          >
            Delete
          </Button>
        </TableCell>
      );
    },
  },
];

export default NavLinksColumns;
