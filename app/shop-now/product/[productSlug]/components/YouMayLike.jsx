"use client";
import Product from "@/components/Product/Product";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const YouMayLike = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const data = await apiFetch(`/api/frontend/products?limit=4`);
        if (data.success) {
          setProducts(Array.isArray(data.data) ? data.data : data.data.data);
        }
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRandom();
  }, []);

  if (loading) return <div className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </div>
  );
};

export default YouMayLike;
