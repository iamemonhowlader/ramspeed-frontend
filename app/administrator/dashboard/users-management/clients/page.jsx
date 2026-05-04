"use client";

import React, { useState, useEffect } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import DataTable from "@/components/common/DataTable/DataTable";
import clientsColumn from "./components/clientsColumn";
import { apiFetch } from "@/lib/api";

const ClientsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/admin/members?type=client&search=${search}`);
      if (response.success) {
        setData(response.data.data || response.data);
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, [search]);

  return (
    <>
      <DashboardHeading
        label="your clients "
        subtitle="Manage your clients here"
      >
        <BackButton />
      </DashboardHeading>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* table container  */}
      <DataTable 
        rowColored 
        columns={clientsColumn(fetchClients)} 
        data={data} 
        loading={loading}
      />
    </>
  );
};

export default ClientsPage;
