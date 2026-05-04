"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import BadgeTable from "@/components/common/BadgeTable";
import { id } from "zod/v4/locales";
import { Button } from "@/components/ui/button";
import notImplemented from "@/lib/notImplemented";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

// Reuse your shared components
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
      "border border-[#E8E8E8] h-15 lg:h-20 flex items-center justify-center px-3 text-[#191D23]",
      wrap && "break-words whitespace-normal ",
      "font-semibold text-[16px] px-[2px]",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const expensesColumns = [
  {
    accessorKey: "serial",
    header: () => <TableHeader>Serial</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("serial")}</TableCell>,
  },
  {
    accessorKey: "supplierName",
    header: () => <TableHeader>Supplier Name</TableHeader>,
    cell: ({ row }) => (
      <TableCell wrap>{row.getValue("supplierName")}</TableCell>
    ),
  },
  {
    accessorKey: "code",
    header: () => <TableHeader>Code</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("code")}</TableCell>,
  },
  {
    accessorKey: "invoiceNumber",
    header: () => <TableHeader>Invoice Number</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("invoiceNumber")}</TableCell>,
  },
  {
    accessorKey: "checkNumber",
    header: () => <TableHeader>Check Number</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("checkNumber")}</TableCell>,
  },
  {
    accessorKey: "datePaid",
    header: () => <TableHeader>Date Paid</TableHeader>,
    cell: ({ row }) => {
      const dateString = row.original.datePaid;
      const datePaid = formatDate(dateString);
      return (
        <TableCell>
          <BadgeTable className={"bg-[#FFBB38]"}>{datePaid}</BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "expireDate",
    header: () => <TableHeader>Expire Date</TableHeader>,
    cell: ({ row }) => {
      const dateString = row.original.expireDate;
      const expireDate = formatDate(dateString);
      return (
        <TableCell>
          <BadgeTable>{expireDate}</BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "gross",
    header: () => <TableHeader>Gross</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("gross")}</TableCell>,
  },
  {
    accessorKey: "vat",
    header: () => <TableHeader>Vat</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <BadgeTable>{row.getValue("vat")}</BadgeTable>
      </TableCell>
    ),
  },
  {
    accessorKey: "calculatedVat",
    header: () => <TableHeader>Calculated VAT</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("calculatedVat")}</TableCell>,
  },
  {
    accessorKey: "calculatedNet",
    header: () => <TableHeader>Calculated Net</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("calculatedNet")}</TableCell>,
  },
  {
    accessorKey: "expenseType",
    header: () => <TableHeader>Expense Type</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <BadgeTable className={"bg-[#FF6B9C]"}>
          {row.getValue("expenseType")}
        </BadgeTable>
      </TableCell>
    ),
  },
  {
    accessorKey: "cancelled",
    header: () => <TableHeader>Cancelled</TableHeader>,
    cell: ({ row }) => {
      const cancelled = row.getValue("cancelled");
      return (
        <TableCell className="flex justify-center">
          {cancelled ? (
            <Check className="text-[#51BA00]" size={18} />
          ) : (
            <X className="text-red-500" size={18} />
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
        <TableCell className="flex justify-center gap-2">
          <Link
            href={`/administrator/dashboard/shop-management/expenses/edit/${row.original.serial}`}
          >
            <Button variant={"outline"} className={"font-medium"}>
              Edit
            </Button>
          </Link>
          <Button
            variant={"outline"}
            onClick={() => notImplemented()}
            className={
              "border-red-600 text-red-600 font-medium hover:bg-red-600"
            }
          >
            delete
          </Button>
        </TableCell>
      );
    },
  },
];
