"use client";

import { useState, useEffect, useCallback } from "react";
import DataTable from "@/components/common/DataTable/DataTable";
import DashboardHeading from "../../components/Common/DashboardHeading";
import RMAHistoryColumns from "./components/RMAHistoryColumns";
import { apiFetch } from "@/lib/api";
import Searchbar from "../../components/Searchbar";
import Pagination from "@/components/common/Pagination";

const RmaHistoryPage = () => {
  const [rmaHistory, setRmaHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const fetchRmaHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/admin/rma-history?page=${currentPage}&s=${search}`);
      if (response.success) {
        setRmaHistory(response.data.data);
        setPagination(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch RMA history:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    fetchRmaHistory();
  }, [fetchRmaHistory]);

  const columns = RMAHistoryColumns.map((col) => ({
    ...col,
    meta: { rmaHistory, setRmaHistory },
  }));

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  return (
    <div>
      <DashboardHeading titlePrefix="RMA" label="history" />

      {/* horizontal line  */}
      <div className="h-3 bg-primary rounded-full mb-8" />

      <div className="mb-6 flex justify-between items-center">
        <div className="w-full max-w-md">
          <Searchbar 
            placeholder="Search by Ticket ID, Customer Name, Phone or Model" 
            onSearch={handleSearch}
          />
        </div>
      </div>

      <DataTable
        markRow={"delivered"}
        markRowColor={"#4ade80"}
        columns={columns}
        data={rmaHistory}
        loading={loading}
      />

      {pagination && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            lastPage={pagination.last_page}
            onPageChange={setCurrentPage}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};
export default RmaHistoryPage;
