"use client";

import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

export const suppliersColumns = (onDelete) => [
  {
    accessorKey: "id",
    header: () => <TableHeader>ID</TableHeader>,
    cell: ({ row }) => (
      <TableCell className={"text-[#0068C8]"}>
        {row.getValue("id")}
      </TableCell>
    ),
  },
  {
    accessorKey: "full_name",
    header: () => <TableHeader>Full name</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("full_name")}</TableCell>,
  },
  {
    accessorKey: "username",
    header: () => <TableHeader>Username</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("username")}</TableCell>,
  },
  {
    accessorKey: "email",
    header: () => <TableHeader>Email</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("email")}</TableCell>,
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
        if (!confirm("Are you sure you want to delete this supplier?")) return;
        try {
          const response = await apiFetch(`/api/admin/suppliers/delete/${row.original.id}`, {
            method: 'DELETE'
          });
          if (response.success) {
            toast.success("Supplier deleted successfully");
            onDelete && onDelete();
          }
        } catch (error) {
          toast.error("Failed to delete supplier");
        }
      };

      return (
        <TableCell className="flex justify-center gap-1 px-0">
          <Link
            className="flex-1"
            href={`/administrator/dashboard/users-management/suppliers/edit/${row.original.id}`}
          >
            <Button
              variant={"outline"}
              className={"font-medium w-full"}
              size={"sm"}
            >
              Edit
            </Button>
          </Link>
          <Button
            variant={"outline"}
            onClick={() => toast.info("View products coming soon")}
            size={"sm"}
            className={
              "border-[#179BD7] flex-1 text-[#179BD7] font-medium hover:bg-[#179BD7]"
            }
          >
            Products
          </Button>
          <Button
            variant={"outline"}
            onClick={handleDelete}
            size={"sm"}
            className={
              "border-red-600 flex-1 text-red-600 font-medium hover:bg-red-600"
            }
          >
            Delete
          </Button>
          <div
            className={
              " bg-transparent p-1 hover:bg-white border border-[#2B8EDF] rounded"
            }
          >
            <Checkbox className={"bg-white cursor-pointer"} />
          </div>
        </TableCell>
      );
    },
  },
];

export default suppliersColumns;
