"use client";

import { cn } from "@/lib/utils";
import BadgeTable from "@/components/common/BadgeTable";
import { Check, X, History, CreditCard } from "lucide-react";
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

export const clientsColumn = (onDelete) => [
  {
    accessorKey: "id",
    header: () => <TableHeader>ID</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-primary"}>{row.getValue("id")}</TableCell>
    ),
  },
  {
    accessorKey: "full_name",
    header: () => <TableHeader>Full name</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("full_name")}</TableCell>,
  },
  {
    accessorKey: "address",
    header: () => <TableHeader>Address</TableHeader>,
    cell: ({ row }) => {
      const address = row.original.address;
      const city = row.original.city;
      return <TableCell>{address}{address && city ? ", " : ""}{city}</TableCell>;
    },
  },
  {
    accessorKey: "balance",
    header: () => <TableHeader>Balance</TableHeader>,
    cell: ({ row }) => (
      <TableCell>
        <BadgeTable className={row.getValue("balance") > 0 ? "bg-red-100 text-red-600" : ""}>
          € {Number(row.getValue("balance")).toFixed(2)}
        </BadgeTable>
      </TableCell>
    ),
  },
  {
    accessorKey: "active",
    header: () => <TableHeader>Active</TableHeader>,
    cell: ({ row }) => {
      const active = row.getValue("active");
      const isActive = active === "yes" || active === 1 || active === true;
      return (
        <TableCell
          className={`${isActive ? "border-green-400" : "border-red-600"}`}
        >
          {isActive ? (
            <Check size={14} color="green" />
          ) : (
            <X size={14} color="red" />
          )}
        </TableCell>
      );
    },
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row }) => {
      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this client?")) return;
        try {
          const response = await apiFetch(`/api/admin/members/delete/${row.original.id}`, {
            method: 'DELETE'
          });
          if (response.success) {
            toast.success("Client deleted successfully");
            onDelete && onDelete();
          }
        } catch (error) {
          toast.error("Failed to delete client");
        }
      };

      return (
        <TableCell className="flex justify-center gap-1 px-0">
          <Link
            className="flex-1"
            href={`/administrator/dashboard/users-management/members/edit/${row.original.id}`}
          >
            <Button variant="outline" className="font-medium w-full" size="sm">
              Edit
            </Button>
          </Link>
          
          <Button
            variant="outline"
            onClick={handleDelete}
            size="sm"
            className="border-red-600 flex-1 text-red-600 font-medium hover:bg-red-600"
          >
            Delete
          </Button>
        </TableCell>
      );
    },
  },
];

export default clientsColumn;
