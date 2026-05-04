"use client";

import { formatString } from "@/lib/formateString";
import { cn } from "@/lib/utils";
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
      "border border-[#E8E8E8] py-3 flex items-center h-8 justify-center px-3 text-xs text-[#596464]",
      wrap && "break-words whitespace-normal",
      "font-semibold text-[12px] rounded-[8px] m-[1px] ",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
const shippingDetailColumn = [
  {
    id: "key",
    cell: ({ row }) => (
      <TableCell className={"justify-start text-[#0068C8]"}>
        {formatString(row?.original?.key)}
      </TableCell>
    ),
  },
  {
    id: "value",
    cell: ({ row }) => (
      <TableCell className={"justify-start"}>{row?.original?.value}</TableCell>
    ),
  },
];

export default shippingDetailColumn;
