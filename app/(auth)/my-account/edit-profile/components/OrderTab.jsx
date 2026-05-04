"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { profileOrders } from "@/data/profileOrders";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

const orderColumns = [
  {
    id: "orderId",
    cell: () => {
      return (
        <div className="px-2">
          <PlusCircle
            size={12}
            className="rotate-45 text-[#929FA5] hover:text-red-600 cursor-pointer transition-colors duration-300 ease-in-out"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "product.name",
    header: () => <p className="text-[#0068C8] font-semibold px-1">PRODUCTS</p>,
    cell: ({ row }) => {
      const { image, name, skuCode, date } = row.original.product;
      return (
        <div className="flex items-center gap-2 h-full py-7 px-1">
          <div className="w-[50px]">
            <Image src={image} alt={name} width={50} height={50} className="" />
          </div>
          <div className="flex flex-col max-w-[260px]">
            <h2 className="text-[#191C1F] font-bold break-words whitespace-normal leading-tight-">
              {name}
            </h2>
            <div className="flex items-center justify-between">
              <p className="text-[#828282] font-semibold text-xs">
                SKU code: <span className="text-[#0068C8]">{skuCode}</span>
              </p>
              <p className="text-[#929FA5] font-semibold text-xs">{date}</p>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <p className="text-[#0068C8] font-semibold px-4">PRICE</p>,
    cell: ({ row }) => (
      <p className="text-[#6E6E6E] font-bold px-4">€ {row.original.price}</p>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => (
      <p className="text-[#0068C8] font-semibold text-center px-1">QUANTITY</p>
    ),
    cell: ({ row }) => (
      <p className="text-[#6E6E6E] font-bold text-center px-1">
        {row.original.quantity}
      </p>
    ),
  },
  {
    accessorKey: "subTotal",
    header: () => (
      <p className="text-[#0068C8] font-semibold text-center px-4">SUB-TOTAL</p>
    ),
    cell: ({ row }) => (
      <p className="text-[#191C1F] font-semibold text-center px-4">
        ${row.original.subTotal}
      </p>
    ),
  },
];

const OrderTab = () => {
  return (
    <div className="p-6">
      <DataTable columns={orderColumns} data={profileOrders} />
    </div>
  );
};

export default OrderTab;
