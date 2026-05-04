"use client";

import { Check, ChevronsDown, ChevronsUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NestedIcon from "@/components/svg/NestedIcon";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

const TableHeader = ({ children }) => {
  return (
    <div className="bg-[#F7F8F9] h-8 lg:h-10 border m-[1px] border-[#E8E8E8] px-2 flex items-center  text-[#0068C8] font-bold text-base xl:text-xl justify-center">
      {children}
    </div>
  );
};

const TableCell = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "h-8 lg:h-10 px-4 border border-[#E8E8E8] flex items-center m-[1px] rounded-md text-xs xl:text-base",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const menuProductsColumns = [
  {
    id: "serial",
    header: () => <TableHeader>Serial</TableHeader>,
    cell: () => {
      return (
        <TableCell className="flex items-center justify-center">
          <ChevronsUp color="#179BD7" size={10} className="scale-150" />
          <ChevronsDown color="#179BD7" size={10} className="scale-150" />
        </TableCell>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <TableHeader>Name</TableHeader>,
    cell: ({ row }) => {
      const level = row.original.level;
      const name = row.getValue("name");

      return (
        <TableCell className={"lg:pl-15 "}>
          <div className={`flex items-center ${level === 2 ? "pl-10" : ""} `}>
            {level > 0 && (
              <NestedIcon className={"scale-50 lg:scale-70 -mt-3"} />
            )}
            <span className="font-semibold text-[#596464]">{name}</span>
          </div>
        </TableCell>
      );
    },
  },
  {
    accessorKey: "type",
    header: () => <TableHeader>Type</TableHeader>,
    cell: ({ row }) => {
      const type = row.getValue("type");
      const typeLabel = type == 1 ? "Category" : type == 4 ? "Listing" : "Other";

      return (
        <TableCell
          className={`flex items-center justify-center font-semibold ${
            type == 1
              ? "text-[#69A200] border-[#69A200]"
              : "text-[#FFBB38] border-[#FFBB38]"
          }`}
        >
          {typeLabel}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "active_page",
    header: () => <TableHeader>Active</TableHeader>,
    cell: ({ row }) => {
      const active = row.getValue("active_page") === 'yes';

      return (
        <TableCell
          className={`flex items-center justify-center font-semibold ${
            active === true
              ? "text-[#69A200] border-[#69A200]"
              : "text-red-400 border-red-600"
          }`}
        >
          {active ? (
            <Check size={10} className="scale-150" />
          ) : (
            <X size={10} className="scale-150" />
          )}
        </TableCell>
      );
    },
  },
  {
    id: "options",
    header: () => <TableHeader>Options</TableHeader>,
    cell: ({ row }) => {
      const { id, type } = row.original;

      const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this menu item?")) {
          try {
            const response = await apiFetch(`/api/admin/menu/delete/${id}`, {
              method: "DELETE",
            });
            if (response.success) {
              toast.success("Menu item deleted!");
              window.location.reload();
            }
          } catch (error) {
            toast.error(error.message || "Failed to delete");
          }
        }
      };

      return (
        <div className="flex items-center">
          {/* add - only for categories/listing (1, 2, 4) */}
          {(type == 1 || type == 2 || type == 4) && (
            <Link
              href={`/administrator/dashboard/menu-products/add?parent=${id}`}
              className={"flex-1 cursor-pointer flex items-center justify-center"}
            >
              <TableCell className="w-full h-full flex items-center justify-center">
                <p className="bg-[#FF6B9C] text-white rounded-full px-2">Add</p>
              </TableCell>
            </Link>
          )}

          {/* manage - only for product listing (4) */}
          {type == 4 && (
            <Link
              href={`/administrator/dashboard/manage-products?Category=${id}`}
              className="flex-2 "
            >
              <TableCell
                className={
                  "text-white hover:text-[#0068C8] bg-[#0068C8] hover:bg-white border-[#0068C8] transition-all flex items-center justify-center whitespace-nowrap px-4"
                }
              >
                Manage products
              </TableCell>
            </Link>
          )}

          {/* edit */}
          <Link
            href={`/administrator/dashboard/menu-products/edit/${id}`}
            className="flex-1"
          >
            <TableCell
              className={
                "text-white hover:text-[#068909] bg-[#068909] hover:bg-white border-[#068909] transition-all flex items-center justify-center px-4"
              }
            >
              Edit
            </TableCell>
          </Link>

          {/* delete */}
          <TableCell
            onClick={handleDelete}
            className={
              "flex-1 cursor-pointer text-white hover:text-[#DD2831] hover:bg-white bg-[#DD2831] transition-all border-[#DD2831] flex items-center justify-center px-4"
            }
          >
            Delete
          </TableCell>
        </div>
      );
    },
  },
];
