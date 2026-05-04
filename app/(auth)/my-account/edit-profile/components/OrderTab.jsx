"use client";

import DataTable from "@/components/common/DataTable/DataTable";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const orderColumns = [
  {
    id: "orderId",
    header: () => <p className="text-[#0068C8] font-semibold px-2">ID</p>,
    cell: ({ row }) => {
      return (
        <div className="px-2 font-bold text-gray-700">
          #{row.original.order_id}
        </div>
      );
    },
  },
  {
    accessorKey: "product_name",
    header: () => <p className="text-[#0068C8] font-semibold px-1">PRODUCTS</p>,
    cell: ({ row }) => {
      const { product_image, product_name, skuCode, date } = row.original;
      return (
        <div className="flex items-center gap-2 h-full py-4 px-1">
          <div className="w-[50px] h-[50px] relative bg-gray-50 rounded border">
            <Image 
              src={product_image ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ramspeed-laravel-api.test'}/storage/product_images/${product_image}` : "/controller.png"} 
              alt={product_name} 
              fill
              className="object-contain p-1" 
            />
          </div>
          <div className="flex flex-col max-w-[260px]">
            <h2 className="text-[#191C1F] font-bold text-sm leading-tight">
              {product_name}
            </h2>
            <div className="flex items-center gap-4">
              <p className="text-[#828282] font-semibold text-xs">
                SKU: <span className="text-[#0068C8]">{skuCode}</span>
              </p>
              <p className="text-[#929FA5] font-semibold text-xs">{new Date(date).toLocaleDateString()}</p>
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
      <p className="text-[#6E6E6E] font-bold px-4">€ {parseFloat(row.original.price).toFixed(2)}</p>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => (
      <p className="text-[#0068C8] font-semibold text-center px-1">QTY</p>
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
        € {(row.original.price * row.original.quantity).toFixed(2)}
      </p>
    ),
  },
];

const OrderTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiFetch("/api/frontend/orders");
        if (response.success) {
          // Flatten orders into items for the table
          const flattenedItems = [];
          response.data.forEach(order => {
            order.items.forEach(item => {
              flattenedItems.push({
                order_id: order.id,
                date: order.date,
                product_name: item.temp_name || (item.product ? item.product.name : "Unknown Product"),
                product_image: item.product ? (item.product.product_images?.[0]?.filename || item.product.productImages?.[0]?.filename || null) : null,
                skuCode: item.product ? item.product.code : (item.skuCode || "N/A"),
                price: item.price,
                quantity: item.quantity,
              });
            });
          });
          setOrders(flattenedItems);
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-500">Loading your orders...</div>;

  return (
    <div className="p-6 overflow-x-auto">
      {orders.length > 0 ? (
        <DataTable columns={orderColumns} data={orders} />
      ) : (
        <div className="text-center py-20 text-gray-500">
          You haven't placed any orders yet.
        </div>
      )}
    </div>
  );
};

export default OrderTab;
