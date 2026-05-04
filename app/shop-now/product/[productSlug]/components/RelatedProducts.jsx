"use client";
import Product from "@/components/Product/Product";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const RelatedProducts = ({ categoryId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;
    const fetchRelated = async () => {
      try {
        const data = await apiFetch(`/api/frontend/products?category=${categoryId}&limit=4`);
        if (data.success) {
          setProducts(Array.isArray(data.data) ? data.data : data.data.data);
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [categoryId]);

  if (loading) return <div className="h-64 bg-gray-100 animate-pulse rounded-2xl"></div>;
  if (products.length === 0) return <p>No related products found.</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <Product key={product.id} data={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
