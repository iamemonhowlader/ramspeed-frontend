"use client";

import { CircleX } from "lucide-react";
import { useState } from "react";

export default function OrderOverview() {
  const [orderData] = useState({
    items: [
      {
        id: 1,
        name: "X box series - 1TB Gaming all digital console",
        sku: "A264671",
        quantity: 1,
        unitPrice: 300.45,
        linePrice: 300.45,
        discount: 300.45,
        discountPercent: [2, 4],
        vat: 3.95,
        finalPrice: 300.45,
        serialNumber: "",
      },
      {
        id: 2,
        name: "X box series - 1TB Gaming all digital console",
        sku: "A264671",
        quantity: 1,
        unitPrice: 300.45,
        linePrice: 300.45,
        discount: 300.45,
        discountPercent: [2, 5],
        vat: 3.95,
        finalPrice: 300.45,
        serialNumber: "",
      },
    ],
    pricing: {
      cySupplierPrice: 0.85,
      subtotal: 600.45,
      discount: 600.45,
      adDiscount: 600.45,
      vat: 300.45,
      shipping: 300.45,
      total: 300.45,
    },
    shipping: {
      method: "Buy at store",
      company: "Mikoalla Panagiotou Limited",
    },
    payment: {
      method: "Cash",
    },
    discount: {
      value: 0.99,
      type: "Amount",
    },
  });

  return (
    <div className="container mx-auto px-4 lg:px-0">
      <div className="pb-8 sm:pb-12 pt-20">
        <div className="w-full mx-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-dark mb-12">
              Order Overview
            </h1>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-md">
            {/* Order Items Table */}
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-b">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-6 px-2 text-base font-bold text-primary uppercase tracking-wide">
                        ITEM
                      </th>
                      <th className="text-center py-6 px-2 text-base font-bold text-primary uppercase tracking-wide">
                        QUANTITY
                      </th>
                      <th className="text-center py-6 px-2 text-base font-bold text-primary uppercase tracking-wide">
                        UNIT PRICE
                      </th>
                      <th className="text-center py-6 px-2 text-base font-bold text-primary uppercase tracking-wide">
                        LINE PRICE
                      </th>
                      <th className="text-center py-6 px-2 text-base font-bold text-primary uppercase tracking-wide">
                        DISCOUNT
                      </th>
                      <th className="text-center py-6 px-2 text-base font-bold text-primary uppercase tracking-wide">
                        VAT (19%)
                      </th>
                      <th className="text-center py-6 px-2 text-base font-bold text-primary uppercase tracking-wide">
                        FINAL PRICE
                      </th>
                      <th className="text-center py-6 px-2 text-base font-bold text-primary uppercase tracking-wide">
                        SERIAL NUMBER
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.items.map((item, index) => (
                      <tr key={item.id} className="">
                        <td className="py-7 px-2">
                          <div className="flex items-center gap-3">
                            <CircleX
                              className="w-5 h-5 text-[#6E6E6E] font-black cursor-pointer"
                              onClick={() => removeItem(item.id)}
                            />
                            {/* Image */}
                            <div className="w-12 h-12 bg-gray-500 rounded-md flex items-center justify-center">
                              IMG
                            </div>
                            <div className="min-w-0">
                              <p className="text-lg font-bold text-dark mb-1">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                SKU code:{" "}
                                <span className="text-primary">{item.sku}</span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-7 px-2 text-center">
                          <span className="text-base text-[#6E6E6E] font-bold">
                            {item.quantity.toString().padStart(2, "0")}
                          </span>
                        </td>
                        <td className="py-7 px-2 text-center">
                          <span className="text-base text-[#6E6E6E] font-bold">
                            €{item.unitPrice.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-7 px-2 text-center">
                          <span className="text-base text-[#6E6E6E] font-bold">
                            €{item.linePrice.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-7 px-2 text-center">
                          <span className="text-base text-[#6E6E6E] font-bold">
                            €{item.discount.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-7 px-2 text-center space-x-2">
                          {item.discountPercent.map((percent) => (
                            <span
                              key={crypto.randomUUID()}
                              className="text-base text-[#6E6E6E] font-bold border rounded-sm px-2 py-1"
                            >
                              %{percent}
                            </span>
                          ))}
                        </td>
                        <td className="py-7 px-2 text-center">
                          <span className="text-base text-[#6E6E6E] font-bold  ">
                            €{item.vat.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-7 px-2 text-center">
                          <span className="text-base text-[#6E6E6E] font-bold">
                            €{item.finalPrice.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-7 px-2 text-center">
                          <button className="bg-primary text-white px-3 py-1 rounded font-bold hover:bg-primary-dark transition-colors text-base cursor-pointer hover:bg-primary/90">
                            Add
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pricing Summary */}
              <div className="mt-8 flex flex-col sm:gap-8 sm:pl-10">
                {/* Left side - Pricing breakdown */}
                <div className="">
                  <div className="flex justify-between items-center border-b border-gray-200 p-3 bg-blue-300">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide">
                      CY SUPPLIER PRICE
                    </span>
                    <span className="text-sm text-[#6E6E6E] font-bold">
                      €{orderData.pricing.cySupplierPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 p-3 bg-gray-200">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide">
                      SUBTOTAL
                    </span>
                    <span className="text-sm text-[#6E6E6E] font-bold">
                      €{orderData.pricing.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 p-3 bg-blue-300">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide">
                      DISCOUNT
                    </span>
                    <span className="text-sm text-[#6E6E6E] font-bold">
                      €{orderData.pricing.discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 p-3 bg-gray-200">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide">
                      AD. DISCOUNT
                    </span>
                    <span className="text-sm text-[#6E6E6E] font-bold">
                      €{orderData.pricing.adDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 p-3 bg-blue-300">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide">
                      VAT
                    </span>
                    <span className="text-sm text-[#6E6E6E] font-bold">
                      €{orderData.pricing.vat.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-200 p-3 bg-gray-200">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide">
                      SHIPPING
                    </span>
                    <span className="text-sm text-[#6E6E6E] font-bold">
                      €{orderData.pricing.shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 p-3 bg-blue-300">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide ">
                      TOTAL
                    </span>
                    <span className="text-sm text-[#6E6E6E] font-bold">
                      €{orderData.pricing.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right side - Shipping and Payment */}

          <div className="bg-white rounded-lg shadow-md mt-8">
            <div className="p-6">
              <div className="space-y-6 ">
                <div className="mt-8 flex flex-col gap-5 ">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide">
                      SHIPPING DETAILS
                    </span>
                    <span className="text-base font-bold text-[#6E6E6E]">
                      {orderData.shipping.method}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-primary uppercase tracking-wide">
                      SHIPPING TO
                    </span>
                    <span className="text-base text-[#6E6E6E] font-bold ">
                      {orderData.shipping.company}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4 border-b pb-4">
                <div className="flex items-center gap-2 justify-between">
                  <span className="font-bold">Payment method</span>
                  <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                    <option>{orderData.payment.method}</option>
                  </select>
                </div>
                <div className="font-bold">
                  <span className="font-medium">PRINT :</span> Check out at the
                  store and print invoice.
                </div>
                <div className="flex items-center gap-2 justify-between">
                  <span className="font-bold">Discount :</span>
                  <div className="space-x-2">
                    <span className=" text-dark border px-2 py-1 rounded">
                      {orderData.discount.value}
                    </span>
                    <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
                      <option>{orderData.discount.type}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Total :</span>
                </div>
                <div className="space-x-4">
                  <span className="text-lg font-bold text-primary">
                    €{orderData.pricing.total.toFixed(2)}
                  </span>
                  <button className="bg-white border border-primary text-primary px-4 py-2 rounded font-medium hover:bg-primary hover:text-white transition-colors cursor-pointer">
                    Print receipt
                  </button>
                  <button className="bg-primary text-white px-4 py-2 rounded font-medium hover:bg-primary transition-colors cursor-pointer">
                    Print invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
