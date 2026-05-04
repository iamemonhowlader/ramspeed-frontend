"use client";

import { Check, ChevronsDown, ChevronsUp, X } from "lucide-react";
import { cn } from "@/lib/utils";
import NestedIcon from "@/components/svg/NestedIcon";
import Link from "next/link";
import notImplemented from "@/lib/notImplemented";

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

      // Calculate left padding based on level (e.g., 20px per level)
      const paddingLeft = level * 40;

      return (
        <TableCell className={"lg:pl-15 "}>
          <div
            className={`flex items-center ${level === 2 ? "pl-10" : ""} `}
            // style={{ paddingLeft: `${paddingLeft}px` }}
          >
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

      return (
        <TableCell
          className={`flex items-center justify-center font-semibold ${
            type === "Category"
              ? "text-[#69A200] border-[#69A200]"
              : "text-[#FFBB38] border-[#FFBB38]"
          }`}
        >
          {type}
        </TableCell>
      );
    },
  },
  {
    accessorKey: "active",
    header: () => <TableHeader>Active</TableHeader>,
    cell: ({ row }) => {
      const active = row.getValue("active");

      return (
        <TableCell
          className={`flex items-center justify-center font-semibold ${
            active === true
              ? "text-[#69A200] border-[#69A200]"
              : "text-red-400 border-red-600"
          }`}
        >
          {!!active ? (
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
      return (
        <div className="flex items-center">
          {/* add  */}
          <TableCell
            onClick={() => notImplemented()}
            className={"flex-1 cursor-pointer flex items-center justify-center"}
          >
            <p className="bg-[#FF6B9C] text-white rounded-full px-2 ">Add</p>
          </TableCell>

          {/* manage  */}
          <Link
            href={"/administrator/dashboard/manage-products"}
            className="flex-2 "
          >
            <TableCell
              className={
                "text-white hover:text-[#0068C8]  transition-ease-in-out bg-[#0068C8] hover:bg-white border-[#0068C8] transition-ease-in-out flex items-center justify-center"
              }
            >
              Manage products
            </TableCell>
          </Link>

          {/* edit  */}
          <Link
            href={`/administrator/dashboard/menu-products/edit/${row.original.id}`}
            className="flex-1"
          >
            <TableCell
              className={
                "text-white hover:text-[#068909]  transition-ease-in-out bg-[#068909] hover:bg-white border-[#068909] flex items-center justify-center"
              }
            >
              Edit
            </TableCell>
          </Link>

          {/* delete  */}
          <TableCell
            onClick={() => notImplemented()}
            className={
              "flex-1 cursor-pointer text-white hover:text-[#DD2831] hover:bg-white bg-[#DD2831] transition-ease-in-out border-[#DD2831] flex items-center justify-center"
            }
          >
            Delete
          </TableCell>
        </div>
      );
    },
  },
];
