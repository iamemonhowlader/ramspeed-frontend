"use client";

import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import notImplemented from "@/lib/notImplemented";
import Image from "next/image";

const TableHeader = ({ children, className }) => {
  return (
    <div
      className={cn(
        "bg-[#F7F8F9] border border-[#E8E8E8]  h-20 flex items-center text-[#0068C8] font-bold justify-center px-1",
        className
      )}
    >
      {children}
    </div>
  );
};

const TableCell = ({ children, className, wrap = false, ...props }) => {
  return (
    <div
      className={cn(
        "border border-[#E8E8E8] h-15 xl:h-20 flex items-center px-1 text-xs ",
        wrap && "break-words whitespace-normal",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const productsColumns = [
  // {
  //   accessorKey: "itemId",
  //   header: () => <TableHeader>N/...</TableHeader>,
  //   cell: ({ row }) => {
  //     const itemId = row.getValue("itemId");
  //     return (
  //       <TableCell className="flex items-center justify-center px-2">
  //         <span className="font-semibold ">{itemId}</span>
  //       </TableCell>
  //     );
  //   },
  // },
  {
    accessorKey: "id",
    header: () => <TableHeader>Item ID</TableHeader>,
    cell: ({ row }) => {
      const id = row.getValue("id");
      return (
        <TableCell className="flex items-center justify-center">
          <span className="font-semibold ">{id}</span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "image",
    header: () => <TableHeader>Image</TableHeader>,
    cell: ({ row }) => {
      const image = row.getValue("image");
      return (
        <TableCell className="flex items-center justify-center p-2 overflow-hidden">
          <div className="w-12 h-12 relative">
            <Image src={image} alt="Product" fill className="object-contain" />
          </div>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <TableHeader>Name</TableHeader>,
    cell: ({ row }) => {
      const name = row.getValue("name");
      return (
        <TableCell wrap={true} className="px-3">
          <span className="font-semibold w-[180px]">
            {name.slice(0, 50)} {name.length >= 50 ? "..." : ""}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "priceDollar",
    header: () => (
      <TableHeader className="text-center">
        Price <br /> $
      </TableHeader>
    ),
    cell: ({ row }) => {
      const price = row.getValue("priceDollar");
      return (
        <TableCell className="flex items-center justify-center">
          <span className="font-semibold ">
            {price.toFixed(2)}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "priceEuro",
    header: () => (
      <TableHeader className="text-center">
        Price <br /> €
      </TableHeader>
    ),
    cell: ({ row }) => {
      const price = row.getValue("priceEuro");
      return (
        <TableCell className="flex items-center justify-center">
          <span className="font-semibold ">
            {price.toFixed(2)}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "sellingPrice",
    header: () => (
      <TableHeader className="text-center">
        Selling price <br /> €
      </TableHeader>
    ),
    cell: ({ row }) => {
      const price = row.getValue("sellingPrice");
      return (
        <TableCell className="flex items-center justify-center">
          <span className="font-semibold ">
            {price.toFixed(2)}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "priceCyprus",
    header: () => (
      <TableHeader className="text-center">
        Price in Cyprus
        <br /> €
      </TableHeader>
    ),
    cell: ({ row }) => {
      const price = row.getValue("priceCyprus");
      return (
        <TableCell className="flex items-center justify-center">
          <span className="font-semibold ">
            {price.toFixed(2)}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "cyProfitTax",
    header: () => (
      <TableHeader className="text-center">
        CY+ PROF/TAX <br /> €
      </TableHeader>
    ),
    cell: ({ row }) => {
      const price = row.getValue("cyProfitTax");
      return (
        <TableCell className="flex items-center justify-center">
          <span className="font-semibold ">
            {price.toFixed(2)}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "wholesalerPrice",
    header: () => (
      <TableHeader className="text-center">
        Wholesaler <br /> €
      </TableHeader>
    ),
    cell: ({ row }) => {
      const price = row.getValue("wholesalerPrice");
      return (
        <TableCell className="flex items-center justify-center">
          <span className="font-semibold ">
            {price.toFixed(2)}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "storeProfitPercent",
    header: () => (
      <TableHeader className="text-center">
        Store <br /> profit (%)
      </TableHeader>
    ),
    cell: ({ row }) => {
      const percent = row.getValue("storeProfitPercent");
      return (
        <TableCell className="flex items-center justify-center ">
          <span className="font-semibold text-[#00D68F] bg-[#CCFCEB] border border-[#00D68F] rounded-[6px] px-2 py-1">
            {percent}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "wholesalerProfitPercent",
    header: () => (
      <TableHeader className="text-center">
        Wholesaler <br /> profit (%)
      </TableHeader>
    ),
    cell: ({ row }) => {
      const percent = row.getValue("wholesalerProfitPercent");
      return (
        <TableCell className="flex items-center justify-center">
          <span className="font-semibold text-[#66DE8F] bg-[#DCFFE6] border border-[#66DE8F] rounded-[6px] px-2 py-1">
            {percent}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "discountPricePercent",
    header: () => (
      <TableHeader className="text-center">
        Discount <br /> price (%)
      </TableHeader>
    ),
    cell: ({ row }) => {
      const percent = row.getValue("discountPricePercent");
      return (
        <TableCell className="flex items-center justify-center">
          <span className="font-semibold text-[#8095FF] bg-[#E4E8FF] border border-[#8095FF] rounded-[6px] px-2 py-1">
            {percent}
          </span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "code",
    header: () => <TableHeader>Code</TableHeader>,
    cell: ({ row }) => {
      const code = row.getValue("code");
      return (
        <TableCell className="px-3">
          <span className="font-semibold ">{code}</span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "supplier",
    header: () => <TableHeader>Supplier</TableHeader>,
    cell: ({ row }) => {
      const supplier = row.getValue("supplier");
      return (
        <TableCell className="px-3">
          <span className="font-semibold ">{supplier}</span>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "offers",
    header: () => <TableHeader>Offers</TableHeader>,
    cell: ({ row }) => {
      const offers = row.getValue("offers");
      return (
        <TableCell className="">
          <p className="bg-[#0068C8] text-white rounded-full px-2 py-1">
            {offers ? "Offers" : ""}
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "newArrival",
    header: () => <TableHeader>New arrival</TableHeader>,
    cell: ({ row }) => {
      const newArrival = row.getValue("newArrival");
      return (
        <TableCell className="">
          <p className="bg-[#FF6B9C] text-white rounded-full px-2 py-1">
            {newArrival ? "New arrival" : ""}
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "flashSale",
    header: () => <TableHeader>Flash Sale</TableHeader>,
    cell: ({ row }) => {
      const flashSale = row.getValue("flashSale");
      return (
        <TableCell className="">
          <p className="bg-[#0068C8] text-white rounded-full px-2 py-1">
            {flashSale ? "Flash sale" : ""}
          </p>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "active",
    header: () => <TableHeader>Active</TableHeader>,
    cell: ({ row }) => {
      const active = row.getValue("active");
      return (
        <TableCell className={"flex items-center justify-center"}>
          <p
            className={`flex items-center justify-center font-semibold ${
              active === true
                ? "text-[#51BA00] border border-[#51BA00] rounded px-4 "
                : "text-red-400 border-red-600 "
            }`}
          >
            {!!active ? <Check /> : <X />}
          </p>
        </TableCell>
      );
    },
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row }) => { 
      return (
        <TableCell className={"space-x-1"}>
          <Link
            href={`/administrator/dashboard/products/edit/${row.original.id}`}
          >
            <button className="bg-[#0068C8] cursor-pointer hover:bg-white hover:text-[#0068C8] transition-ease-in-out border border-[#0068C8] text-white  rounded-md font-semibold px-5 py-2">
              Edit
            </button>
          </Link>

          <button
            className="border hover:bg-red-600 hover:text-white transition-ease-in-out cursor-pointer text-red-600 border-red-600 font-semibold rounded-md px-5 py-2"
            onClick={() => notImplemented()}
          >
            Delete
          </button>
        </TableCell>
      );
    },
  },
];
