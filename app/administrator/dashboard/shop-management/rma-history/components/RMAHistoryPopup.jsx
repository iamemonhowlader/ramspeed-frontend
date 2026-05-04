import { AlertDialogCancel } from "@/components/ui/alert-dialog";

import { useEffect } from "react";

export default function RMAHistoryPopup() {
  // Prevent background scrolling when popup is open
  useEffect(() => {
    // Disable body scroll
    document.body.style.overflow = "hidden";

    // Re-enable body scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Sample RMA history data
  const rmaHistory = [
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
    {
      ticketId: "5001",
      productName: "X box series - 1TB",
      customerName: "Mike Tyson",
      phoneNumber: "03498373838",
      repairCost: "€ 300.45",
      issue: "SYSTEM PROBLEM",
      reportStatus: "WAITING FOR PARTS",
      dateTime: "9/9/24 - 10:30 AM",
    },
  ];

  return (
    <div className="overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-4 flex-shrink-0">
        <h1 className="text-2xl font-bold text-dark">
          RMA <span className="text-primary">History</span>
        </h1>
      </div>

      {/* Table Container with scroll */}
      <div className="overflow-x-auto overflow-y-auto  flex-1 min-h-0">
        <table className="w-full min-w-max text-sm font-semibold text-center">
          <thead className="bg-gray-50 sticky top-0 z-10 ">
            <tr className="text-center">
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider">
                Ticket ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider ">
                Product name
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider ">
                Customer name
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider ">
                Phone number
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider ">
                Repair cost
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider ">
                Issue
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider ">
                Report status
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider ">
                Details
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider ">
                Options
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-primary uppercase tracking-wider ">
                Date & time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white ">
            {rmaHistory.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="whitespace-nowrap border-2 border-transparent">
                  <span className="px-4 py-3 text-primary font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full">
                    {item.ticketId}
                  </span>
                </td>
                <td className="whitespace-nowrap border-2 border-transparent">
                  <span className="px-4 py-3 font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full">
                    {item.productName}
                  </span>
                </td>
                <td className="whitespace-nowrap border-2 border-transparent">
                  <span className="px-4 py-3 font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full">
                    {item.customerName}
                  </span>
                </td>
                <td className="whitespace-nowrap border-2 border-transparent">
                  <span className="px-4 py-3 font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full">
                    {item.phoneNumber}
                  </span>
                </td>
                <td className="whitespace-nowrap border-2 border-transparent">
                  <span className="px-4 py-3 text-primary font-bold cursor-pointer inline-block border-1 rounded-md h-full w-full">
                    {item.repairCost}
                  </span>
                </td>
                <td className="whitespace-nowrap border-2 border-transparent">
                  <span className="px-4 py-3 font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full">
                    <span className="bg-[#f6c9cb] text-[#DD2831] px-4 py-3 rounded-xl">
                      {" "}
                      {item.issue}
                    </span>
                  </span>
                </td>
                <td className="whitespace-nowrap border-2 border-transparent">
                  <span className="px-4 py-3 font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full">
                    <span className="bg-[#d6e0f5] text-primary px-4 py-3 rounded-xl">
                      {item.reportStatus}
                    </span>
                  </span>
                </td>
                <td className="whitespace-nowrap border-2 border-transparent">
                  <button className="px-4 py-3 font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full">
                    View
                  </button>
                </td>
                <td className="whitespace-nowrap border-2 border-transparent">
                  <div className="flex space-x-2 px-4 py-3  font-medium cursor-pointer border-1 rounded-md h-full w-full">
                    <button className="text-primary hover:text-primary/90 text-sm">
                      Print RMA
                    </button>
                    <button className="text-primary hover:text-primary/90 text-sm">
                      Print ticket
                    </button>
                    <button className="text-primary hover:text-primary/90 text-sm">
                      Print RMA
                    </button>
                  </div>
                </td>
                <td className="whitespace-nowrap border-2 border-transparent">
                  <span className="px-4 py-3 font-medium cursor-pointer inline-block border-1 rounded-md h-full w-full">
                    {item.dateTime}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with Close Button */}
      <div className="flex justify-end mt-6 px-4 flex-shrink-0">
        <AlertDialogCancel className="px-6 py-2 text-white rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer hover:text-white transition">
          Close
        </AlertDialogCancel>
      </div>
    </div>
  );
}
