"use client";

import Product from "@/components/Product/Product";
import { navigation } from "@/utils/navigation";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "./components/Pagination";
import ShopNowHeading from "./components/ShopNowHeading";
import Sidebar from "./components/Sidebar";
import useProductStore from "@/store/productStore";

const ShopNowContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { products, fetchProducts, loading } = useProductStore();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  useEffect(() => {
    const params = {};
    if (categoryId) params.category = categoryId;
    console.log("Fetching products with params:", params);
    fetchProducts(params).then(() => {
      console.log("Products fetched:", products);
    }).catch(err => {
      console.error("Fetch products error:", err);
    });
  }, [fetchProducts, categoryId]);

  // Close on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="py-8 sm:py-12">
          <ShopNowHeading navigation={navigation} />
          <div className="block lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-md transition-colors duration-200 text-sm"
            >
              Filters
            </button>
          </div>
        </div>

        <div className="py-8 sm:py-12">
          <div className="flex gap-8">
            <div className="hidden lg:flex w-full flex-col gap-20 sm:w-1/4">
              <Sidebar />
            </div>
            <div className="w-full sm:w-3/4">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-xl">Loading products...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                  <p className="text-xl">No products found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-5">
                  {products.map((product) => (
                    <div key={product.id}>
                      <Product data={product} />
                    </div>
                  ))}
                </div>
              )}
              <div className="container flex justify-center py-8 sm:py-12 overflow-hidden">
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShopNow = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopNowContent />
    </Suspense>
  );
};

export default ShopNow;
