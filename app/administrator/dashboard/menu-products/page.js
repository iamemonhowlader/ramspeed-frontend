"use client";

import React, { useEffect, useState, useMemo } from "react";
import DashboardHeading from "../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import { menuProductsColumns } from "./components/menuProductsColumns";
import BackButton from "@/components/common/Buttons/BackButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

const ManageMenuProducts = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryId = searchParams.get("Category");
  const supplierId = searchParams.get("Supplier");
  const searchQuery = searchParams.get("s");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await apiFetch("/api/admin/menu");
        if (response.success) {
          const mappedData = (response.data || []).map(cat => ({
            ...cat,
            active: cat.active_page === 'yes'
          }));
          setProducts(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <>
      <DashboardHeading
        label={"menu products"}
        subtitle={"Manage your menu products here"}
      >
        <BackButton variant={"outline"} />
        <Link href="/administrator/dashboard/menu-products/add">
          <Button className={"w-full"}>Add Menu Item</Button>
        </Link>
      </DashboardHeading>

      {loading ? (
        <div className="p-20 text-center text-gray-500">Loading products...</div>
      ) : (
        <DataTable columns={menuProductsColumns} data={products} />
      )}
    </>
  );
};

export default ManageMenuProducts;
