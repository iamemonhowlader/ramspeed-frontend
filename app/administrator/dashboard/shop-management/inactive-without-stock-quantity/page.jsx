"use client";

import React, { useState, useEffect, useCallback } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import stocksColumn from "../../components/Common/TableColumns/stocksColumn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectCustom from "@/components/common/SelectCustom";
import Pagination from "@/components/common/Pagination";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import { Search } from "lucide-react";

const countryOptions = [
  { value: "all", label: "All countries" },
  { value: "cyprus", label: "Cyprus" },
  { value: "china", label: "China" },
];

const InactiveWithoutStockPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({ last_page: 1, total: 0 });

  const fetchStock = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("active", "no_qty"); // inactive AND quantity=0
      if (search) params.append("s", search);
      if (country && country !== "all") params.append("country", country);
      params.append("page", page);

      const response = await apiFetch(`/api/admin/stock?${params.toString()}`);
      if (response.success) {
        setData(response.data.data);
        setPaginationMeta({ last_page: response.data.last_page, total: response.data.total });
      }
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [search, country, currentPage]);

  useEffect(() => {
    fetchStock(currentPage);
  }, [currentPage]);

  const handleSearch = () => { setCurrentPage(1); fetchStock(1); };
  const handlePageChange = (page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      <DashboardHeading
        titlePrefix="Inactive stocks without quantity"
        subtitle="Manage inactive stock products without quantity here"
      />

      {/* Info banner */}
      <div className="bg-[#FFF0F0] border border-[#FF6B6B] rounded-xl px-5 py-4 mb-6 text-sm text-[#8B0000] font-medium">
        🚫 These products are <strong>marked inactive</strong> and have <strong>zero stock quantity</strong> in Cyprus.
        They are currently not visible in the store.
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Input
            placeholder="Search by product name, code or supplier"
            className="w-full px-10 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={15} />
        </div>
        <SelectCustom
          placeholder="All countries"
          items={countryOptions}
          value={country}
          onChange={(val) => setCountry(val)}
          className="w-full md:w-48"
        />
        <Button onClick={handleSearch} disabled={loading} className="w-full md:w-auto">
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>

      <DataTable columns={stocksColumn} data={data} loading={loading} />

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          {!loading && `Showing ${data.length} of ${paginationMeta.total} products`}
        </p>
        <Pagination
          currentPage={currentPage}
          lastPage={paginationMeta.last_page}
          onPageChange={handlePageChange}
          loading={loading}
        />
      </div>
    </>
  );
};

export default InactiveWithoutStockPage;
