"use client";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import notImplemented from "@/lib/notImplemented";
import ImageContainerDashboard from "../../../components/Common/ImageContainerDashboard";
import FormSelect from "../../../components/Common/FormSelect";

const schema = z.object({
  menuNameUK: z.string().min(1, "Menu Name is required"),
  menuNameGreece: z.string().min(1, "Menu Name is required"),
  active: z.string().min(1, "Active status is required"),
  type: z.string().min(1, "Type status is required"),
});

const menuData = {
  id: 1,
  name: "Products",
  type: "Category",
  active: true,
  level: 0,
  hasChildren: true,
};

const EditMenuItem = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      menuNameUK: menuData?.name,
      menuNameGreece: menuData?.name,
      active: menuData?.active ? "yes" : "no",
      type: "category",
    },
  });

  const onSubmit = (data) => {
    notImplemented();
    console.log(data);
    reset();
  };

  const onCancel = () => {
    toast.info("User update canceled");
    reset();
  };

  return (
    <ImageContainerDashboard
      bg="#F5FAFF"
      title={"Edit New menu item"}
      subtitle={"Add your new menu item"}
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
              {
                label: "Yes",
                value: "yes",
              },
              {
                label: "No",
                value: "no",
              },
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
              {
                label: "Category",
                value: "category",
              },

              {
                label: "Content Page",
                value: "contentPage",
              },

              {
                label: "Image Gallery",
                value: "imageGallery",
              },

              {
                label: "Product Listing",
                value: "productListing",
              },
            ]}
            placeholder={"Select"}
            error={errors?.type}
            rules={{ required: "Required" }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 xl:gap-4 w-full">
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
