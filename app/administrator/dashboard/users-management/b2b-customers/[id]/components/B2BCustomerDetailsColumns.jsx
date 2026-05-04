"use client";

import { formatString } from "@/lib/formateString";
import { cn } from "@/lib/utils";

const TableCell = ({ children, className, wrap = false, ...props }) => (
  <div
    className={cn(
      "border border-[#E8E8E8] py-3 flex items-center h-8 justify-center px-10 text-xs text-[#596464]",
      wrap && "break-words whitespace-normal",
      "font-semibold text-[12px] rounded-[8px] m-[1px] ",
      className
    )}
    {...props}
  >
    {children}
  </div>
);
const B2BCustomerDetailsColumns = [
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
    cell: ({ row }) => {
      const key = row?.original?.key;
      const value = row?.original?.value;
      if (key === "normalPrice" || key === "wholeSalePrice") {
        return (
          <TableCell className={"justify-center "}>{`€ ${value}`}</TableCell>
        );
      }
      return <TableCell className={"justify-center "}>{value}</TableCell>;
    },
  },
];
export default B2BCustomerDetailsColumns;
