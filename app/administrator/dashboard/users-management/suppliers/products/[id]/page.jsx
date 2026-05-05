"use client";

import DashboardHeading from "@/app/administrator/dashboard/components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { Check, X, Plus, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

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

const SupplierProducts = ({ params }) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [supplierName, setSupplierName] = useState("");

  const fetchSupplierProducts = async () => {
    setLoading(true);
    try {
      // First get supplier info
      const supplierResponse = await apiFetch(`/api/admin/suppliers/${resolvedParams.id}`);
      if (supplierResponse.success) {
        setSupplierName(supplierResponse.data.full_name || supplierResponse.data.name || 'Unknown');
      }

      // Then get products for this supplier
      const response = await apiFetch(`/api/admin/products?supplier_id=${resolvedParams.id}&search=${search}`);
      if (response.success) {
        setData(response.data.data || response.data);
      }
    } catch (error) {
      console.error("Failed to fetch supplier products:", error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplierProducts();
  }, [resolvedParams.id, search]);

  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const response = await apiFetch(`/api/admin/products/delete/${productId}`, {
        method: 'DELETE'
      });
      if (response.success) {
        toast.success("Product deleted successfully");
        fetchSupplierProducts();
      } else {
        toast.error(response.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleToggleProductStatus = async (productId, currentStatus) => {
    try {
      const newStatus = currentStatus === "yes" || currentStatus === 1 ? "no" : "yes";
      const response = await apiFetch(`/api/admin/products/update/${productId}`, {
        method: 'POST',
        body: JSON.stringify({ active: newStatus })
      });
      
      if (response.success) {
        toast.success(`Product ${newStatus === "yes" ? "activated" : "deactivated"} successfully`);
        fetchSupplierProducts();
      } else {
        toast.error(response.message || "Failed to update product");
      }
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  const productsColumns = [
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
      accessorKey: "name",
      header: () => <TableHeader>Product Name</TableHeader>,
      cell: ({ row }) => <TableCell>{row.getValue("name")}</TableCell>,
    },
    {
      accessorKey: "sku",
      header: () => <TableHeader>SKU</TableHeader>,
      cell: ({ row }) => <TableCell>{row.getValue("sku") || "N/A"}</TableCell>,
    },
    {
      accessorKey: "price",
      header: () => <TableHeader>Price</TableHeader>,
      cell: ({ row }) => <TableCell>€{row.getValue("price") || "0.00"}</TableCell>,
    },
    {
      accessorKey: "stock",
      header: () => <TableHeader>Stock</TableHeader>,
      cell: ({ row }) => <TableCell>{row.getValue("stock") || "0"}</TableCell>,
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
      cell: ({ row }) => (
        <TableCell className="flex justify-center gap-1 px-0">
          <Button
            variant={"outline"}
            onClick={() => router.push(`/administrator/dashboard/products/edit/${row.original.id}`)}
            size={"sm"}
            className={"border-[#179BD7] text-[#179BD7] font-medium hover:bg-[#179BD7]"}
          >
            <Edit size={14} />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => handleToggleProductStatus(row.original.id, row.original.active)}
            size={"sm"}
            className={
              row.original.active === "yes" || row.original.active === 1
                ? "border-orange-600 text-orange-600 font-medium hover:bg-orange-600"
                : "border-green-600 text-green-600 font-medium hover:bg-green-600"
            }
          >
            {row.original.active === "yes" || row.original.active === 1 ? "Deactivate" : "Activate"}
          </Button>
          <Button
            variant={"outline"}
            onClick={() => handleDeleteProduct(row.original.id)}
            size={"sm"}
            className={"border-red-600 text-red-600 font-medium hover:bg-red-600"}
          >
            <Trash2 size={14} />
          </Button>
        </TableCell>
      ),
    },
  ];

  return (
    <>
      <DashboardHeading label={`${supplierName} - Products`} subtitle="Manage supplier products">
        <BackButton variant={"outline"} />
        <Button 
          onClick={() => router.push(`/administrator/dashboard/products/add?supplier_id=${resolvedParams.id}`)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Product
        </Button>
      </DashboardHeading>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table container */}
      <DataTable 
        rowColored 
        columns={productsColumns} 
        data={data} 
        loading={loading}
      />
    </>
  );
};

export default SupplierProducts;
