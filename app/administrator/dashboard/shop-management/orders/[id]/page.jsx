import React from "react";
import DashboardHeading from "../../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import { memberDetail, orderDetail, shippingDetail } from "@/data/orderDetail";
import orderDetailsColumn from "./components/orderDetailsColumn";
import memberDetailColumn from "./components/memberDetailColumn";
import shippingDetailColumn from "./components/shippingDetailColumn";

const OrderDetails = () => {
  const memberDetailArray = Object.entries(memberDetail).map(
    ([key, value]) => ({
      key,
      value,
    })
  );

  const shippingDetailArray = Object.entries(shippingDetail).map(
    ([key, value]) => ({
      key,
      value,
    })
  );

  return (
    <div className="container max-w-[1332px] mx-auto bg-white p-4 lg:p-12 shadow-[0_20px_40px_-4px_rgba(145,158,171,0.16)] rounded-xl">
      <DashboardHeading
        titlePrefix="See order details "
        subtitle="See order details here"
      />
      <div className=" space-y-8 md:space-y-12">
        {/* horizontal line  */}
        <div className="h-3 bg-primary rounded-full" />

        {/* DataTable for order detail*/}
        <DataTable columns={orderDetailsColumn} data={orderDetail} />



        <div className="flex flex-col lg:flex-row gap-8 md:gap-14 ">
          {/* member detail  */}
          <div className="flex-1">
            <div className="bg-[#F7F8F9] border border-[#E8E8E8] py-3 flex items-center text-[#0068C8] font-bold text-base xl:text-xl justify-center px-1 m-[1px]">
              Member details
            </div>
            <DataTable columns={memberDetailColumn} data={memberDetailArray} />
          </div>

          {/* shipping detail */}
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
