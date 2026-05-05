"use client";

import React, { useState, useEffect } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { Check, X, Edit, Trash2, Plus, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
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

const AdvertisementPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedAds, setSelectedAds] = useState([]);

  const fetchAdvertisements = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/admin/advertisements?search=${search}`);
      if (response.success) {
        setData(response.data.data || response.data);
      }
    } catch (error) {
      console.error("Failed to fetch advertisements:", error);
      toast.error("Failed to fetch advertisements");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedAds.length === 0) {
      toast.error("Please select at least one advertisement to delete");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedAds.length} advertisement(s)?`)) return;

    try {
      const deletePromises = selectedAds.map(adId =>
        apiFetch(`/api/admin/advertisements/delete/${adId}`, { method: 'DELETE' })
      );

      const results = await Promise.all(deletePromises);
      const failedCount = results.filter(result => !result.success).length;

      if (failedCount === 0) {
        toast.success(`${selectedAds.length} advertisement(s) deleted successfully`);
        setSelectedAds([]);
        fetchAdvertisements();
      } else {
        toast.error(`Failed to delete ${failedCount} advertisement(s)`);
      }
    } catch (error) {
      console.error("Error deleting advertisements:", error);
      toast.error("Failed to delete advertisements");
    }
  };

  const handleToggleStatus = async (adId, currentStatus) => {
    try {
      const response = await apiFetch(`/api/admin/advertisements/toggle-status/${adId}`, {
        method: 'POST'
      });
      
      if (response.success) {
        toast.success(`Advertisement ${currentStatus === "yes" ? "deactivated" : "activated"} successfully`);
        fetchAdvertisements();
      } else {
        toast.error(response.message || "Failed to update advertisement");
      }
    } catch (error) {
      toast.error("Failed to update advertisement");
    }
  };

  const handleDeleteAd = async (adId) => {
    if (!confirm("Are you sure you want to delete this advertisement?")) return;
    
    try {
      const response = await apiFetch(`/api/admin/advertisements/delete/${adId}`, {
        method: 'DELETE'
      });
      if (response.success) {
        toast.success("Advertisement deleted successfully");
        fetchAdvertisements();
      } else {
        toast.error(response.message || "Failed to delete advertisement");
      }
    } catch (error) {
      toast.error("Failed to delete advertisement");
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, [search]);

  const advertisementsColumns = [
    {
      id: "select",
      header: () => <TableHeader>Select</TableHeader>,
      cell: ({ row }) => (
        <TableCell>
          <Checkbox
            checked={selectedAds.includes(row.original.id)}
            onCheckedChange={(checked) => {
              if (checked) {
                setSelectedAds([...selectedAds, row.original.id]);
              } else {
                setSelectedAds(selectedAds.filter(id => id !== row.original.id));
              }
            }}
            className="bg-white cursor-pointer"
          />
        </TableCell>
      ),
    },
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
      accessorKey: "ad_location",
      header: () => <TableHeader>Location</TableHeader>,
      cell: ({ row }) => <TableCell>{row.getValue("ad_location")}</TableCell>,
    },
    {
      accessorKey: "ad_link",
      header: () => <TableHeader>Link</TableHeader>,
      cell: ({ row }) => (
        <TableCell className="max-w-xs truncate">
          <a 
            href={row.getValue("ad_link")} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {row.getValue("ad_link")}
          </a>
        </TableCell>
      ),
    },
    {
      accessorKey: "image_path",
      header: () => <TableHeader>Image</TableHeader>,
      cell: ({ row }) => (
        <TableCell>
          {row.original.image_url && (
            <img 
              src={row.original.image_url} 
              alt="Ad" 
              className="w-16 h-16 object-cover rounded"
            />
          )}
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
      cell: ({ row }) => (
        <TableCell className="flex justify-center gap-1 px-0">
          <Button
            variant={"outline"}
            onClick={() => window.open(row.original.ad_link, '_blank')}
            size={"sm"}
            className={"border-[#179BD7] text-[#179BD7] font-medium hover:bg-[#179BD7]"}
          >
            <Eye size={14} />
          </Button>
          <Button
            variant={"outline"}
            onClick={() => handleToggleStatus(row.original.id, row.original.active)}
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
            onClick={() => handleDeleteAd(row.original.id)}
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
      <DashboardHeading label="Advertisements" subtitle="Manage your advertisements here">
        <BackButton variant={"outline"} />
        <Link href={"/administrator/dashboard/website-customization/advertisement/add"}>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add Advertisement
          </Button>
        </Link>
      </DashboardHeading>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search advertisements..."
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button 
          variant={"destructive"}
          onClick={handleDeleteSelected}
          disabled={selectedAds.length === 0}
        >
          Delete Selected {selectedAds.length > 0 && `(${selectedAds.length})`}
        </Button>
      </div>

      {/* Table container */}
      <DataTable 
        rowColored 
        columns={advertisementsColumns} 
        data={data} 
        loading={loading}
      />
    </>
  );
};

export default AdvertisementPage;
