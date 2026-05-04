"use client";

import React, { useState } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import { Button } from "@/components/ui/button";
import OrderStatCard from "./components/OrderStatCard";
import MoneyHand from "@/components/svg/MoneyHand";
import Bar from "@/components/svg/Bar";
import OrderStatCardSecondary from "./components/OrderStatCardSecondary";
import ExpensesIcon from "@/components/svg/ExpensesIcon";
import { Blocks, Search } from "lucide-react";
import DataTable from "@/components/common/DataTable/DataTable";
import { invoices } from "@/data/invoices";
import { invoicesColumns } from "./components/invoicesColumns";
import { Input } from "@/components/ui/input";
import DateRange from "../../components/DateRange";
import notImplemented from "@/lib/notImplemented";

const OrdersPage = () => {
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  return (
    <>
      <DashboardHeading
        titlePrefix="Orders"
        subtitle={"Customize your order information here"}
      >
        <Button variant={"outline"}>Export PDF</Button>
        <Button>Trial Balance</Button>
      </DashboardHeading>

      {/* orders section  */}
      <div>
        {/* stat container  */}
        <div className="flex flex-col xl:flex-row items-start gap-4 md:gap-7 mb-10 md:mb-20">
          <div className="flex flex-col md:flex-row gap-4 md:gap-7 w-full md:w-auto">
            <OrderStatCard icon={Bar} label={"Total sales"} amount={300.45} />
            <OrderStatCard
              icon={MoneyHand}
              label={"Estimated profit"}
              amount={300.45}
            />
          </div>
          <div className="flex-1 w-full xl:w-auto">
            <OrderStatCardSecondary
              icon={ExpensesIcon}
              label={"Total expenses"}
              amount={300.45}
              color="#16DBCC"
              iconBg={"#DCFAF8"}
            />
            <OrderStatCardSecondary
              icon={Blocks}
              label={"Cyprus Stock"}
              amount={300.45}
              color="#FF82AC"
              iconBg={"#FFE0EB"}
            />
          </div>
        </div>

        {/* search options  */}
        <div className="mb-10 flex flex-col lg:flex-row gap-3 lg:gap-6">
          {/* search  */}
          <div className="relative w-full">
            <Input
              placeholder="Search by customer name or invoice number"
              className={"w-full px-10 xl:px-10 py-0 text-xs "}
            />
            <Search
              className="absolute top-1 xl:top-2 translate-y-1/2 translate-x-4"
              color="#64748B"
              size={15}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-3 justify-between lg:justify-start">
            <div className="max-w-max ">
              <DateRange
                onChange={(range) => {
                  setDateRange(range);
                  console.log("Date range:", range);
                  // Output: { from: "15/06/2023", to: "25/12/2024" }
                }}
              />
            </div>

            <Button
              onClick={() => notImplemented()}
              className="w-full md:w-auto py-0 xl:py-6"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Orders Table  */}
        <DataTable rowColored data={invoices} columns={invoicesColumns} />
      </div>
    </>
  );
};

export default OrdersPage;
