"use client";

import { cn } from "@/lib/utils";
import BadgeTable from "@/components/common/BadgeTable";

const TableHeader = ({ children, className }) => (
  <div
    className={cn(
      "bg-[#F7F8F9] border border-[#E8E8E8] py-3 flex items-center text-[#0068C8] font-bold text-base xl:text-sm justify-center px-1 m-[1px] text-center",
      className
    )}
  >
    {children}
  </div>
);

const TableCell = ({ children, className, wrap = false, ...props }) => (
  <div
    className={cn(
      "border border-[#E8E8E8] py-4 flex items-center h-full min-h-[60px] justify-center px-3 text-xs text-[#191D23]",
      wrap && "break-words whitespace-normal",
      "font-semibold text-[12px] rounded-[8px] m-[1px] text-center",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const BalanceSheetColumns = (months) => [
  {
    accessorKey: "serial",
    header: () => <TableHeader>#</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-[#0068C8] font-bold w-12"}>
        {row.getValue("serial")}
      </TableCell>
    ),
  },
  {
    accessorKey: "month",
    header: () => <TableHeader>Month</TableHeader>,
    cell: ({ row }) => (
      <TableCell className="text-left justify-start px-4" wrap>
        {row.getValue("month")}
      </TableCell>
    ),
  },
  {
    accessorKey: "month1",
    header: () => <TableHeader>{months?.m1 || "Month 1"}</TableHeader>,
    cell: ({ row }) => {
      const value = row?.original?.month1;
      return (
        <TableCell>
          <BadgeTable className="bg-[#EEF2FF] text-black rounded-[8px] w-24 flex items-center justify-center">
            {value ? <p><span className="text-[#0068C8]">€ </span>{value}</p> : <span>-</span>}
          </BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "month2",
    header: () => <TableHeader>{months?.m2 || "Month 2"}</TableHeader>,
    cell: ({ row }) => {
      const value = row?.original?.month2;
      return (
        <TableCell>
          <BadgeTable className="bg-[#EEF2FF] text-black rounded-[8px] w-24 flex items-center justify-center">
            {value ? <p><span className="text-[#0068C8]">€ </span>{value}</p> : <span>-</span>}
          </BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "month3",
    header: () => <TableHeader>{months?.m3 || "Month 3"}</TableHeader>,
    cell: ({ row }) => {
      const value = row?.original?.month3;
      return (
        <TableCell>
          <BadgeTable className="bg-[#EEF2FF] text-black rounded-[8px] w-24 flex items-center justify-center">
            {value ? <p><span className="text-[#0068C8]">€ </span>{value}</p> : <span>-</span>}
          </BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "totals",
    header: () => <TableHeader>Totals</TableHeader>,
    cell: ({ row }) => {
      const value = row?.original?.totals;
      return (
        <TableCell>
          <BadgeTable className="bg-[#EEF2FF] text-black rounded-[8px] w-24 flex items-center justify-center">
            {value ? <p><span className="text-[#0068C8]">€ </span>{value}</p> : <span>-</span>}
          </BadgeTable>
        </TableCell>
      );
    },
  },
];

export default BalanceSheetColumns;
