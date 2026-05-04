"use client";

import React, { useState, useEffect } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import B2BCustomerColumns from "./components/B2BCustomerColumns";
import { apiFetch } from "@/lib/api";

const B2BCustomer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchB2B = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/admin/members?type=wholesaler&search=${search}`);
      if (response.success) {
        setData(response.data.data || response.data);
      }
    } catch (error) {
      console.error("Failed to fetch B2B customers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchB2B();
  }, [search]);

  return (
    <>
      <DashboardHeading
        titlePrefix="B2B Customer"
        label="Activation"
        subtitle="Manage your B2B Customer here"
      >
        <BackButton />
      </DashboardHeading>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search B2B customers..."
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant={"destructive"}>Delete Selected</Button>
      </div>

      {/* table container  */}
      <DataTable 
        rowColored 
        columns={B2BCustomerColumns(fetchB2B)} 
        data={data} 
        loading={loading}
      />
    </>
  );
};
export default B2BCustomer;
