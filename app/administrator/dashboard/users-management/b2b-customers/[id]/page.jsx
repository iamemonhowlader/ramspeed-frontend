"use client";

import React, { useState } from "react";
import DashboardHeading from "../../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import { b2bCustomers } from "@/data/b2bCustomerData";
import B2BCustomerDetailsColumns from "./components/B2BCustomerDetailsColumns";
import { Checkbox } from "@/components/ui/checkbox";

const B2BCustomersDetails = () => {
  const B2BCustomerArray = Object.entries(b2bCustomers[0]).map(
    ([key, value]) => ({
      key,
      value,
    })
  );

  const [customerDetail, setCustomerDetail] = useState(
    B2BCustomerArray.filter((item) => item.key != "wholeSalePrice")
  );

  const handleCheckChange = (checked) => {
    if (checked) {
      setCustomerDetail(
        B2BCustomerArray.filter((item) => item.key != "normalPrice")
      );
    } else {
      setCustomerDetail(
        B2BCustomerArray.filter((item) => item.key != "wholeSalePrice")
      );
    }
  };

  return (
    <div className="container max-w-[1332px] mx-auto bg-white p-4 lg:p-12 shadow-[0_20px_40px_-4px_rgba(145,158,171,0.16)] rounded-xl">
      <DashboardHeading
        titlePrefix="B2B Customer details"
        subtitle="See order details here"
      />
      <div className=" space-y-8 md:space-y-12">
        {/* horizontal line  */}
        <div className="h-3 bg-primary rounded-full" />

        <DataTable columns={B2BCustomerDetailsColumns} data={customerDetail} />

        {/* wholesale price checkbox  */}
        <div className="flex items-center gap-4 text-lg font-bold">
          <Checkbox id="wholeSaleToggle" onCheckedChange={handleCheckChange} />
          <p>Show whole saleprice</p>
        </div>
      </div>
    </div>
  );
};
export default B2BCustomersDetails;
