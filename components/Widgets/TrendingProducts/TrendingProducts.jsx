"use client";
import TrendingProduct from "./TrendingProduct";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        // Using new_arrival as trending for now
        const data = await apiFetch("/api/frontend/products?new_arrival=yes&limit=2");
        if (data.success) {
          setProducts(Array.isArray(data.data) ? data.data : data.data.data);
        }
      } catch (error) {
        console.error("Error fetching trending products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-black">
          Explore our trending products
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row gap-5">
        {loading ? (
          <div className="w-full h-64 bg-gray-100 animate-pulse rounded-2xl"></div>
        ) : products.length > 0 ? (
          products.map((product) => (
            <TrendingProduct key={product.id} data={product} />
          ))
        ) : (
          <p>No trending products found.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingProducts;
