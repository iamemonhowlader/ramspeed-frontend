"use client";

import React, { useEffect, useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ImageContainerDashboard from "@/app/administrator/dashboard/components/Common/ImageContainerDashboard";
import FormSelect from "@/app/administrator/dashboard/components/Common/FormSelect";
import { apiFetch } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

const schema = z.object({
  menuNameUK: z.string().min(1, "Menu Name is required"),
  menuNameGreece: z.string().min(1, "Menu Name is required"),
  active: z.string().min(1, "Active status is required"),
  type: z.string().optional(),
});

const EditMenuItem = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [menuType, setMenuType] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await apiFetch(`/api/admin/dashboard-data`); // We need a specific menu fetch or use dashboard data if it has it
        // Since I don't have a GET /menu/{id} yet, I'll fetch it from a new endpoint or the current one
        // Let's assume I add GET /api/admin/menu/{id}
        const res = await apiFetch(`/api/admin/menu/${id}`);
        if (res.success) {
          const item = res.data;
          setMenuType(item.type);
          reset({
            menuNameUK: item.name,
            menuNameGreece: item.namegr,
            active: item.active_page,
            type: item.type.toString(),
          });
        }
      } catch (error) {
        console.error("Failed to fetch menu item:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await apiFetch(`/api/admin/menu/update/${id}`, {
        method: "POST",
        body: JSON.stringify({
          name: data.menuNameUK,
          namegr: data.menuNameGreece,
          active_page: data.active,
        }),
      });

      if (response.success) {
        toast.success("Menu item updated successfully!");
        router.push("/administrator/dashboard/menu-products");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update menu item");
    }
  };

  const onCancel = () => {
    router.back();
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <ImageContainerDashboard
      bg="#F5FAFF"
      title={"Edit Menu Item"}
      subtitle={"Update your menu item details"}
      image={"/dashboard/image3.png"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 md:space-y-6"
      >
        <Input
          label="Menu Name (UK)"
          id="menuNameUK"
          error={errors?.menuNameUK}
          {...register("menuNameUK")}
        />
        <Input
          label="Menu Name (Greece)"
          id="menuNameGreece"
          error={errors?.menuNameGreece}
          {...register("menuNameGreece")}
        />

        <div className="flex flex-col gap-2 md:flex-row justify-between">
          <FormSelect
            name={"active"}
            control={control}
            label={"Active Page"}
            alignment="row"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            placeholder={"Select"}
            error={errors?.active}
            rules={{ required: "Required" }}
          />
          <div className="flex-1 flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">Type</label>
            <div className="px-3 py-2 bg-gray-100 rounded-md text-gray-600 border border-gray-200">
              {menuType == 1 ? "Category" : menuType == 4 ? "Product Listing" : "Other"}
            </div>
          </div>
        </div>

        {/* Legacy Menu Image Upload (only for type 4) */}
        {menuType == 4 && (
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Menu Image</label>
            <input 
              type="file" 
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        )}

        <div className="flex gap-2 xl:gap-4 w-full pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className={"flex-1"}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className={"flex-1"}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </ImageContainerDashboard>
  );
};
export default EditMenuItem;
