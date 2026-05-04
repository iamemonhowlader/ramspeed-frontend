"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import ImageGallery from "./ImageGallery";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { useRouter } from "next/navigation";

const ProductDetails = ({ product, slug }) => {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  // Default product data if none is provided
  const defaultProduct = {
    title: "Nike Pegasus 41 shoes",
    category: "Gaming Console",
    sku: "A264671",
    brand: "Samsung",
    brandLogo: "/samsung-logo.png",
    price: 300.45,
    originalPrice: 320.45,
    discount: "21% OFF",
    stock: 30,
    stockStatus: "In Stock",
    stockLevel: "Good",
    features: ["Ram 16 gb", "Hard drive 256 gb", "Screen size 13 inch"],
    delivery: {
      estimatedTime: "14-30",
      warranty: "18 months warranty at Genuine Warranty Center",
      freeDelivery: "Free delivery within 4 days",
    },
    images: [
      "/product-gallery-1.png",
      "/product-gallery-2.png",
      "/product-gallery-3.png",
      "/product-gallery-4.png",
    ],
    paymentMethods: [
      "/visa.png",
      "/mastercard.png",
      "/amex.png",
      "/discover.png",
      "/paypal.png",
      "/apple.png",
    ],
    shortDescription:
      "Experience next-gen gaming power in a sleek, compact design. The Xbox Series S – 1TB delivers ultra-fast load times, smooth 120 FPS gameplay, and vibrant HDR visuals for an immersive all-digital experience.",
  };
  const { user, setRedirectPath } = useAuthStore();

  const addedToCart = () => {
    if (!user) {
      setRedirectPath(`/shop-now/product/${slug}`);
      router.push("/my-account/login");
      return;
    }

    if (product) {
      addItem(product, quantity);
      toast.success(`${product.name} added to cart!`, {
        position: "bottom-right",
        autoClose: 1500,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.error("Product data not available", {
        position: "bottom-right",
      });
    }
  };
  // Merge provided product data and map Laravel fields
  const productData = {
    ...defaultProduct,
    title: product?.name || defaultProduct.title,
    category: product?.category_name || "General",
    sku: product?.code || defaultProduct.sku,
    brand: product?.brand_name || "Brand",
    price: product?.calculated_price_cy || product?.calculated_price || (parseFloat(product?.price) > 0 ? parseFloat(product?.price) : parseFloat(product?.price_sup_cy || 0)),
    originalPrice: (product?.calculated_price_cy || product?.calculated_price || (parseFloat(product?.price) > 0 ? parseFloat(product?.price) : parseFloat(product?.price_sup_cy || 0))) * 1.1, // Mockup original price
    stock: product?.availability || 0,
    stockStatus: (product?.availability > 0 || product?.availability_cy > 0) ? "In Stock" : "Out of Stock",
    stockLevel: product?.availability > 10 ? "Good" : (product?.availability > 0 ? "Low Stock" : "None"),
    images: (product?.product_images && product.product_images.length > 0)
      ? product.product_images.map(img => `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ramspeed-laravel-api.test'}/storage/product_images/${img.filename}`)
      : defaultProduct.images,
    shortDescription: product?.description || defaultProduct.shortDescription,
  };

  // Calculate discount percentage if not provided
  const discountPercentage =
    productData.discount ||
    Math.round(
      ((productData.originalPrice - productData.price) /
        productData.originalPrice) *
        100
    ) + "% OFF";

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Format quantity for display (with leading zero if needed)
  const formattedQuantity = quantity < 10 ? `0${quantity}` : quantity;

  return (
    <div className="flex flex-col lg:flex-row gap-8 sm:gap-15 max-w-7xl mx-auto p-4">
      {/* Left side - Image Gallery */}
      <div className="w-full lg:w-1/2">
        <ImageGallery images={productData?.images} />
      </div>

      {/* Right side - Product Info */}
      <div className="w-full lg:w-1/2">
        {/* Category */}
        <p className="text-sm mb-3 capitalize">{productData?.category}</p>

        {/* Title */}
        <h1 className="text-5xl font-bold mb-6 text-black">
          {productData?.title}
        </h1>

        <div className="flex flex-row items-start justify-between max-w-full gap-4 text-left mb-8">
          {/* SKU and Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-1 justify-start items-center">
              <span className="text-sm font-medium"> SKU code:</span>
              <span className="text-sm font-medium text-primary">
                {productData?.sku}
              </span>
            </div>{" "}
            <div className="flex gap-1 justify-start items-center">
              <span className="text-sm font-medium">Brand:</span>
              <span className="text-sm font-medium text-primary">
                <Link href={`/shop-now/brand/${productData?.brand}`}>
                  {productData?.brand}
                </Link>
              </span>
            </div>
          </div>

          {/* Availability */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-1 justify-start items-center">
              <span className="text-sm font-medium">Availability:</span>
              <span className="text-sm font-medium text-green-600">
                {productData?.stock} {productData?.stockStatus}
              </span>
            </div>
            <div className="flex gap-1 justify-start items-center">
              <span className="text-sm font-medium"> Stock level::</span>
              <span className="text-sm font-medium text-primary">
                {productData?.stockLevel || "Unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-6 mb-6">
          <span className="text-4xl font-bold text-primary">
            €{productData?.price?.toFixed(2) || "0.00"}
          </span>
          {productData?.originalPrice && (
            <span className="text-xl line-through">
              €{productData?.originalPrice?.toFixed(2) || "0.00"}
            </span>
          )}
          {discountPercentage && (
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">
              {discountPercentage}
            </span>
          )}
        </div>

        {/* Features */}
        {/* <div className="mb-6">
          <ul className="space-y-2">
            {productData?.features?.map((feature, index) => (
              <li key={index} className="flex items-center gap-3 font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-primary flex-shrink-0"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div> */}

        <div className="max-w-6xl font-bold mx-auto border rounded-2xl p-4 mb-6">
          <p>
            Experience next-gen gaming power in a sleek, compact design. The
            Xbox Series S – 1TB delivers ultra-fast load times, smooth 120 FPS
            gameplay, and vibrant HDR visuals for an immersive all-digital
            experience.
          </p>
        </div>

        {/* Delivery Info */}
        <div className="bg-[#e8f3fe] p-4 rounded-lg mb-6 font-bold text-primary">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                Estimated delivery time: {productData?.delivery?.estimatedTime}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
              <span>{productData.delivery?.warranty}</span>
            </div>
            <div className="flex items-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                />
              </svg>
              <span>{productData.delivery?.freeDelivery}</span>
            </div>
          </div>
        </div>

        {/* Add to Cart */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center border border-gray-300 rounded-md h-[48px]">
            <button
              className="px-3 py-2 text-xl font-medium hover:bg-gray-100 cursor-pointer h-full flex items-center"
              onClick={decreaseQuantity}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="text"
              value={formattedQuantity}
              className="w-12 text-center border-none focus:outline-none h-full"
              readOnly
            />
            <button
              className="px-3 py-2 text-xl font-medium hover:bg-gray-100 cursor-pointer h-full flex items-center"
              onClick={increaseQuantity}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            onClick={addedToCart}
            className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90 cursor-pointer transition-colors flex items-center justify-center gap-2 w-auto h-[48px]"
          >
            ADD TO CART
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
          <ToastContainer />
        </div>

        {/* Share */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm ">Share product:</span>
          <div className="flex gap-2">
            <button
              className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Share on Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className=""
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
            </button>
            <button
              className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Share on Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className=""
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
            </button>
            <button
              className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Share on Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className=""
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
              </svg>
            </button>
            <button
              className="p-1.5 rounded-full border border-gray-300 hover:bg-gray-100"
              aria-label="Copy link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className=""
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border border-[#e4e7e9] p-5">
          <div className="mb-3">
            <span className="text-sm text-black font-medium">
              100% Guarantee Safe Checkout
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {productData?.paymentMethods?.map((method, index) => (
              <div
                key={index}
                className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center p-1"
              >
                <Image
                  src={method}
                  alt="Payment method"
                  width={200}
                  height={150}
                  className="object-contain w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
