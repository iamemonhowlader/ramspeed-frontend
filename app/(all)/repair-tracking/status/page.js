"use client";

import Image from "next/image";
import { useMemo } from "react";

export default function RepairTrackingStatus() {
  // Demo data to mirror the provided design
  const items = useMemo(
    () => [
      {
        id: 1,
        name: "X box series - 1TB Gaming",
        subtitle: "all digital console",
        image: "/controller.png",
        costEUR: 300.45,
        issue: "SYSTEM PROBLEM",
        status: "WAITING FOR PARTS",
      },
      {
        id: 2,
        name: "X box series - 1TB Gaming",
        subtitle: "all digital console",
        image: "/playstation.png",
        costEUR: 300.45,
        issue: "CIRCUIT ISSUE",
        status: "IN PROGRESS",
      },
      {
        id: 3,
        name: "Sam sung galaxy",
        subtitle: "A83",
        image: "/samsung.png",
        costEUR: 300.45,
        issue: "BROKEN DISPLAY",
        status: "READY FOR PICKUP",
      },
      {
        id: 4,
        name: "X box series - 1TB Gaming",
        subtitle: "all digital console",
        image: "/controller.png",
        costEUR: 300.45,
        issue: "SYSTEM PROBLEM",
        status: "WAITING FOR PARTS",
      },
      {
        id: 5,
        name: "X box series - 1TB Gaming",
        subtitle: "all digital console",
        image: "/playstation.png",
        costEUR: 300.45,
        issue: "CIRCUIT ISSUE",
        status: "IN PROGRESS",
      },
      {
        id: 6,
        name: "Sam sung galaxy",
        subtitle: "A83",
        image: "/samsung.png",
        costEUR: 300.45,
        issue: "BROKEN DISPLAY",
        status: "READY FOR PICKUP",
      },
    ],
    []
  );

  const statusClasses = (status) => {
    switch (status) {
      case "WAITING FOR PARTS":
        return "bg-blue-100 text-blue-600";
      case "IN PROGRESS":
        return "bg-pink-100 text-pink-600";
      case "READY FOR PICKUP":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 ";
    }
  };

  const issueClasses = () => {
    // All issues appear in a soft-red pill in the design
    return "bg-[#f6c9cb] text-[#DD2831]";
  };

  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <h2 className="text-3xl font-black text-black mb-6">
              Repair Status of product
            </h2>

            {/* Card */}
            <div className="w-full rounded-2xl border border-[#efeeeb] overflow-hidden bg-white p-9">
              {/* Desktop Table */}
              <div className="hidden md:block">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="border-b border-[#efeeeb] text-[#424242]">
                      <tr>
                        <th className="text-left px-6 py-4 text-lg font-semibold  w-5/12">
                          Product Name
                        </th>
                        <th className="text-left px-6 py-4 text-lg font-semibold  w-2/12">
                          Repair cost
                        </th>
                        <th className="text-left px-6 py-4 text-lg font-semibold  w-2/12">
                          Issue
                        </th>
                        <th className="text-left px-6 py-4 text-lg font-semibold  w-3/12">
                          Repair Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-[#efefef] last:border-b-0"
                        >
                          {/* Product */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <Image
                                src={item.image}
                                alt={item.name}
                                className="h-12 w-12 rounded-md object-contain"
                                width={48}
                                height={48}
                              />
                              <div className="leading-tight">
                                <p className="text-sm sm:text-lg font-semibold text-black">
                                  {item.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          {/* Cost */}
                          <td className="px-6 py-4 text-primary sm:text-lg font-semibold whitespace-nowrap">
                            € {item.costEUR.toFixed(2)}
                          </td>
                          {/* Issue */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-4 py-2 rounded-xl text-xs text-[DD2831] font-semibold ${issueClasses()}`}
                            >
                              {item.issue}
                            </span>
                          </td>
                          {/* Status */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center  px-4 py-2 rounded-xl text-xs  font-semibold ${statusClasses(
                                item.status
                              )}`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile List (Cards) */}
              <div className="md:hidden divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-md object-contain"
                        width={48}
                        height={48}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-black">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                      </div>
                      <div className="text-primary font-semibold whitespace-nowrap">
                        € {item.costEUR.toFixed(2)}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${issueClasses()}`}
                      >
                        {item.issue}
                      </span>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusClasses(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center py-6">
              <div className="flex items-center gap-6">
                <button
                  aria-label="Previous"
                  className="h-12 w-12 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  aria-label="Next"
                  className="h-12 w-12 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
