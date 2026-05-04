'use client'

import React, { useState } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/Buttons/BackButton";
import { Input } from "@/components/ui/input";
import SelectCustom from "@/components/common/SelectCustom";
import DateRange from "../../components/DateRange";
import OrderStatCardSecondary from "../orders/components/OrderStatCardSecondary";
import { Label } from "@/components/ui/label";
import { expensesStats } from "@/data/expensesStats";
import DataTable from "@/components/common/DataTable/DataTable";
import expensesData from "@/data/expensesData";
import { expensesColumns } from "./components/expensesColumns";
import Link from "next/link";

const showItems = [
  // { value: "all", label: "All" },
  { value: "purchase", label: "Purchase" },
  { value: "car_service", label: "Car Service" },
  { value: "car_fuel", label: "Car Fuel" },
  { value: "building", label: "Building" },
  { value: "service_receipt", label: "Service Receipt" },
  { value: "electricity", label: "Electricity" },
  { value: "internet_phone", label: "Internet & Phone" },
  { value: "water", label: "Water" },
  { value: "bank_fee", label: "Bank Fee" },
  { value: "expenses_services", label: "Expenses Services" },
];


const QUARTERLY = [
  { value: "q1", label: "January, February, March" },
  { value: "q2", label: "April, May, June" },
  { value: "q3", label: "July, August, September" },
  { value: "q4", label: "October, November, December" },
];

const QUARTERS = {
  q1: { from: "01/01/2025", to: "31/03/2025" },
  q2: { from: "01/04/2025", to: "30/06/2025" },
  q3: { from: "01/07/2025", to: "30/09/2025" },
  q4: { from: "01/10/2025", to: "31/12/2025" },
};



const ExpensesPage = () => {
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });


  const handleQuarterChange = (quarterKey) => {
    setDateRange(QUARTERS[quarterKey] || { from: "", to: "" })
  };


  return (
    <>
      <DashboardHeading
        titlePrefix="Add expence information "
        subtitle={"Add your expense information here"}
      >
        <BackButton variant={"outline"} />
        <Link href={"/administrator/dashboard/shop-management/expenses/create"}>
          <Button className={"w-full md:w-auto"}>Create new expense</Button>
        </Link>
      </DashboardHeading>

      {/* sorting form  */}
      <div className="flex flex-col 2xl:flex-row justify-between items-start">
        <div className="grid grid-cols-2 gap-3 max-w-max mb-3">
          <Input placeholder="Write your balance" />
          <Button className="xl:py-6">UPDATE BALANCE</Button>
        </div>

        <div className="flex flex-col 2xl:items-end w-full md:w-auto">
          <div className="grid grid-cols-2 gap-3 w-full md:max-w-max mb-3">
            <SelectCustom
              className={"w-full"}
              placeholder={"Show all"}
              items={showItems}
            />
            <SelectCustom
              className={"w-full"}
              placeholder={"QUARTERLY"}
              items={QUARTERLY}

            />
          </div>

          <div className="flex flex-wrap gap-3">
            <DateRange />
            <Button className="xl:py-6 w-full md:w-auto">Search</Button>
          </div>
        </div>
      </div>

      <div className="mt-15 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Expenses Details */}
        {expensesStats.map((stats, index) => {
          return (
            <div className="space-y-6" key={index}>
              <Label>{stats?.title}</Label>
              <div>
                {stats?.stats?.map((item) => {
                  return (
                    <OrderStatCardSecondary
                      key={item?.label}
                      icon={item?.icon}
                      label={item?.label}
                      amount={item?.amount}
                      color={item?.color}
                      iconBg={item?.iconBg}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* table */}
      <div className="mt-15">
        <DataTable rowColored data={expensesData} columns={expensesColumns} />
      </div>
    </>
  );
};

export default ExpensesPage;
