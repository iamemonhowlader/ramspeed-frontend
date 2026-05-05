"use client";

import React, { useState, useEffect } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import Link from "next/link";
import suppliersColumns from "./components/suppliersColumns";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

const SupplierPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);

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

  const handleDeleteSelected = async () => {
    if (selectedSuppliers.length === 0) {
      toast.error("Please select at least one supplier to delete");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedSuppliers.length} supplier(s)?`)) return;

    try {
      const deletePromises = selectedSuppliers.map(supplierId =>
        apiFetch(`/api/admin/suppliers/delete/${supplierId}`, { method: 'DELETE' })
      );

      const results = await Promise.all(deletePromises);
      const failedCount = results.filter(result => !result.success).length;

      if (failedCount === 0) {
        toast.success(`${selectedSuppliers.length} supplier(s) deleted successfully`);
        setSelectedSuppliers([]);
        fetchSuppliers();
      } else {
        toast.error(`Failed to delete ${failedCount} supplier(s)`);
      }
    } catch (error) {
      console.error("Error deleting suppliers:", error);
      toast.error("Failed to delete suppliers");
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
        <Button 
          variant={"destructive"}
          onClick={handleDeleteSelected}
          disabled={selectedSuppliers.length === 0}
        >
          Delete Selected {selectedSuppliers.length > 0 && `(${selectedSuppliers.length})`}
        </Button>
      </div>

      {/* table container  */}
      <DataTable 
        rowColored 
        columns={suppliersColumns(fetchSuppliers, selectedSuppliers, setSelectedSuppliers)} 
        data={data} 
        loading={loading}
      />
    </>
  );
};
export default SupplierPage;
