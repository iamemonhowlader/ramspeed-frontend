"use client";

import { cn } from "@/lib/utils";
import BadgeTable from "@/components/common/BadgeTable";


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

export const stocksColumn = [
  {
    accessorKey: "serialNumber",
    header: () => <TableHeader>Serial number</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("serialNumber")}</TableCell>,
  },
  {
    accessorKey: "productCode",
    header: () => <TableHeader>Product code</TableHeader>,
    cell: ({ row }) => (
      <TableCell >{row.getValue("productCode")}</TableCell>
    ),
  },
  {
    accessorKey: "supplier",
    header: () => <TableHeader>Supplier</TableHeader>,
    cell: ({ row }) => <TableCell >{row.getValue("supplier")}</TableCell>,
  },
  {
    accessorKey: "productName",
    header: () => <TableHeader>Product name</TableHeader>,
    cell: ({ row }) => (
      <TableCell >{row.getValue("productName")}</TableCell>
    ),
  },
  {
    accessorKey: "active",
    header: () => <TableHeader>Active</TableHeader>,
    cell: ({ row }) => {
      const active = row.getValue("active");
      return (
        <TableCell>
          {active ? (
            <BadgeTable className="bg-[#0068C8] text-white px-4">
              Yes
            </BadgeTable>
          ) : (
            <BadgeTable className="bg-[#FF6B6B] text-white px-4">No</BadgeTable>
          )}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "country",
    header: () => <TableHeader>Country</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-primary"}>
        {row.getValue("country")}
      </TableCell>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <TableHeader>Quantity</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <BadgeTable className="bg-[#EEF2FF] text-primary rounded px-4">
          {row.getValue("quantity")}
        </BadgeTable>
      </TableCell>
    ),
  },
  {
    accessorKey: "price",
    header: () => <TableHeader>Price</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <span className="text-primary">&euro;</span>{" "}
        {Number(row.getValue("price")).toFixed(2)}
      </TableCell>
    ),
  },
  {
    accessorKey: "total",
    header: () => <TableHeader>Total</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <span className="text-primary">&euro;</span>{" "}
        {Number(row.getValue("total")).toFixed(2)}
      </TableCell>
    ),
  },
  {
    accessorKey: "sales",
    header: () => <TableHeader>Sales</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <BadgeTable className="bg-[#EEF2FF] text-primary rounded px-4">
          {row.getValue("sales")}
        </BadgeTable>
      </TableCell>
    ),
  },
];

export default stocksColumn;
