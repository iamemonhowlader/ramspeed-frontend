"use client";
import Product from "@/components/Product/Product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await apiFetch("/api/frontend/products?featured=yes&limit=4");
        if (data.success) {
          setProducts(Array.isArray(data.data) ? data.data : data.data.data);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-end mb-8">
        <h2 className="text-3xl font-black text-black">Featured Products</h2>
        <Link className="text-black font-semibold" href="/shop-now?featured=yes">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {loading ? (
           Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>)
        ) : products.length > 0 ? (
          products.map((product) => (
            <Product key={product.id} data={product} />
          ))
        ) : (
          <p className="col-span-full text-center py-10">No featured products found.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
