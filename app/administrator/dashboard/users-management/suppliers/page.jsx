"use client";

import React, { useState, useEffect } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import Link from "next/link";
import suppliersColumns from "./components/suppliersColumns";
import { apiFetch } from "@/lib/api";

const SupplierPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/admin/suppliers?search=${search}`);
      if (response.success) {
        setData(response.data.data || response.data);
      }
    } catch (error) {
      console.error("Failed to fetch suppliers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [search]);

  return (
    <>
      <DashboardHeading label="Suppliers" subtitle="Manage your suppliers here">
        <BackButton variant={"outline"} />
        <Link href={"/administrator/dashboard/users-management/suppliers/add"}>
          <Button>Add Supplier</Button>
        </Link>
      </DashboardHeading>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search suppliers..."
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
        columns={suppliersColumns(fetchSuppliers)} 
        data={data} 
        loading={loading}
      />
    </>
  );
};
export default SupplierPage;
