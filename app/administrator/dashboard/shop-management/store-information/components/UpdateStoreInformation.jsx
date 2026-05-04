"use client";

import DashboardFormContainer from "@/app/administrator/dashboard/components/DashboardFormContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import notImplemented from "@/lib/notImplemented";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  storeInfo: z.string().min(1, "Store info is required"),
  name: z.string().min(1, "Name is required"),
  vatNumber: z.string().min(1, "VAT number is required"),
  address: z.string().min(1, "Address is required"),
  phone: z
    .string()
    .min(6, "Phone must be at least 6 digits")
    .max(20, "Phone is too long"),
  email: z.string().email("Invalid email address"),
  website: z.string().url("Invalid website URL").optional(),
  skype: z.string().optional(),
});

const UpdateStoreInformation = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    notImplemented();
    console.log(data);
    reset();
  };

  const onCancel = () => {
    toast.info("Store information update canceled");
    reset();
  };

  return (
    <DashboardFormContainer
      title={"Update Store Information"}
      subtitle={"Edit your new menu item"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 md:space-y-6"
      >
        <Input
          label="Store Info"
          id="storeInfo"
          placeholder="About the store..."
          error={errors?.storeInfo}
          {...register("storeInfo")}
        />

        <Input
          label="Name"
          id="name"
          placeholder="Your store name"
          error={errors?.name}
          {...register("name")}
        />

        <Input
          label="VAT Number"
          id="vatNumber"
          placeholder="Enter VAT number"
          error={errors?.vatNumber}
          {...register("vatNumber")}
        />

        <Textarea
          label="Address"
          id="address"
          placeholder="205, Ferenhaaas avenue, Country: Cyprus"
          rows={10}
          error={errors.address}
          {...register("address")}
        />

        <Input
          label="Phone"
          id="phone"
          placeholder="+3349499"
          error={errors?.phone}
          {...register("phone")}
        />

        <Input
          label="Email"
          id="email"
          placeholder="store@example.com"
          error={errors?.email}
          {...register("email")}
        />

        <Input
          label="Website URL"
          id="website"
          placeholder="https://example.com"
          error={errors?.website}
          {...register("website")}
        />

        <Input
          label="Skype"
          id="skype"
          placeholder="skype.username"
          error={errors?.skype}
          {...register("skype")}
        />

        {/* Action Buttons */}
        <div className="md:max-w-max ml-auto flex gap-2 xl:gap-4 flex-col md:flex-row w-full md:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Store"}
          </Button>
        </div>
      </form>
    </DashboardFormContainer>
  );
};

export default UpdateStoreInformation;
