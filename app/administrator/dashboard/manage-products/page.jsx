"use client";

import React, { useEffect, useState } from "react";
import DashboardHeading from "../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import { productsColumns } from "./components/productsColumns";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

const ManageProduct = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryId = searchParams.get("Category");
  const supplierId = searchParams.get("Supplier");
  const searchQuery = searchParams.get("s");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (categoryId) params.append("Category", categoryId);
        if (supplierId) params.append("Supplier", supplierId);
        if (searchQuery) params.append("s", searchQuery);

        const response = await apiFetch(`/api/admin/products?${params.toString()}`);
        if (response.success) {
          const mappedData = (response.data.data || []).map(p => ({
            ...p,
            image: p.product_images?.[0]?.filename 
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/storage/product_images/${p.product_images[0].filename}`
              : null,
            priceDollar: parseFloat(p.price || 0),
            priceEuro: parseFloat(p.calculated_price_euro || 0),
            sellingPrice: parseFloat(p.calculated_selling_price_euro || 0),
            priceCyprus: parseFloat(p.calculated_price_cyprus_euro || 0),
            cyProfitTax: parseFloat(p.calculated_cy_profit_tax_euro || 0),
            wholesalerPrice: parseFloat(p.price_sup_cy || 0), // Use price_sup_cy for wholesaler
            storeProfitPercent: parseFloat(p.store_profit || 0),
            wholesalerProfitPercent: parseFloat(p.wholesaler_profit || 0),
            discountPricePercent: 0,
            offers: p.offer === 'yes',
            newArrival: p.new_arrival === 'yes',
            active: p.active === 'yes'
          }));
          setProducts(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, supplierId, searchQuery]);

  return (
    <>
      <DashboardHeading
        label={"products"}
        subtitle={"Manage your products here"}
      >
        <BackButton variant={"outline"} />
        <Link href={"/administrator/dashboard/add-product"}>
          <Button className={'w-full'}>Add Product</Button>
        </Link>
      </DashboardHeading>

      {loading ? (
        <div className="p-20 text-center text-gray-500">Loading products...</div>
      ) : (
        <DataTable
          rowColored={true}
          columns={productsColumns}
          data={products}
        />
      )}
    </>
  );
};

export default ManageProduct;
