"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardHeading from "../../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import orderDetailsColumn from "./components/orderDetailsColumn";
import memberDetailColumn from "./components/memberDetailColumn";
import shippingDetailColumn from "./components/shippingDetailColumn";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await apiFetch(`/api/admin/orders/${id}`);
        if (response.success) {
          setData(response.data);
        }
      } catch (error) {
        toast.error("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading) return <div className="p-20 text-center text-gray-500 font-semibold">Loading order details...</div>;
  if (!data) return <div className="p-20 text-center text-red-500 font-semibold">Order not found</div>;

  const orderItems = data.order_items.map(item => ({
    item: item.product ? item.product.name : item.temp_name,
    quantity: item.quantity,
    unitPrice: parseFloat(item.price).toFixed(2),
    linePrice: (item.quantity * item.price).toFixed(2),
  }));

  // Add summary rows
  orderItems.push({ item: "Subtotal", isSummary: true, linePrice: parseFloat(data.subtotal).toFixed(2) });
  orderItems.push({ item: "Discount", isSummary: true, linePrice: parseFloat(data.total_line_discount + (data.discount || 0)).toFixed(2) });
  orderItems.push({ item: "VAT (" + data.vat_percentage + "%)", isSummary: true, linePrice: parseFloat(data.vat).toFixed(2) });
  orderItems.push({ item: "Grand Total", isSummary: true, linePrice: parseFloat(data.grand_total).toFixed(2) });

  const memberDetailArray = [
    { key: "Full Name", value: data.full_name },
    { key: "Email", value: data.email },
    { key: "Phone", value: data.phone },
    { key: "Country", value: data.country },
    { key: "City", value: data.city },
    { key: "Address", value: data.address },
    { key: "Post Code", value: data.post_code },
  ];

  const shippingDetailArray = [
    { key: "Type", value: data.shipping_type },
    { key: "Cost", value: "€ " + parseFloat(data.shipping_cost || 0).toFixed(2) },
    { key: "AKIS Branch", value: data.akis_branch || "N/A" },
    { key: "Boxnow Locker", value: data.boxnow_locker_name || "N/A" },
  ];

  return (
    <div className="container max-w-[1332px] mx-auto bg-white p-4 lg:p-12 shadow-[0_20px_40px_-4px_rgba(145,158,171,0.16)] rounded-xl">
      <DashboardHeading
        titlePrefix={`Order Details #${data.id}`}
        subtitle={`Viewing details for order placed on ${new Date(data.date).toLocaleDateString()}`}
      />
      <div className=" space-y-8 md:space-y-12">
        <div className="h-3 bg-primary rounded-full" />

        <DataTable columns={orderDetailsColumn} data={orderItems} />

        <div className="flex flex-col lg:flex-row gap-8 md:gap-14 ">
          <div className="flex-1">
            <div className="bg-[#F7F8F9] border border-[#E8E8E8] py-3 flex items-center text-[#0068C8] font-bold text-base xl:text-xl justify-center px-1 m-[1px]">
              Member details
            </div>
            <DataTable columns={memberDetailColumn} data={memberDetailArray} />
          </div>

          <div className="flex-1">
            <div className="bg-[#F7F8F9] border border-[#E8E8E8] py-3 flex items-center text-[#0068C8] font-bold text-base xl:text-xl justify-center px-1 m-[1px]">
              Shipping details
            </div>
            <DataTable
              columns={shippingDetailColumn}
              data={shippingDetailArray}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
