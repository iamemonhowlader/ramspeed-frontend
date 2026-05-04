"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";

export default function Product({ data, ProductlayoutItem }) {
  const { user } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const { addItem } = useCartStore();
  const { setRedirectPath } = useAuthStore();
  const router = useRouter();

  const addedToCart = () => {
    if (!user) {
      setRedirectPath(pathname);
      router.push("/my-account/login");
      return;
    }
    addItem(data, quantity);
    toast.success("Product added to cart successfully!");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart:open"));
    }
  };

  // If no data provided, return null or placeholder
  if (!data) return null;

  // Map API data to component fields
  const product = {
    id: data.id,
    title: data.name,
    availability: data.availability,
    availability_cy: data.availability_cy,
    sku: data.code,
    price: parseFloat(data.price) > 0 ? parseFloat(data.price) : parseFloat(data.price_sup_cy || 0),
    price_cy: parseFloat(data.price_cy),
    wholesaler_price: parseFloat(data.price_cy), // This would normally come from API logic
    image: (data.product_images && data.product_images.length > 0) 
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ramspeed-laravel-api.test'}/storage/product_images/${data.product_images[0].filename}` 
      : "/controller.png",
  };

  const productSlug = product.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const productHref = `/shop-now/product/${product.id}-${productSlug}`;

  const customerType = user?.type || "regular";
  const userRole = user ? "user" : "guest";

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200 overflow-hidden group flex flex-col transition h-full">
      {/* Product Image */}
      <div className="relative w-full h-64 overflow-hidden p-3 sm:p-6 bg-gray-50">
        <Link href={productHref} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={200}
            unoptimized
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-3 sm:p-6 flex flex-col justify-between flex-1">
        <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
          <Link href={productHref}>{product.title}</Link>
        </h2>

        <div className="flex flex-col gap-2 text-sm mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Availability:</span>
            <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
              parseInt(product.availability_cy) >= 3 ? "text-green-700 bg-green-50" :
              parseInt(product.availability_cy) >= 1 ? "text-orange-700 bg-orange-50" :
              (parseInt(product.availability) > 0 ? "text-blue-700 bg-blue-50" : "text-red-700 bg-red-50")
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                parseInt(product.availability_cy) >= 3 ? "bg-green-500" :
                parseInt(product.availability_cy) >= 1 ? "bg-orange-500" :
                (parseInt(product.availability) > 0 ? "bg-blue-500" : "bg-red-500")
              }`}></span>
              {parseInt(product.availability_cy) >= 3 ? (
                <>In Stock – Available Now / Σε Απόθεμα</>
              ) : parseInt(product.availability_cy) >= 1 ? (
                <>Low Stock – Only few left / Περιορισμένο Απόθεμα</>
              ) : parseInt(product.availability) > 0 ? (
                <>Available on Order / Διαθέσιμο κατόπιν παραγγελίας</>
              ) : (
                <>Out of Stock / Εξαντλημένο</>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">SKU:</span>
            <span className="text-blue-600 font-medium">{product.sku}</span>
          </div>
        </div>

        {/* Pricing Logic based on User Type */}
        <div className="mb-6 flex flex-col gap-2">
          {customerType === "wholesaler" ? (
            <div className="bg-[#e6ebef] text-primary p-3 w-full flex justify-between font-bold rounded-lg">
              <span>Wholesaler Price</span>
              <span>€{product.wholesaler_price.toFixed(2)}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">
                €{product.price.toFixed(2)}
              </span>
            </div>
          )}
          
          {/* Always show Cyprus price for info if applicable (for Retail users) */}
          {customerType !== "wholesaler" && product.price_cy > 0 && (
            <div className="border border-primary/20 text-primary p-2 w-full flex justify-between text-sm font-semibold rounded-lg bg-primary/5">
              <span>Price in Cyprus</span>
              <span>€{product.price_cy.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Quantity + Add to Cart */}
        <div className="flex flex-col gap-4 mt-auto">
          <div className="flex items-center border rounded-md overflow-hidden w-fit">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              –
            </button>
            <div className="w-12 h-10 flex items-center justify-center border-x bg-white">
              <span className="text-sm">{quantity.toString().padStart(2, "0")}</span>
            </div>
            <button
              onClick={() => handleQuantityChange(1)}
              className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              +
            </button>
          </div>

          <button
            onClick={addedToCart}
            disabled={parseInt(product.availability_cy) <= 0 && parseInt(product.availability) <= 0}
            className={`w-full py-3 px-6 rounded-md transition-colors duration-200 text-sm uppercase tracking-wide ${
              (parseInt(product.availability_cy) <= 0 && parseInt(product.availability) <= 0)
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-primary hover:bg-primary/90 text-white"
            }`}
          >
            {(parseInt(product.availability_cy) <= 0 && parseInt(product.availability) <= 0) ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
