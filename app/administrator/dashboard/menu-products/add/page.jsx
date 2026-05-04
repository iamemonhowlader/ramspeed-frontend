"use client";

import z from "zod";
import ImageContainerDashboard from "@/app/administrator/dashboard/components/Common/ImageContainerDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FormSelect from "@/app/administrator/dashboard/components/Common/FormSelect";
import { apiFetch } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";

const schema = z.object({
  menuNameUK: z.string().min(1, "Menu Name is required"),
  menuNameGreece: z.string().min(1, "Menu Name is required"),
  active: z.string().min(1, "Active status is required"),
  type: z.string().min(1, "Type status is required"),
});

const AddMenuItem = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentId = searchParams.get("parent") || 0;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      active: "yes",
      type: "category",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiFetch("/api/admin/menu/store", {
        method: "POST",
        body: JSON.stringify({
          name: data.menuNameUK,
          namegr: data.menuNameGreece,
          active_page: data.active,
          type: data.type === 'category' ? 1 : 4, // 1 for category, 4 for product listing in legacy
          parent: parentId,
        }),
      });

      if (response.success) {
        toast.success("Menu item added successfully!");
        router.push("/administrator/dashboard/menu-products");
      }
    } catch (error) {
      toast.error(error.message || "Failed to add menu item");
    }
  };

  const onCancel = () => {
    router.back();
  };

  return (
    <ImageContainerDashboard
      bg="#F5FAFF"
      title={"New menu item"}
      subtitle={"Add your new menu item"}
      image={"/dashboard/image2.png"}
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
          <FormSelect
            name={"type"}
            control={control}
            label={"Type"}
            alignment="row"
            options={[
              { label: "Category", value: "category" },
              { label: "Product Listing", value: "productListing" },
              // { label: "Content Page", value: "contentPage" },
              // { label: "Image Gallery", value: "imageGallery" },
            ]}
            placeholder={"Select"}
            error={errors?.type}
            rules={{ required: "Required" }}
          />
        </div>

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
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </ImageContainerDashboard>
  );
};

export default AddMenuItem;
