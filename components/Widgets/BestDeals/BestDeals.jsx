"use client";
import Product from "@/components/Product/Product";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const BestDeals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await apiFetch("/api/frontend/products?offer=yes&limit=2");
        if (data.success) {
          setProducts(Array.isArray(data.data) ? data.data : data.data.data);
        }
      } catch (error) {
        console.error("Error fetching best deals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-3xl font-black text-black mb-6 capitalize">
        Deals of the day
      </h2>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          {loading ? (
             Array.from({ length: 2 }).map((_, i) => <div key={i} className="h-64 w-full bg-gray-100 animate-pulse rounded-2xl"></div>)
          ) : products.length > 0 ? (
            products.map((product) => (
              <Product key={product.id} data={product} />
            ))
          ) : (
            <p>No deals found.</p>
          )}
        </div>
        
        {/* Static Banners for Design */}
        <div className="grid-cols-1 md:grid-cols-2 grid gap-6">
          <div className="md:col-span-2 bg-[url('/deals-1.png')] bg-center bg-no-repeat bg-cover p-10 rounded-2xl ">
            <div className="flex flex-col justify-center gap-4 max-w-[50%]">
              <h3 className="text-black font-black text-2xl">Headphones</h3>
              <p className="text-black text-xl ">
                integrated controll and mode with swift sound, reduced noise
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-lg font-medium transition-colors text-sm sm:text-base uppercase tracking-wide cursor-pointer inline-block w-fit">
                SHOP NOW
              </button>
            </div>
          </div>
          <div className="">
            <div className="col-span-2 bg-[url('/deals-2.png')] bg-center bg-no-repeat bg-cover p-6 sm:p-10 rounded-2xl flex flex-col items-center text-center justify-center gap-4 h-full">
              <h3 className="text-white font-black text-2xl">Headphones</h3>
              <p className="text-white ">
                integrated controll and mode with swift sound, reduced noise
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-lg font-medium transition-colors text-sm sm:text-base uppercase tracking-wide cursor-pointer inline-block w-fit">
                SHOP NOW
              </button>
            </div>
          </div>
          <div className="">
            <div className="col-span-2 bg-[url('/deals-3.png')] bg-center bg-no-repeat bg-cover p-6 sm:p-10 rounded-2xl text-center flex flex-col items-center justify-center gap-4  h-full">
              <h3 className="text-white font-black text-2xl">
                Protection cover
              </h3>
              <p className="text-white ">
                integrated controll and mode with swift sound, reduced noise
              </p>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-lg font-medium transition-colors text-sm sm:text-base uppercase tracking-wide cursor-pointer inline-block w-fit">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
