"use client";

import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

// Table UI helpers
const TableHeader = ({ children, className }) => (
  <div
    className={cn(
      "bg-[#F7F8F9] border border-[#E8E8E8] py-3 flex items-center text-[#0068C8] font-bold text-base xl:text-xl  justify-center px-1 m-[1px]",
      className
    )}
  >
    {children}
  </div>
);

const TableCell = ({ children, className, wrap = false, ...props }) => (
  <div
    className={cn(
      "border border-[#E8E8E8] py-3 flex items-center h-8 justify-center px-3 text-xs text-[#191D23]",
      wrap && "break-words whitespace-normal",
      "font-semibold text-[12px] rounded-[8px] m-[1px]",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export const B2BCustomerColumns = (onUpdate) => [
  {
    accessorKey: "id",
    header: () => <TableHeader>ID</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-[#0068C8]"}>{row.getValue("id")}</TableCell>
    ),
  },
  {
    accessorKey: "full_name",
    header: () => <TableHeader>Customer name</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("full_name")}</TableCell>,
  },
  {
    accessorKey: "email",
    header: () => <TableHeader>Email address</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("email")}</TableCell>,
  },
  {
    accessorKey: "phone",
    header: () => <TableHeader>Phone number</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("phone")}</TableCell>,
  },
  {
    accessorKey: "company_reg_num",
    header: () => <TableHeader>Reg Number</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("company_reg_num")}</TableCell>,
  },
  {
    accessorKey: "country",
    header: () => <TableHeader>Country</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("country")}</TableCell>,
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row }) => {
      const handleToggle = async (status) => {
        try {
          const response = await apiFetch(`/api/admin/members/toggle-b2b-approval/${row.original.id}`, {
            method: 'POST'
          });
          if (response.success) {
            toast.success(`B2B Customer status updated`);
            onUpdate && onUpdate();
          }
        } catch (error) {
          toast.error("Failed to update status");
        }
      };

      return (
        <TableCell className="flex justify-center gap-1 px-0">
          <Link
            className="flex-1"
            href={`/administrator/dashboard/users-management/members/edit/${row.original.id}`}
          >
            <Button
              variant={"outline"}
              className={
                "border-[#E05D00] flex-1 text-[#E05D00] bg-[#FFF5E6] font-medium  w-full hover:bg-[#E05D00] hover:text-white"
              }
              size={"sm"}
            >
              Details
            </Button>
          </Link>

          {row.original.b2b_approved !== 'yes' ? (
            <Button
              variant={"outline"}
              onClick={() => handleToggle('yes')}
              size={"sm"}
              className={
                "border-[#0068C8] flex-1 text-[#0068C8] bg-[#D9EDFF] font-medium hover:bg-[#0068C8] hover:text-white"
              }
            >
              Activate
            </Button>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => handleToggle('no')}
              size={"sm"}
              className={
                "border-red-600 flex-1 text-red-600 font-medium hover:bg-red-600"
              }
            >
              Decline
            </Button>
          )}
        </TableCell>
      );
    },
  },
];

export default B2BCustomerColumns;
