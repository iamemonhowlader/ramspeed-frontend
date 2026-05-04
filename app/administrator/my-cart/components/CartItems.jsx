"use client";
import { CircleX, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CartItems() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "X box series - 1TB Gaming all digital console",
      sku: "A264671",
      unitPrice: 300.45,
      quantity: 1,
    },
    {
      id: 2,
      name: "X box series - 1TB Gaming all digital console",
      sku: "A264671",
      unitPrice: 300.45,
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  return (
    <div className="gap-8 flex flex-col">
      <div className="bg-white rounded-lg border border-[#dddddd] overflow-hidden shadow-md">
        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="">
                <th className="px-6 py-4 text-left text-primary font-black ">
                  ITEM
                </th>
                <th className="px-6 py-4 text-left text-primary font-black ">
                  UNIT PRICE
                </th>
                <th className="px-6 py-4 text-left text-primary font-black ">
                  QUANTITY
                </th>
                <th className="px-6 py-4 text-right text-primary font-black ">
                  LINE PRICE
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#dddddd] ">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <CircleX
                        className="w-5 h-5 text-[#929fa5] font-black cursor-pointer"
                        onClick={() => removeItem(item.id)}
                      />
                      <img
                        src="https://via.placeholder.com/50"
                        alt="Xbox"
                        className="w-12 h-12 rounded"
                      />
                      <div>
                        <p className="text-lg font-medium text-black">
                          {item.name}
                        </p>
                        <p className="text-xs text-[#6E6E6E]">
                          SKU code:{" "}
                          <span className="text-primary font-bold">
                            {item.sku}
                          </span>{" "}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[#6E6E6E]">
                      €{item.unitPrice.toFixed(2)}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-[#6E6E6E]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus size={16} className="" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity.toString().padStart(2, "0")}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus size={16} className="" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-[#6E6E6E]">
                    <p className="text-sm font-medium ">
                      €{(item.unitPrice * item.quantity).toFixed(2)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4 p-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3 justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <img
                    src="https://via.placeholder.com/50"
                    alt="Xbox"
                    className="w-12 h-12 rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-black">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 hover:bg-red-50 rounded text-red-600 flex-shrink-0"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs mb-1">Unit Price</p>
                  <p className="text-sm font-medium text-[#6E6E6E]">
                    €{item.unitPrice.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Line Price</p>
                  <p className="font-medium ">
                    €{(item.unitPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-gray-500 text-xs mb-5">Quantity</p>
                <div className="flex items-center gap-2 w-fit">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Minus size={16} className="" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">
                    {item.quantity.toString().padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <Plus size={16} className="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className=" px-4 sm:px-6 py-5 md:py-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-primary font-black ">SUBTOTAL</p>
            <p className="text-lg md:text-base font-semibold text-[#6E6E6E]">
              €{subtotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-full flex flex-col sm:flex-row gap-6">
        <div className=" bg-white rounded-lg border border-[#dddddd] overflow-hidden shadow-md flex-1">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#dddddd]">
                  <th className="px-6 py-4 text-left text-primary font-black uppercase">
                    Services
                  </th>
                  <th className="px-6 py-4 text-right text-primary font-black uppercase">
                    Shopping Cost
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Buy at store", price: 99.99 },
                  { name: "Akis Express (Pickup from office)", price: 149.99 },
                  { name: "Akis Express (Door to Door)", price: 199.99 },
                ].map((service) => (
                  <tr
                    key={service.name}
                    className="border-b border-[#dddddd] cursor-pointer hover:bg-gray-50"
                    onClick={(e) => {
                      const radio = e.currentTarget.querySelector(
                        'input[type="radio"]'
                      );
                      if (radio) radio.checked = true;
                      /* handle radio selection logic here */
                    }}
                  >
                    <td className="px-6 py-4 text-[#6E6E6E] flex items-center gap-3">
                      <input
                        type="radio"
                        name="service"
                        value={service.name}
                        className="accent-primary"
                      />
                      <span className="w-12 h-12  bg-[#6E6E6E] inline-block"></span>
                      <span className="cursor-pointer">{service.name}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-[#6E6E6E]">
                      <p className="text-sm font-medium">
                        ${service.price.toFixed(2)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-4 flex gap-2">
              <button className="bg-white hover:bg-primary/90 hover:text-white text-primary border border-primary px-3 sm:px-4 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg font-medium transition-colors text-sm sm:text-xs md:text-md uppercase tracking-wide cursor-pointer w-1/2">
                empty card
              </button>
              <button className="bg-primary hover:bg-primary/90 text-white px-3 sm:px-4 md:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg font-medium transition-colors text-sm sm:text-xs md:text-md uppercase border border-primary tracking-wide cursor-pointer w-1/2">
                Check out
              </button>
            </div>
          </div>
          {/* <div className="md:hidden p-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-[#6E6E6E]">Service 1</span>
                <span className="font-medium text-[#6E6E6E]">$99.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6E6E]">Service 2</span>
                <span className="font-medium text-[#6E6E6E]">$149.99</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6E6E]">Service 3</span>
                <span className="font-medium text-[#6E6E6E]">$199.99</span>
              </div>
            </div>
          </div> */}
        </div>
        <div className="bg-white rounded-lg border border-[#dddddd] overflow-hidden shadow-md h-auto flex-1">
          {/* Shipping cost */}
          <div className="px-6 py-4 flex gap-6">
            <div className="text-primary text-sm uppercase font-black flex justify-between w-full">
              <span>Shipping cost</span>
              <span className="text-[#6E6E6E]">€10.00</span>
            </div>
          </div>
          {/* Shipping cost */}
          <div className="px-6 py-4 flex gap-6">
            <div className="text-primary text-sm uppercase font-black flex justify-between w-full">
              <span>Tax fee</span>
              <span className="text-[#6E6E6E]">€10.00</span>
            </div>
          </div>
          {/* Shipping cost */}
          <div className="px-6 py-4 flex gap-6">
            <div className="text-primary text-sm uppercase font-black flex justify-between w-full">
              <span>Order total</span>
              <span className="text-[#6E6E6E]">€10.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
