"use client";

import React, { useEffect, useState } from "react";
import DataTable from "@/components/common/DataTable/DataTable";
import DashboardHeading from "../Common/DashboardHeading";
import { productsColumns } from "../../manage-products/components/productsColumns";
import { apiFetch } from "@/lib/api";

const ProductsWithoutStock = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiFetch("/api/admin/dashboard-data");
        if (response.success) {
          const mappedProducts = (response.outOfStock || []).map(p => ({
            ...p,
            image: p.product_images?.[0]?.filename 
              ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/storage/product_images/${p.product_images[0].filename}`
              : null,
            priceDollar: parseFloat(p.price || 0),
            priceEuro: parseFloat(p.calculated_price_euro || 0),
            sellingPrice: parseFloat(p.calculated_selling_price_euro || 0),
            priceCyprus: parseFloat(p.calculated_price_cyprus_euro || 0),
            cyProfitTax: parseFloat(p.calculated_cy_profit_tax_euro || 0),
            wholesalerPrice: parseFloat(p.price_sup_cy || 0),
            storeProfitPercent: p.store_profit || 0,
            wholesalerProfitPercent: p.wholesaler_profit || 0,
            discountPricePercent: 0,
            offers: p.offer === 'yes',
            newArrival: p.new_arrival === 'yes',
            active: p.active === 'yes'
          }));
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch out of stock products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <DashboardHeading
        titlePrefix="Manage your products"
        label={"Without Stock"}
      />

      {loading ? (
        <div className="p-10 text-center text-gray-500">Loading products...</div>
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

export default ProductsWithoutStock;
