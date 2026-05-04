"use client";

import React, { useState, useEffect, useCallback } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import receiptsColumn from "./components/receiptsColumn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Pagination from "@/components/common/Pagination";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import { Search } from "lucide-react";
import Link from "next/link";

const ReceiptsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({ last_page: 1, total: 0 });

  const fetchReceipts = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("s", search);
      params.append("page", page);

      const response = await apiFetch(`/api/admin/receipts?${params.toString()}`);
      if (response.success) {
        // Map the data to match the expected format in receiptsColumn
        const transformedData = response.data.data.map(item => ({
          id: item.id,
          fullName: item.name,
          amount: parseFloat(item.amount),
          date: item.date,
          original: item, // Keep original data for actions if needed
        }));

        setData(transformedData);
        setPaginationMeta({ last_page: response.data.last_page, total: response.data.total });
      }
    } catch (error) {
      toast.error("Failed to load receipts data");
    } finally {
      setLoading(false);
    }
  }, [search, currentPage]);

  useEffect(() => {
    fetchReceipts(currentPage);
  }, [currentPage]);

  const handleSearch = () => { setCurrentPage(1); fetchReceipts(1); };
  const handlePageChange = (page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return (
    <>
      <DashboardHeading
        titlePrefix="Receipts"
        subtitle="Manage your receipts here"
      >
        <Link href={"/administrator/dashboard/shop-management/receipts/create"}>
          <Button className={"w-full md:w-auto"}>Create new receipt</Button>
        </Link>
      </DashboardHeading>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search by name or ID"
            className="w-full px-10 text-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" size={15} />
        </div>
        <Button onClick={handleSearch} disabled={loading} className="w-full md:w-auto">
          {loading ? "Loading..." : "Search"}
        </Button>
      </div>

      {/* Table */}
      <DataTable columns={receiptsColumn} data={data} loading={loading} />

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-gray-500">
          {!loading && `Showing ${data.length} of ${paginationMeta.total} receipts`}
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

export default ReceiptsPage;
