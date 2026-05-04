'use client'

import React, { useState, useEffect, useCallback } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/Buttons/BackButton";
import { Input } from "@/components/ui/input";
import SelectCustom from "@/components/common/SelectCustom";
import DateRange from "../../components/DateRange";
import OrderStatCardSecondary from "../orders/components/OrderStatCardSecondary";
import { Label } from "@/components/ui/label";
import DataTable from "@/components/common/DataTable/DataTable";
import { expensesColumns } from "./components/expensesColumns";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import Bar from "@/components/svg/Bar";
import MoneyHand from "@/components/svg/MoneyHand";
import ExpensesIcon from "@/components/svg/ExpensesIcon";
import { Blocks } from "lucide-react";
import Pagination from "@/components/common/Pagination";

const showItems = [
  { value: "all", label: "Show all" },
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
  const [data, setData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({ last_page: 1, total: 0 });

  const fetchExpenses = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("s", search);
      if (type && type !== "all") params.append("type", type);
      params.append("page", page);
      
      if (dateRange.from && !dateRange.from.includes("//")) {
        const [d, m, y] = dateRange.from.split("/");
        if (d && m && y) params.append("from", `${y}-${m}-${d}`);
      }
      if (dateRange.to && !dateRange.to.includes("//")) {
        const [d, m, y] = dateRange.to.split("/");
        if (d && m && y) params.append("to", `${y}-${m}-${d}`);
      }

      const response = await apiFetch(`/api/admin/expenses?${params.toString()}`);
      if (response.success) {
        const transformedData = response.data.data.map(exp => ({
          serial: exp.id,
          supplierName: exp.supplier ? exp.supplier.full_name : "N/A",
          code: exp.Company_reg_num,
          invoiceNumber: exp.invoice,
          checkNumber: exp.other,
          datePaid: exp.date,
          expireDate: exp.Exp_Date,
          gross: parseFloat(exp.GROSS).toFixed(2),
          vat: (parseFloat(exp.VAT) * 100).toFixed(0) + "%",
          calculatedVat: parseFloat(exp.Calculated_VAT).toFixed(2),
          calculatedNet: parseFloat(exp.Calculated_NET).toFixed(2),
          expenseType: exp.type,
          cancelled: exp.cancelled === 1
        }));
        setData(transformedData);
        setStats(response.stats);
        setPaginationMeta({
          last_page: response.data.last_page,
          total: response.data.total,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch expenses");
    } finally {
      setLoading(false);
    }
  }, [search, type, dateRange, currentPage]);

  useEffect(() => {
    fetchExpenses(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchExpenses(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleQuarterChange = (quarterKey) => {
    setDateRange(QUARTERS[quarterKey] || { from: "", to: "" });
  };

  const statItems = stats ? [
    {
      title: "Expenses details",
      stats: [
        { label: "Total gross", amount: stats.total_gross, icon: Bar, color: "#16DBCC", iconBg: "#DCFAF8" },
        { label: "VAT 19%", amount: stats.vat_19, icon: MoneyHand, color: "#FF82AC", iconBg: "#FFE0EB" },
      ]
    },
    {
      title: "VAT categories",
      stats: [
        { label: "VAT 9%", amount: stats.vat_9, icon: ExpensesIcon, color: "#16DBCC", iconBg: "#DCFAF8" },
        { label: "VAT 5%", amount: stats.vat_5, icon: Blocks, color: "#FF82AC", iconBg: "#FFE0EB" },
      ]
    }
  ] : [];

  return (
    <>
      <DashboardHeading
        titlePrefix="Expense information "
        subtitle={"Manage your business expenses here"}
      >
        <BackButton variant={"outline"} />
        <Link href={"/administrator/dashboard/shop-management/expenses/create"}>
          <Button className={"w-full md:w-auto"}>Create new expense</Button>
        </Link>
      </DashboardHeading>

      {/* sorting form  */}
      <div className="flex flex-col 2xl:flex-row justify-between items-start">
        <div className="grid grid-cols-2 gap-3 w-full md:max-w-max mb-3">
          <Input 
            placeholder="Search by invoice or supplier" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={handleSearch} className="xl:py-6">SEARCH</Button>
        </div>

        <div className="flex flex-col 2xl:items-end w-full md:w-auto">
          <div className="grid grid-cols-2 gap-3 w-full md:max-w-max mb-3">
            <SelectCustom
              className={"w-full"}
              placeholder={"Show all"}
              items={showItems}
              value={type}
              onChange={(val) => setType(val)}
            />
            <SelectCustom
              className={"w-full"}
              placeholder={"QUARTERLY"}
              items={QUARTERLY}
              onChange={handleQuarterChange}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <DateRange onChange={setDateRange} start={dateRange.from} end={dateRange.to} />
            <Button onClick={handleSearch} className="xl:py-6 w-full md:w-auto" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-15 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {statItems.map((group, index) => (
          <div className="space-y-6" key={index}>
            <Label>{group.title}</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.stats.map((item) => (
                <OrderStatCardSecondary
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  amount={item.amount}
                  color={item.color}
                  iconBg={item.iconBg}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* table */}
      <div className="mt-15 overflow-x-auto">
        <DataTable rowColored data={data} columns={expensesColumns} loading={loading} />
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            {!loading && `Showing ${data.length} of ${paginationMeta.total} expenses`}
          </p>
          <Pagination
            currentPage={currentPage}
            lastPage={paginationMeta.last_page}
            onPageChange={handlePageChange}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default ExpensesPage;
