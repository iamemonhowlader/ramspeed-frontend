"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import useCartStore from "@/store/cartStore";

export default function ShoppingCart() {
  const { items, removeItem, updateQuantity, clearCart, getSubtotal } = useCartStore();
  const router = useRouter();
  const [shippingMethod, setShippingMethod] = useState("pickup");
  const [couponCode, setCouponCode] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shippingOptions = {
    free: 0.0,
    pickup: 5.0,
    express: 7.0,
  };

  const applyCoupon = () => {
    if (couponCode.trim()) {
      alert(`Coupon "${couponCode}" applied!`);
    }
  };

  const proceedToCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    router.push("/checkout");
  };

  if (!isMounted) return null;

  const subtotal = getSubtotal();
  const discount = 0; // Dynamic discount can be added later
  const tax = subtotal * 0.19; // Example VAT
  const shipping = shippingOptions[shippingMethod];
  const total = subtotal - discount + tax + shipping;

  const ProductImage = ({ filename, name }) => {
    const src = filename 
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ramspeed-laravel-api.test'}/storage/product_images/${filename}`
      : "/controller.png";
      
    return (
      <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0 p-2 relative">
        <Image
          src={src}
          alt={name}
          fill
          unoptimized
          className="object-contain p-2"
        />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="py-8 sm:py-12">
        <div className="w-full ">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5 ">
            <div className="">
              {/* Main Cart Section */}
              <div className="bg-white rounded-lg shadow-[1px_1px_15px_-1px_#1447e6] p-6 lg:p-8 pb-10 ">
                {/* Desktop Headers */}
                <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-5 pb-5 border-b-2 border-gray-100 font-extrabold text-primary text-sm uppercase">
                  <div>Products</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Sub-Total</div>
                </div>

                {/* Cart Items */}
                {items.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 flex flex-col items-center gap-4">
                    <p>Your cart is empty</p>
                    <Link href="/shop-now" className="text-primary font-bold hover:underline">Go to Shop</Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 md:gap-5 py-6 border-b border-gray-100 relative"
                    >
                      {/* Product Info */}
                      <div className="flex gap-4 items-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-6 h-6 border-2 border-red-500 rounded-full text-red-500 hover:bg-red-50 flex items-center justify-center flex-shrink-0 text-xl leading-none absolute md:relative top-2 right-2 sm:top-4 sm:right-4 md:top-auto md:right-auto cursor-pointer"
                        >
                          <RxCross2 />
                        </button>
                        <ProductImage filename={item.image} name={item.name} />
                        <div className="flex-1">
                          <h3 className="text-sm font-bold mb-1 text-black">
                            {item.name}
                          </h3>
                          <div className="text-xs">
                            SKU code:{" "}
                            <span className="text-primary">{item.sku}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center">
                        <span className="md:hidden text-gray-600 mr-2">
                          Price:
                        </span>
                        <span className="text-base font-bold">
                          €{item.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <span className="md:hidden text-gray-600">
                          Quantity:
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center text-black cursor-pointer"
                        >
                          −
                        </button>
                        <span className="min-w-[30px] text-center font-bold">
                          {String(item.quantity).padStart(2, "0")}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center text-black cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="flex items-center font-semibold">
                        <span className="md:hidden font-normal mr-2">
                          Sub-total:
                        </span>
                        <span className="text-primary font-bold">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))
                )}

                {/* Actions */}
                <div className="flex flex-col justify-between md:flex-row gap-4 mt-8">
                  <Link
                    href="/shop-now"
                    className="w-auto px-6 py-3 border-2 border-primary text-primary rounded-md font-semibold text-sm uppercase hover:bg-blue-50 transition cursor-pointer text-center"
                  >
                    Return to Shop
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-auto px-6 py-3 bg-red-500 text-white rounded-md font-semibold text-sm uppercase hover:bg-red-600 transition cursor-pointer"
                  >
                    Empty Cart
                  </button>
                </div>

                {/* Coupon Form */}
                <div className="mt-8">
                  <label className="block font-semibold mb-4 text-black">
                    Coupon Code
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter coupon code"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-6 py-3 bg-primary text-white rounded-md font-semibold text-sm cursor-pointer uppercase hover:bg-primary/90 transition whitespace-nowrap"
                    >
                      Apply Coupon
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Details Sidebar */}
            <div className="bg-white rounded-lg shadow-[1px_1px_15px_-1px_#1447e6] p-6 lg:p-8 h-fit lg:sticky lg:top-6">
              <h2 className="text-xl font-bold uppercase mb-6 text-black">
                Cart Totals
              </h2>

              {/* Shipping Options */}
              <div className="my-6">
                <h3 className="font-semibold mb-4 text-black">Shipping Method</h3>

                <label className="flex items-center justify-between py-2 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="free"
                      checked={shippingMethod === "free"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">Free shipping</span>
                  </div>
                  <span className="font-semibold text-sm text-green-600">
                    Free
                  </span>
                </label>

                <label className="flex items-center justify-between py-2 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="pickup"
                      checked={shippingMethod === "pickup"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">Akis pickup:</span>
                  </div>
                  <span className="font-semibold text-sm text-black">
                    €{shippingOptions.pickup.toFixed(2)}
                  </span>
                </label>

                <label className="flex items-center justify-between py-2 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      checked={shippingMethod === "express"}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="text-sm">Akis express:</span>
                  </div>
                  <span className="font-semibold text-sm text-black">
                    €{shippingOptions.express.toFixed(2)}
                  </span>
                </label>
              </div>

              {/* Price Summary */}
              <div className="mt-6 pt-5 border-t-2 border-gray-100">
                <div className="flex justify-between py-2 text-sm">
                  <span>Sub-total</span>
                  <span className="text-black font-bold">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm text-green-600">
                  <span>Discount</span>
                  <span>-€{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span>VAT (19%)</span>
                  <span className="text-black font-bold">€{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span>Shipping</span>
                  <span className="text-black font-bold">€{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 mt-4 border-t-2 border-gray-100 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary text-xl">€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={proceedToCheckout}
                className="w-full mt-6 px-6 py-4 bg-primary text-white rounded-md font-bold text-sm uppercase hover:bg-primary/90 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Proceed to Checkout
                <FaArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
