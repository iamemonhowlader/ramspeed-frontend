"use client";
import NewProduct from "./NewProduct";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNew = async () => {
      try {
        const data = await apiFetch("/api/frontend/products?new_arrival=yes&limit=8");
        if (data.success) {
          setProducts(Array.isArray(data.data) ? data.data : data.data.data);
        }
      } catch (error) {
        console.error("Error fetching new products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNew();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {loading ? (
        Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>)
      ) : products.length > 0 ? (
        products.map((product) => (
          <NewProduct key={product.id} data={product} />
        ))
      ) : (
        <p className="col-span-full text-center">No new products found.</p>
      )}
    </div>
  );
};

export default NewProducts;
