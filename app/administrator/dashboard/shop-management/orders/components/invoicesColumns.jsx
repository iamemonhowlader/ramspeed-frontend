"use client";

import { Check, X, FileText, FileDown, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import notImplemented from "@/lib/notImplemented";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

// Reuse your shared components
const TableHeader = ({ children, className }) => (
  <div
    className={cn(
      "bg-[#F7F8F9] border border-[#E8E8E8] h-20  flex items-center text-[#0068C8] font-bold text-base xl:text-xl justify-center px-1 ",
      className
    )}
  >
    {children}
  </div>
);

const TableCell = ({ children, className, wrap = false, ...props }) => (
  <div
    className={cn(
      "border border-[#E8E8E8] h-15 lg:h-20 flex items-center px-3 text-xs text-[#191D23]",
      wrap && "break-words whitespace-normal",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const invoicesColumns = [
  {
    accessorKey: "invoiceNo",
    header: () => <TableHeader>Invoice No</TableHeader>,
    cell: ({ row }) => {
      const invoiceNo = row.getValue("invoiceNo");
      return (
        <TableCell className="px-3 font-semibold ">
          {invoiceNo}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "datetime",
    header: () => <TableHeader>Date / Time</TableHeader>,
    cell: ({ row }) => {
      const date = row.original.date;
      const time = row.original.time;
      return (
        <TableCell className="px-3 font-semibold ">
          <p className="mx-auto">
            {date}/<span className="text-primary">{time}</span>
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "client",
    header: () => <TableHeader>Client</TableHeader>,
    cell: ({ row }) => {
      const client = row.getValue("client");
      return (
        <TableCell wrap className="px-3 font-semibold ">
          <p className="mx-auto">{client}</p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <TableHeader>Price (€)</TableHeader>,
    cell: ({ row }) => {
      const price = row.getValue("price");
      return (
        <TableCell className="flex justify-center">
          <p>
            <span className="text-primary font-bold">€</span>{" "}
            <span className="font-semibold ">
              {price.toFixed(2)}
            </span>
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "discount",
    header: () => <TableHeader>Discount (€)</TableHeader>,
    cell: ({ row }) => {
      const discount = row.getValue("discount");
      return (
        <TableCell className="flex justify-center">
          <p>
            <span className="text-primary font-bold">€</span>{" "}
            <span className="font-semibold "></span>
            <span className="font-semibold ">
              {discount.toFixed(2)}
            </span>
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "additionalDiscount",
    header: () => (
      <TableHeader>
        Additional <br /> Discount (€)
      </TableHeader>
    ),
    cell: ({ row }) => {
      const discount = row.getValue("additionalDiscount");
      return (
        <TableCell className="flex justify-center">
          <p>
            <span className="text-primary font-bold">€</span>{" "}
            <span className="font-semibold "></span>
            <span className="font-semibold ">
              {discount.toFixed(2)}
            </span>
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "vat",
    header: () => (
      <TableHeader>
        VAT <br /> (%)
      </TableHeader>
    ),
    cell: ({ row }) => {
      const vat = row.getValue("vat");
      return (
        <TableCell className="flex flex-col items-center justify-center font-semibold ">
          <p>
            <span className="text-primary font-bold">€</span>{" "}
            <span className="font-semibold "></span>
            <span>{vat.value.toFixed(2)} €</span>
            <span className="text-primary">({vat.percent})</span>
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => <TableHeader>Total (€)</TableHeader>,
    cell: ({ row }) => {
      const total = row.getValue("total");
      return (
        <TableCell className="flex justify-center font-semibold ">
          <p>
            <span className="text-primary font-bold">€</span>{" "}
            <span className="font-semibold "></span>
            {total.toFixed(2)}
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <TableHeader>Status</TableHeader>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      const colorClass =
        status === "Completed"
          ? "bg-[#CCFCEB] text-[#00D68F] border-[#00D68F]"
          : "bg-[#FFE0E0] text-[#E53935] border-[#E53935]";
      return (
        <TableCell className="flex justify-center">
          <span
            className={`font-semibold rounded-[6px] border px-2 py-1 ${colorClass}`}
          >
            {status}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "shipped",
    header: () => <TableHeader>Shipped</TableHeader>,
    cell: ({ row }) => {
      const shipped = row.getValue("shipped");
      return (
        <TableCell className="flex justify-center">
          <span
            className={`font-semibold rounded-full px-3 py-1 ${
              shipped === "Yes"
                ? "text-[#00D68F] bg-[#CCFCEB]"
                : "text-[#FF6B9C] bg-[#FFE0EB]"
            }`}
          >
            {shipped}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "vat0",
    header: () => <TableHeader>VAT 0</TableHeader>,
    cell: ({ row }) => {
      const vat0 = row.getValue("vat0");
      return (
        <TableCell className="flex justify-center">
          <span
            className={`font-semibold rounded-full px-3 py-1 ${
              vat0 === "Yes"
                ? "text-[#00D68F] bg-[#CCFCEB]"
                : "text-[#FF6B9C] bg-[#FFE0EB]"
            }`}
          >
            {vat0}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "cancelled",
    header: () => <TableHeader>Cancelled</TableHeader>,
    cell: ({ row }) => {
      const cancelled = row.getValue("cancelled");
      const orderId = row.original.id;
      
      const handleToggleCancel = async () => {
        try {
          const response = await apiFetch(`/api/admin/orders/toggle-cancel/${orderId}`, {
            method: 'POST'
          });
          
          if (response.success) {
            toast.success(`Order ${cancelled ? 'un-cancelled' : 'cancelled'} successfully`);
            // Refresh the page to show updated data
            window.location.reload();
          } else {
            toast.error(response.message || "Failed to update order status");
          }
        } catch (error) {
          toast.error("Failed to update order status");
        }
      };

      return (
        <TableCell className="flex justify-center">
          <div className="flex items-center gap-2">
            <Checkbox 
              checked={cancelled === true || cancelled === 'yes'}
              disabled={cancelled === true || cancelled === 'yes'}
              onChange={handleToggleCancel}
              className="cursor-pointer"
            />
            <span className="text-xs font-medium">Cancelled</span>
          </div>
        </TableCell>
      );
    },
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row }) => {
      const orderId = row.original.id;
      const { details, invoice, pdf } = row.original.options;
      
      return (
        <TableCell className="space-x-2 flex justify-center">
          {details && (
            <Link
              href={`/administrator/dashboard/shop-management/orders/${orderId}`}
            >
              <button className="bg-[#0068C8] cursor-pointer text-white border border-[#0068C8] hover:bg-white hover:text-[#0068C8] transition rounded-md font-semibold px-3 py-1 flex items-center gap-1">
                <Info size={14} /> Details
              </button>
            </Link>
          )}
          {invoice && (
            <button
              onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/orders/invoice/${orderId}`, '_blank')}
              className="border border-[#8095FF] cursor-pointer text-[#8095FF] hover:bg-[#8095FF] hover:text-white transition rounded-md font-semibold px-3 py-1 flex items-center gap-1"
            >
              <FileText size={14} /> Invoice
            </button>
          )}
          {pdf && (
            <button
              onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/orders/pdf/${orderId}`, '_blank')}
              className="border border-[#FF6B9C] cursor-pointer text-[#FF6B9C] hover:bg-[#FF6B9C] hover:text-white transition rounded-md font-semibold px-3 py-1 flex items-center gap-1"
            >
              <FileDown size={14} /> PDF
            </button>
          )}
        </TableCell>
      );
    },
  },
];
