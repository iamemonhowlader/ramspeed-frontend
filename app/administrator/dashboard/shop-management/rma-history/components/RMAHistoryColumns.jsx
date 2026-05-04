"use client";

import { cn } from "@/lib/utils";
import BadgeTable from "@/components/common/BadgeTable";
import notImplemented from "@/lib/notImplemented";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/utils/formatDate";
import { convertTo24Hour } from "@/utils/formatTime";
import Link from "next/link";

// Table UI helpers
const TableHeader = ({ children, className }) => (
  <div
    className={cn(
      "bg-[#F7F8F9] border border-[#E8E8E8] py-3 flex items-center text-[#0068C8] font-bold text-base xl:text-xl justify-center px-1 m-[1px]",
      className
    )}
  >
    {children}
  </div>
);

const TableCell = ({ children, className, wrap = false, ...props }) => (
  <div
    className={cn(
      "border border-[#E8E8E8] py-3 flex items-center h-8 justify-center px-3 text-[#191D23]",
      wrap && "break-words whitespace-normal",
      "font-semibold text-[16px] rounded-[8px] m-[1px]",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const RMAHistoryColumns = [
  {
    accessorKey: "ticketId",
    header: () => <TableHeader>Ticket ID</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-[#008ECC]"}>
        {row.getValue("ticketId")}
      </TableCell>
    ),
  },
  {
    accessorKey: "productName",
    header: () => <TableHeader>Product Name</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("productName")}</TableCell>,
  },
  {
    accessorKey: "customerName",
    header: () => <TableHeader>Customer Name</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("customerName")}</TableCell>,
  },
  {
    accessorKey: "phoneNumber",
    header: () => <TableHeader>Phone Number</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("phoneNumber")}</TableCell>,
  },
  {
    accessorKey: "repairCost",
    header: () => <TableHeader>Repair Cost</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-[#008ECC]"}>
        {row.getValue("repairCost")}
      </TableCell>
    ),
  },
  {
    accessorKey: "issue",
    header: () => <TableHeader>Issue</TableHeader>,
    cell: ({ row }) => {
      const issue = row.getValue("issue");
      const delivered = row?.original?.delivered;
      return (
        <TableCell className={delivered ? "bg-green-50" : ""}>
          <BadgeTable className="bg-red-50 text-[#DD2831] border border-red-200 font-semibold rounded-[8px] px-3 py-1 text-xs">
            {issue}
          </BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "repairStatus",
    header: () => <TableHeader>Repair Status</TableHeader>,
    cell: ({ row }) => {
      const delivered = row?.original?.delivered;
      const status = row.getValue("repairStatus");

      // Tailwind/utility color sets for clarity & polish
      const baseClasses =
        "font-semibold rounded-[8px] px-3 py-1 text-xs transition";
      const deliveredClasses =
        "bg-green-100 text-green-700 border border-green-300";
      const inProgressClasses =
        "bg-blue-50 text-blue-700 border border-blue-200";

      return (
        <TableCell>
          <BadgeTable
            className={`
            ${baseClasses} 
            ${delivered ? deliveredClasses : inProgressClasses}
          `}
          >
            {delivered ? "Delivered" : status}
          </BadgeTable>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "dateTime",
    header: () => <TableHeader>Date & time</TableHeader>,
    cell: ({ row }) => {
      const dateTimeArray = row.getValue("dateTime").split(" - ");
      const date = formatDate(dateTimeArray[0]);
      const time = convertTo24Hour(dateTimeArray[1]);
      return (
        <TableCell>
          <BadgeTable className="font-bold">
            {date} - {time}
          </BadgeTable>
        </TableCell>
      );
    },
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row, column }) => {
      const { rmaHistory, setRmaHistory } = column?.columnDef?.meta;
      const delivered = row?.original?.delivered;
      const ticketId = row?.original?.ticketId;

      const handleDelivered = async (status) => {
        try {
          const response = await apiFetch(`/api/admin/rma-history/toggle-delivered/${row.original.id}`, {
            method: "POST",
            body: JSON.stringify({ delivered: status }),
          });
          if (response.success) {
            const newRmaHistory = rmaHistory.map((history) => {
              if (history.id === row.original.id) {
                return { ...history, delivered: status };
              }
              return history;
            });
            setRmaHistory(newRmaHistory);
          }
        } catch (error) {
          console.error("Failed to update status:", error);
        }
      };

      return (
        <TableCell className="flex justify-center gap-1  px-0">
          <Link
            href={`/administrator/dashboard/shop-management/rma-history/${row.original.id}`}
          >
            <Button
              variant={"outline"}
              className={
                "font-medium  text-white hover:text-primary bg-primary hover:bg-white flex-1"
              }
              size={"sm"}
            >
              Edit
            </Button>
          </Link>

          {/* print RMA */}
          <Button
            variant={"outline"}
            onClick={() => notImplemented()}
            size={"sm"}
            className={
              "border-[#179BD7]  flex-1 text-white hover:text-[#179BD7] font-medium hover:bg-white bg-[#179BD7]"
            }
          >
            Print RMA
          </Button>

          {/* print ticket  */}
          <Button
            variant={"outline"}
            onClick={() => notImplemented()}
            size={"sm"}
            className={
              "border-[#006fd7]  flex-1 text-white hover:text-[#006fd7] font-medium hover:bg-white bg-[#006fd7]"
            }
          >
            Print Ticket
          </Button>

          {/* checkbox  */}
          <div
            className={` p-1.5 border-[#0068C8] bg-white border rounded-md flex items-center justify-center`}
          >
            <Checkbox
              onCheckedChange={handleDelivered}
              className={"cursor-pointer"}
              checked={delivered}
            />
          </div>
        </TableCell>
      );
    },
  },
];

export default RMAHistoryColumns;
