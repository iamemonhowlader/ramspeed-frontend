"use client";
import { FaArrowRight, FaPlus, FaTrash } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiSmartphoneFill } from "react-icons/ri";
import { apiFetch } from "@/lib/api";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { toast } from "react-toastify";

import ApplePay from "../../../public/payment/apple.png";
import Card from "../../../public/payment/card.png";
import CODPaymentIcon from "../../../public/payment/cod.png";
import { default as Gpay } from "../../../public/payment/gpay.png";
import { default as Paypal } from "../../../public/payment/paypal.png";

export default function Checkout() {
  const router = useRouter();
  const { user, setRedirectPath } = useAuthStore();
  const { items, getSubtotal, getTotalItems, addItem, removeItem, updateQuantity, clearCart, updateItemOption } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [shippingMethod, setShippingMethod] = useState("pickup");
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    email: "",
    phone: "",
    city: "",
    postCode: "",
    country: "",
    orderNotes: "",
  });

  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: 1 });
  
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [vatZero, setVatZero] = useState(0); // 0 = 19%, 1 = 0%
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [discountType, setDiscountType] = useState("amount"); // "amount" or "percentage"

  useEffect(() => {
    setMounted(true);
    
    if (!user) {
      setRedirectPath("/checkout");
      router.push("/my-account/login");
      return;
    }
    
    fetchProfile();
    if (user.type === "printer") {
      fetchClients();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const response = await apiFetch("/api/frontend/account");
      if (response.success && response.data) {
        const u = response.data;
        const names = (u.full_name || "").split(" ");
        setFormData({
          firstName: names[0] || "",
          lastName: names.slice(1).join(" ") || "",
          companyName: u.company_name || "",
          address: u.address || "",
          email: u.email || "",
          phone: u.phone || "",
          city: u.city || "",
          postCode: u.post_code || "",
          country: u.country || "",
          orderNotes: "",
        });
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await apiFetch("/api/frontend/clients");
      if (response.success) {
        setClients(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  const handleClientChange = (clientId) => {
    setSelectedClient(clientId);
    const client = clients.find(c => c.id === parseInt(clientId));
    if (client) {
      const names = (client.full_name || "").split(" ");
      setFormData(prev => ({
        ...prev,
        firstName: names[0] || "",
        lastName: names.slice(1).join(" ") || "",
        address: client.address || "",
        city: client.city || "",
        postCode: client.post_code || "",
        email: client.email || "",
        phone: client.phone || "",
      }));
      
      if (client.type === "wholesaler") {
        setVatZero(1);
      } else {
        setVatZero(0);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast.error("Please enter product name and price");
      return;
    }
    const customItem = {
      id: "custom-" + Date.now(),
      name: newProduct.name,
      calculated_price: parseFloat(newProduct.price),
      sku: "CUSTOM",
      image: null,
      is_custom: true
    };
    addItem(customItem, parseInt(newProduct.quantity));
    setNewProduct({ name: "", price: "", quantity: 1 });
    setShowAddProduct(false);
    toast.success("Custom product added");
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...formData,
        payment_method: selectedPayment,
        shipping_method: shippingMethod,
        items: items.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.calculated_price || item.price,
          is_custom: item.is_custom || false,
          name: item.name,
          options_msg: item.options_msg || ""
        })),
        total: total,
        subtotal: subtotal,
        tax: tax,
        shipping: shipping,
        vatZero: vatZero,
        client_id: selectedClient,
        totalDiscount: calculatedDiscount,
      };

      const response = await apiFetch("/api/frontend/checkout/save", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      if (response.success) {
        clearCart();
        toast.success("Order placed successfully!");
        router.push(`/order-placed?order_id=${response.order_id}`);
      } else {
        toast.error(response.message || "Failed to place order");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const isPrinter = user?.type === "printer";
  const isWholesaler = user?.type === "wholesaler";
  
  const subtotal = mounted ? getSubtotal() : 0;
  
  let calculatedDiscount = 0;
  if (isPrinter) {
    if (discountType === "amount") {
      calculatedDiscount = parseFloat(totalDiscount || 0);
    } else {
      calculatedDiscount = subtotal * (parseFloat(totalDiscount || 0) / 100);
    }
  }

  const taxRate = (isWholesaler || vatZero === 1) ? 0 : 0.19;
  const tax = (subtotal - calculatedDiscount) * taxRate;
  
  const shippingOptions = {
    free: 0.0,
    pickup: 5.0,
    express: 7.0,
  };
  const shipping = shippingOptions[shippingMethod];
  const total = subtotal - calculatedDiscount + tax + shipping;

  const paymentMethods = isPrinter ? [
    { id: "cash", label: "Cash", icon: CODPaymentIcon },
    { id: "credit", label: "Credit", icon: Card, disabled: !selectedClient },
    { id: "card", label: "Visa Card", icon: Card },
  ] : [
    { id: "cash", label: "Cash on Delivery", icon: CODPaymentIcon },
    { id: "paypal", label: "Paypal", icon: Paypal },
    { id: "apple", label: "Apple pay", icon: ApplePay },
    { id: "card", label: "Debit/Credit Card", icon: Card },
  ];

  if (!mounted) return null;

  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <h2 className="text-3xl font-bold uppercase mb-10 text-black">
          Proceed to Checkout
        </h2>

            {user?.type === "printer" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-end gap-4">
                  <div className="flex-1">
                    <h3 className="text-blue-800 font-bold mb-2 flex items-center gap-2">
                      <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded">PRINTER MODE</span>
                      Select Client
                    </h3>
                    <select 
                      className="w-full p-2 border border-blue-300 rounded-md bg-white text-sm"
                      value={selectedClient}
                      onChange={(e) => handleClientChange(e.target.value)}
                    >
                      <option value="">-- Choose an existing client --</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>
                          {client.full_name} ({client.city})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:w-32">
                    <h3 className="text-blue-800 font-bold mb-2">VAT</h3>
                    <select
                      className="w-full p-2 border border-blue-300 rounded-md bg-white text-sm"
                      value={vatZero}
                      onChange={(e) => setVatZero(parseInt(e.target.value))}
                    >
                      <option value={0}>19%</option>
                      <option value={1}>0%</option>
                    </select>
                  </div>
                </div>
                <p className="text-[10px] text-blue-600 mt-2">* Selection will auto-fill details and override VAT if set to 0%.</p>
              </div>
            )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8">
          <div className="space-y-8">
            {/* Billing Information */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-2px_rgba(20,71,230,0.1)] border border-gray-100">
              <h2 className="text-xl font-bold uppercase mb-8 text-black border-b pb-4">
                Billing Information
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-black transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-black transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Company Name (Optional)</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    placeholder="Enter company name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-black transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Full Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street, house number, etc."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-black transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-black transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Post Code</label>
                    <input
                      type="text"
                      name="postCode"
                      value={formData.postCode}
                      onChange={handleInputChange}
                      placeholder="Post Code"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-black transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-black transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-black transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Printer Special: Add Custom Product */}
            {isPrinter && (
              <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2">
                    <FaPlus /> Printer Tools: Add Custom Item
                  </h3>
                  <button 
                    onClick={() => setShowAddProduct(!showAddProduct)}
                    className="text-sm font-bold text-blue-600 underline"
                  >
                    {showAddProduct ? "Cancel" : "Add Product"}
                  </button>
                </div>
                
                {showAddProduct && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl shadow-sm">
                    <input 
                      type="text" 
                      placeholder="Product Name" 
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="px-3 py-2 border rounded-lg text-sm text-black"
                    />
                    <input 
                      type="number" 
                      placeholder="Price (€)" 
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="px-3 py-2 border rounded-lg text-sm text-black"
                    />
                    <button 
                      onClick={handleAddCustomProduct}
                      className="bg-blue-600 text-white font-bold py-2 rounded-lg text-sm hover:bg-blue-700"
                    >
                      Save to Cart
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Payment Option */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_-2px_rgba(20,71,230,0.1)] border border-gray-100">
              <h2 className="text-xl font-bold uppercase mb-8 text-black border-b pb-4">
                Payment Option
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPayment(method.id)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                      selectedPayment === method.id
                        ? "border-primary bg-primary/5 scale-105 shadow-md"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <div className="h-12 w-full flex items-center justify-center mb-3">
                      <Image src={method.icon} alt={method.label} width={80} height={40} className="object-contain max-h-full" />
                    </div>
                    <span className={`text-xs font-bold text-center ${selectedPayment === method.id ? "text-primary" : "text-gray-500"}`}>
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_-2px_rgba(20,71,230,0.1)] border border-gray-100 sticky top-6">
              <h2 className="text-xl font-bold uppercase mb-6 text-black border-b pb-4">
                Order Summary
              </h2>

              <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 relative">
                      <Image
                        src={item.image 
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://ramspeed-laravel-api.test'}/storage/product_images/${item.image}`
                          : "/product-placeholder.png"
                        }
                        alt={item.name}
                        fill
                        unoptimized
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-black truncate group-hover:text-primary transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mb-1">SKU: {item.sku}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-primary">
                          {item.quantity} × €{(item.calculated_price || item.price).toFixed(2)}
                        </span>
                        {isPrinter && item.price_sup_cy > 0 && (
                          <span className="text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                            Sup: €{parseFloat(item.price_sup_cy).toFixed(2)}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                           {isPrinter && (
                             <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 p-1">
                               <FaTrash size={12} />
                             </button>
                           )}
                        </div>
                      </div>
                      
                      {item.options && (
                        <div className="mt-2">
                          <p className="text-[10px] text-blue-600 font-semibold mb-1 italic">
                            * Product has options: {item.options}
                          </p>
                          <input 
                            type="text"
                            placeholder="Specify option (color, size, etc.)"
                            className="w-full text-[11px] p-1.5 border border-gray-200 rounded bg-gray-50 focus:bg-white outline-none"
                            value={item.options_msg || ""}
                            onChange={(e) => updateItemOption(item.id, e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping */}
              <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-xl">
                <h3 className="text-sm font-bold text-black mb-2 uppercase">Shipping Method</h3>
                {Object.entries(shippingOptions).map(([key, val]) => (
                  <label key={key} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === key}
                        onChange={() => setShippingMethod(key)}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {key === "free" ? "Free Shipping" : `Akis ${key}`}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-black">€{val.toFixed(2)}</span>
                  </label>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-black">€{subtotal.toFixed(2)}</span>
                </div>
                
                {isPrinter && (
                  <div className="space-y-2 bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-blue-800 font-bold">Discount</span>
                      <select 
                        className="bg-white border border-blue-200 text-[10px] rounded px-1"
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value)}
                      >
                        <option value="amount">Amount (€)</option>
                        <option value="percentage">Percent (%)</option>
                      </select>
                    </div>
                    <input 
                      type="number"
                      className="w-full p-2 text-sm border border-blue-200 rounded-lg outline-none focus:ring-1 focus:ring-blue-400"
                      placeholder={discountType === "amount" ? "€0.00" : "0%"}
                      value={totalDiscount || ""}
                      onChange={(e) => setTotalDiscount(e.target.value)}
                    />
                    {calculatedDiscount > 0 && (
                      <div className="flex justify-between text-xs text-blue-600 font-bold italic">
                        <span>Applied:</span>
                        <span>-€{calculatedDiscount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT ({Math.round(taxRate * 100)}%)</span>
                  <span className="font-bold text-black">€{tax.toFixed(2)}</span>
                </div>
                {shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-bold text-black">€{shipping.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-black text-black border-t-2 border-primary/10 pt-4 mt-2">
                  <span>Total</span>
                  <span className="text-primary">€{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={submitting || items.length === 0}
                className={`w-full mt-8 py-4 rounded-xl font-black text-sm uppercase flex items-center justify-center gap-2 transition-all ${
                  submitting || items.length === 0
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5"
                }`}
              >
                {submitting ? "Processing..." : "Place Order"}
                {!submitting && <FaArrowRight />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
