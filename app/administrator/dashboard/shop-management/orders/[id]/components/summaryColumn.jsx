"use client";

import { cn } from "@/lib/utils";
import BadgeTable from "@/components/common/BadgeTable";
import { Check, Cross, X } from "lucide-react";
import notImplemented from "@/lib/notImplemented";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Table UI helpers
const TableHeader = ({ children, className }) => (
  <div
    className={cn(
      "bg-[#F7F8F9] border border-[#E8E8E8] py-3 flex items-center text-[#0068C8] font-bold text-[11px] justify-center px-1 m-[1px]",
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

const summaryColumn = [
  {
    id: "summary",
    cell: ({ row }) => (
      <TableCell className={"justify-start"}>Subtotal</TableCell>
    ),
  },
  {
    id: "blank1",
    cell: () => <></>,
  },
  {
    id: "blank2",
    cell: () => <></>,
  },
  {
    id: "total",
    cell: ({ row }) => <TableCell>€ {row?.original?.linePrice}</TableCell>,
  },
];

export default summaryColumn;
