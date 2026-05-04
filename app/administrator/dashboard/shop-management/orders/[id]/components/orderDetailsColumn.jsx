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
const orderDetailsColumn = [
  {
    accessorKey: "item",
    header: () => <TableHeader>Item</TableHeader>,
    cell: ({ row }) => {
      if (row.original.isSummary) {
        return (
          <TableCell className="mx-0 justify-start border-r-0 rounded-br-none rounded-tr-none text-[#0068C8]">
            {row.getValue("item")}
          </TableCell>
        );
      }
      return (
        <TableCell className="justify-start">{row.getValue("item")}</TableCell>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <TableHeader>Quantity</TableHeader>,
    cell: ({ row }) =>
      row.original.isSummary ? (
        <TableCell className={"mx-0 rounded-none border-l-0 border-r-0"} />
      ) : (
        <TableCell>{row.getValue("quantity")}</TableCell>
      ),
  },
  {
    accessorKey: "unitPrice",
    header: () => <TableHeader>Price</TableHeader>,
    cell: ({ row }) =>
      row.original.isSummary ? (
        <TableCell
          className={"mx-0 rounded-tl-none rounded-bl-none border-l-0"}
        />
      ) : (
        <TableCell>€ {row.getValue("unitPrice")}</TableCell>
      ),
  },
  {
    accessorKey: "linePrice",
    header: () => <TableHeader>Line Price</TableHeader>,
    cell: ({ row }) => <TableCell>€ {row.getValue("linePrice")}</TableCell>,
  },
];

export default orderDetailsColumn;
