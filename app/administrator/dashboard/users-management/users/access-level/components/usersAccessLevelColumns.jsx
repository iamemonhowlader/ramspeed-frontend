"use client";

import { cn } from "@/lib/utils";
import { Check, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

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

const PermissionCell = ({ value }) => {
  const isActive = value === "1" || value === 1 || value === "yes";
  return (
    <TableCell className={isActive ? "border-green-400" : "border-gray-200 opacity-50"}>
      {isActive ? <Check size={14} color="green" /> : <X size={14} color="gray" />}
    </TableCell>
  );
};

export const usersAccessLevelColumns = (onDelete) => [
  {
    accessorKey: "id",
    header: () => <TableHeader>ID</TableHeader>,
    cell: ({ row }) => <TableCell>{row.getValue("id")}</TableCell>,
  },
  {
    id: "fullName",
    header: () => <TableHeader>User Name</TableHeader>,
    cell: ({ row }) => <TableCell>{row.original.user?.full_name || "N/A"}</TableCell>,
  },
  {
    accessorKey: "members",
    header: () => <TableHeader>Members</TableHeader>,
    cell: ({ row }) => <PermissionCell value={row.getValue("members")} />,
  },
  {
    accessorKey: "news",
    header: () => <TableHeader>News</TableHeader>,
    cell: ({ row }) => <PermissionCell value={row.getValue("news")} />,
  },
  {
    accessorKey: "shipping",
    header: () => <TableHeader>Shipping</TableHeader>,
    cell: ({ row }) => <PermissionCell value={row.getValue("shipping")} />,
  },
  {
    accessorKey: "suppliers",
    header: () => <TableHeader>Suppliers</TableHeader>,
    cell: ({ row }) => <PermissionCell value={row.getValue("suppliers")} />,
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row }) => {
      const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this access level?")) return;
        try {
          const response = await apiFetch(`/api/admin/access-levels/delete/${row.original.id}`, {
            method: 'DELETE'
          });
          if (response.success) {
            toast.success("Access level deleted");
            onDelete && onDelete();
          }
        } catch (error) {
          toast.error("Failed to delete");
        }
      };

      return (
        <TableCell className="flex justify-center gap-1 px-0">
          <Link
            className="flex-1"
            href={`/administrator/dashboard/users-management/users/access-level/edit/${row?.original?.id}`}
          >
            <Button variant={"outline"} className={"font-medium w-full"} size={"sm"}>
              Edit
            </Button>
          </Link>
          <Button
            variant={"outline"}
            onClick={handleDelete}
            size={"sm"}
            className="border-red-600 flex-1 text-red-600 font-medium hover:bg-red-600"
          >
            Delete
          </Button>
        </TableCell>
      );
    },
  },
];

export default usersAccessLevelColumns;