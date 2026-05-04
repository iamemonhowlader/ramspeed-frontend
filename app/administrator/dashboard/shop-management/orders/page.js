"use client";

import React, { useState, useEffect, useCallback } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import { Button } from "@/components/ui/button";
import OrderStatCard from "./components/OrderStatCard";
import MoneyHand from "@/components/svg/MoneyHand";
import Bar from "@/components/svg/Bar";
import OrderStatCardSecondary from "./components/OrderStatCardSecondary";
import ExpensesIcon from "@/components/svg/ExpensesIcon";
import { Blocks, Search } from "lucide-react";
import DataTable from "@/components/common/DataTable/DataTable";
import { invoicesColumns } from "./components/invoicesColumns";
import { Input } from "@/components/ui/input";
import DateRange from "../../components/DateRange";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import Pagination from "@/components/common/Pagination";

const OrdersPage = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    totalSales: 0,
    estimatedProfit: 0,
    totalExpenses: 0,
    cyprusStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({ last_page: 1, total: 0 });

  const fetchOrders = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("s", search);
      params.append("page", page);
      
      if (dateRange.from && !dateRange.from.includes("//")) {
        const [d, m, y] = dateRange.from.split("/");
        if (d && m && y) params.append("from", `${y}-${m}-${d}`);
      }
      
      if (dateRange.to && !dateRange.to.includes("//")) {
        const [d, m, y] = dateRange.to.split("/");
        if (d && m && y) params.append("to", `${y}-${m}-${d}`);
      }

      const response = await apiFetch(`/api/admin/orders?${params.toString()}`);
      if (response.success) {
        const transformedData = response.data.data.map((order) => {
          let invoiceNo = "INV-" + order.id;
          if (order.invoice_store) invoiceNo = "Stor. " + String(order.invoice_store.id).padStart(5, '0');
          else if (order.invoice_online) invoiceNo = "Inv. " + String(order.invoice_online.id).padStart(5, '0');
          else if (order.invoice_wire) invoiceNo = "Prof. " + String(order.invoice_wire.id).padStart(5, '0');
          else if (order.invoice_wholesale) invoiceNo = "Wh. " + String(order.invoice_wholesale.id).padStart(5, '0');

          const orderDate = new Date(order.date);
          return {
            id: order.id,
            invoiceNo: invoiceNo,
            date: orderDate.toLocaleDateString("en-GB"),
            time: orderDate.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' }),
            client: order.full_name,
            price: parseFloat(order.subtotal || 0),
            discount: parseFloat(order.total_line_discount || 0),
            additionalDiscount: parseFloat(order.discount || 0),
            vat: {
              value: parseFloat(order.vat || 0),
              percent: order.vat_percentage + "%"
            },
            total: parseFloat(order.grand_total || 0),
            status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
            shipped: order.delivered === "yes" ? "Yes" : "No",
            vat0: order.ZeroVAT === 1 ? "Yes" : "No",
            cancelled: order.cancelled === "yes",
            options: { details: true, invoice: true, pdf: true }
          };
        });
        setData(transformedData);
        setStats(response.stats);
        setPaginationMeta({
          last_page: response.data.last_page,
          total: response.data.total,
        });
      }
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [search, dateRange, currentPage]);

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchOrders(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getExportParams = () => {
    const params = new URLSearchParams();
    if (search) params.append("s", search);
    if (dateRange.from && !dateRange.from.includes("//")) {
      const [d, m, y] = dateRange.from.split("/");
      if (d && m && y) params.append("from", `${y}-${m}-${d}`);
    }
    if (dateRange.to && !dateRange.to.includes("//")) {
      const [d, m, y] = dateRange.to.split("/");
      if (d && m && y) params.append("to", `${y}-${m}-${d}`);
    }
    return params.toString();
  };

  return (
    <>
      <DashboardHeading
        titlePrefix="Orders"
        subtitle={"Customize your order information here"}
      >
        <Button 
          variant={"outline"} 
          onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/orders-export/pdf?${getExportParams()}`, '_blank')}
        >
          Export PDF
        </Button>
        <Button
          onClick={() => window.open(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/admin/orders-export/trial-balance?${getExportParams()}`, '_blank')}
        >
          Trial Balance
        </Button>
      </DashboardHeading>

      {/* orders section  */}
      <div>
        {/* stat container  */}
        <div className="flex flex-col xl:flex-row items-start gap-4 md:gap-7 mb-10 md:mb-20">
          <div className="flex flex-col md:flex-row gap-4 md:gap-7 w-full md:w-auto">
            <OrderStatCard icon={Bar} label={"Total sales"} amount={stats.totalSales} />
            <OrderStatCard
              icon={MoneyHand}
              label={"Estimated profit"}
              amount={stats.estimatedProfit}
            />
          </div>
          <div className="flex-1 w-full xl:w-auto">
            <OrderStatCardSecondary
              icon={ExpensesIcon}
              label={"Total expenses"}
              amount={stats.totalExpenses}
              color="#16DBCC"
              iconBg={"#DCFAF8"}
            />
            <OrderStatCardSecondary
              icon={Blocks}
              label={"Cyprus Stock"}
              amount={stats.cyprusStock}
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                  // range format from component might vary, ensuring it matches backend expectations
                  setDateRange(range);
                }}
              />
            </div>

            <Button
              onClick={handleSearch}
              className="w-full md:w-auto py-0 xl:py-6"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </div>

        {/* Orders Table  */}
        <DataTable rowColored data={data} columns={invoicesColumns} loading={loading} />
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500">
            {!loading && `Showing ${data.length} of ${paginationMeta.total} orders`}
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

export default OrdersPage;
