"use client";

import { cn } from "@/lib/utils";
import notImplemented from "@/lib/notImplemented";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import BadgeTable from "@/components/common/BadgeTable";

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
      "border border-[#E8E8E8] py-4 flex items-center h-8 justify-center px-3 text-xs text-[#191D23]",
      wrap && "break-words whitespace-normal",
      "font-semibold text-[12px] rounded-[8px] m-[1px]",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const BalanceSheetColumns = [
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
    accessorKey: "month",
    header: () => <TableHeader>Month</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("month")}</TableCell>,
  },
  {
    accessorKey: "january",
    header: () => <TableHeader>January</TableHeader>,
    cell: ({ row }) => {
      const value = row?.original?.january;
      return (
        <TableCell>
          <BadgeTable
            className={
              "bg-[#EEF2FF] text-black rounded-[8px] w-20 flex items-center justify-center"
            }
          >
            {value ? (
              <p>
                <span className="text-[#0068C8]">€ </span> {value}
              </p>
            ) : (
              <span>--</span>
            )}
          </BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "february",
    header: () => <TableHeader>February</TableHeader>,
    cell: ({ row }) => {
      const value = row?.original?.february;
      return (
        <TableCell>
          <BadgeTable
            className={
              "bg-[#EEF2FF] text-black rounded-[8px] w-20 flex items-center justify-center"
            }
          >
            {value ? (
              <p>
                <span className="text-[#0068C8]">€ </span> {value}
              </p>
            ) : (
              <span>--</span>
            )}
          </BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "march",
    header: () => <TableHeader>March</TableHeader>,
    cell: ({ row }) => {
      const value = row?.original?.march;
      return (
        <TableCell>
          <BadgeTable
            className={
              "bg-[#EEF2FF] text-black rounded-[8px] w-20 flex items-center justify-center"
            }
          >
            {value ? (
              <p>
                <span className="text-[#0068C8]">€ </span> {value}
              </p>
            ) : (
              <span>--</span>
            )}
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
          <BadgeTable
            className={
              "bg-[#EEF2FF] text-black rounded-[8px] w-20 flex items-center justify-center"
            }
          >
            {value ? (
              <p>
                <span className="text-[#0068C8]">€ </span> {value}
              </p>
            ) : (
              <span>--</span>
            )}
          </BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "extra",
    header: () => <TableHeader>--</TableHeader>,
    cell: ({ row }) => {
      const value = row?.original?.extra;
      return (
        <TableCell>
          <BadgeTable
            className={
              "bg-[#EEF2FF] text-black rounded-[8px] w-20 flex items-center justify-center"
            }
          >
            {value ? (
              <p>
                <span className="text-[#0068C8]">€ </span> {value}
              </p>
            ) : (
              <span>--</span>
            )}
          </BadgeTable>
        </TableCell>
      );
    },
  },
];

export default BalanceSheetColumns;
