"use client";

import { cn } from "@/lib/utils";
import BadgeTable from "@/components/common/BadgeTable";
import { Button } from "@/components/ui/button";
import notImplemented from "@/lib/notImplemented";
import { formatDate } from "@/utils/formatDate";

// Table UI helpers
const TableHeader = ({ children, className }) => (
  <div
    className={cn(
      "bg-[#F7F8F9] border border-[#E8E8E8] h-20 flex items-center text-[#0068C8] font-bold text-base xl:text-xl justify-center px-1",
      className
    )}
  >
    {children}
  </div>
);

const TableCell = ({ children, className, wrap = false, ...props }) => (
  <div
    className={cn(
      "border border-[#E8E8E8] h-15 lg:h-20 flex items-center justify-center px-3 text-xs text-[#191D23]",
      wrap && "break-words whitespace-normal",
      "font-semibold text-[12px]",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const receiptsColumn = [
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
    accessorKey: "amount",
    header: () => <TableHeader>Amount</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <span className="text-primary">&euro;</span>{" "}
        {Number(row.getValue("amount")).toFixed(2)}
      </TableCell>
    ),
  },
  {
    accessorKey: "date",
    header: () => <TableHeader>Date</TableHeader>,
    cell: ({ row }) => {
      const dateString = row.original.date;
      const date = formatDate(dateString);
      return <TableCell className={"text-primary"}>{date}</TableCell>;
    },
  },
  {
    id: "actions",
    header: () => <TableHeader>Receipt print</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <Button 
          onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/receipts/${row.original.id}/print`, '_blank')} 
          className={"rounded-full"}
        >
          Print receipt
        </Button>
      </TableCell>
    ),
  },
];

export default receiptsColumn;
