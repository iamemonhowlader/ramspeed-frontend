"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormSelect from "../../components/Common/FormSelect";
import MultiImageUpload from "../../components/ImageUpload/MultiImageUpload";

// Zod schema for validation
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  priceEuro: z.number().min(0.01, "Price (€) must be positive"),
  priceDollar: z.number().min(0.01, "Price ($) must be positive"),
  priceCyprusDollar: z
    .number()
    .min(0.01, "Price in Cyprus ($) must be positive"),
  // cySupplierPrice: z.number().min(0.01, "CY Supplier Price must be positive"),
  storeProfit: z.number().min(0, "Profit can't be negative"),
  code: z.string().min(1, "Code is required"),
  supplier: z.string().min(1, "Supplier is required"),
  size: z.number().min(0, "Size is required"),
  shortDescription: z
    .string()
    .min(10, "Short description should be at least 10 characters"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters"),
  // features: z.string().min(1, "Product feature is required"),
  // condition: z.string().min(1, "Condition is required"),
  stock: z.number().min(0, "Stock must be non-negative"),
  minimumQuantity: z.number().min(1, "Minimum quantity must be at least 1"),
  stockCyprus: z.number().min(0, "Stock in Cyprus must be non-negative"),
  options: z.string().min(1, "Options is required"),
  newArrival: z.string().min(1, "Required"),
  flashSale: z.string().min(1, "Required"),
  active: z.string().min(1, "Required"),
});

export default function AddProductForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      priceEuro: "",
      priceDollar: "",
      priceCyprusDollar: "",
      // cySupplierPrice: "",
      storeProfit: "",
      code: "",
      supplier: "",
      size: "",
      shortDescription: "",
      description: "",
      // features: "",
      // condition: "",
      stock: "",
      minimumQuantity: "",
      stockCyprus: "",
      options: "",
      newArrival: "no",
      flashSale: "no",
      active: "yes",
    },
  });

  const onSubmit = (data) => {
    toast.success("Product saved!", {
      description: (
        <p className="text-black">This feature hasn't been implemented yet</p>
      ),
    });
    // reset();
    console.log(data);
    // Real backend submission can go here
  };

  const onCancel = () => {
    toast.info("Form canceled", { description: "The form has been reset." });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Top section: 2-column grid for product fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 mb-6 xl:mb-10">
        {/* Replace defaultValue with field values from RHF (no need if using {...register}) */}
        <Input
          label="Name"
          id="name"
          error={errors.name}
          placeholder="Write name of the product"
          {...register("name")}
        />
        <Input
          label="Price"
          id="priceEuro"
          placeholder="Write price of the product"
          type="number"
          step="1"
          error={errors.priceEuro}
          {...register("priceEuro", { valueAsNumber: true })}
        />
        <Input
          label="Price ($)"
          id="priceDollar"
          placeholder="Write price ($) of the product"
          type="number"
          step="1"
          error={errors.priceDollar}
          {...register("priceDollar", { valueAsNumber: true })}
        />
        <Input
          label="Price in Cyprus (€)"
          id="priceCyprusDollar"
          placeholder="Write price in Cyprus (€) of the product"
          type="number"
          step="1"
          error={errors.priceCyprusDollar}
          {...register("priceCyprusDollar", { valueAsNumber: true })}
        />
        {/* <Input
          label="CY Supplier Price"
          id="cySupplierPrice"
          placeholder="Write CY Supplier Price of the product"
          type="number"
          step="1"
          error={errors.cySupplierPrice}
          {...register("cySupplierPrice", { valueAsNumber: true })}
        /> */}
        <Input
          label="Store profit (%)"
          id="storeProfit"
          placeholder="Write store profit (%) of the product"
          type="number"
          step="1"
          error={errors.storeProfit}
          {...register("storeProfit", { valueAsNumber: true })}
        />
        <Input
          label="Code"
          id="code"
          placeholder="Write code of the product"
          error={errors.code}
          {...register("code")}
        />
        <FormSelect
          name="supplier"
          control={control}
          label="Supplier"
          className={"w-full mt-0 xl:-mt-2"}
          options={[
            { value: "supplier-a", label: "Supplier A" },
            { value: "supplier-b", label: "Supplier B" },
            { value: "supplier-c", label: "Supplier C" },
            { value: "supplier-d", label: "Supplier D" },
          ]}
          placeholder="Select supplier"
          error={errors.supplier}
          rules={{ required: "Supplier is required" }}
        />
        <Input
          label="Size"
          id="size"
          placeholder="Weight (KG)"
          type="number"
          step="1"
          error={errors.size}
          {...register("size", { valueAsNumber: true })}
        />
      </div>

      {/* Full width for Short Description */}
      <div className="mb-6 xl:mb-10">
        <Textarea
        className={'h-20'}
          label="Write short description for the product"
          id="shortDescription"
          placeholder="Write short description for the product"
          rows={10}
          error={errors.shortDescription}
          {...register("shortDescription")}
        />
      </div>
      {/* Full width for Description */}
      <div className="mb-6 xl:mb-10">
        <Textarea
          label="Write description for the product"
          id="description"
          placeholder="Write description for the product"
          rows={10}
          error={errors.description}
          {...register("description")}
        />
      </div>
      {/* Product Feature and Condition: 2-column grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        <Textarea
          label="Write product feature"
          id="features"
          placeholder="Write product features"
          rows={5}
          error={errors.features}
          {...register("features")}
        />
        <Textarea
          label="Write condition for the product"
          id="condition"
          placeholder="Write condition for the product"
          rows={3}
          error={errors.condition}
          {...register("condition")}
        />
      </div> */}

      {/* image upload */}
      <div className="mb-6 xl:mb-10">
        <MultiImageUpload />
      </div>

      {/* Inventory: 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-10 mb-6 xl:mb-10">
        <Input
          label="Stock"
          id="stock"
          placeholder="Write stock number of the product"
          type="number"
          error={errors.stock}
          {...register("stock", { valueAsNumber: true })}
        />
        <Input
          label="Minimum quantity"
          id="minimumQuantity"
          placeholder="Write minimum quantity of the product"
          type="number"
          error={errors.minimumQuantity}
          {...register("minimumQuantity", { valueAsNumber: true })}
        />
        <Input
          label="Stock in Cyprus"
          id="stockCyprus"
          placeholder="Write stock in Cyprus of the product"
          type="number"
          error={errors.stockCyprus}
          {...register("stockCyprus", { valueAsNumber: true })}
        />
      </div>
      {/* Options (full width) */}
      <div className="mb-6 xl:mb-10 xl:flex items-center gap-4">
        <Input
          className={"w-full xl:min-w-100"}
          alignment="row"
          label="Options"
          id="options"
          placeholder="Available in black or red"
          error={errors.options}
          {...register("options")}
        />
        <p className="text-[#667085] font-semibold text-[10px] xl:text-lg">
          ( Example: Available in black, white or red) Leave empty if there are
          no)
        </p>
      </div>
      {/* Last row: Select fields using Controller for robust integration */}
      <div className="flex flex-col gap-6 md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row gap-3 xl:gap-10 w-full md:w-auto">
          {/* New Arrival */}
          <FormSelect
            name="newArrival"
            control={control}
            label="New Arrival"
            alignment="row"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            placeholder="Select"
            error={errors.newArrival}
            rules={{ required: "Required" }}
          />

          {/* Flash Sale */}
          <FormSelect
            name="flashSale"
            control={control}
            label="Flash Sale"
            alignment="row"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            placeholder="Select"
            error={errors.flashSale}
            rules={{ required: "Required" }}
          />

          {/* Active */}
          <FormSelect
            name="active"
            control={control}
            label="Active"
            alignment="row"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            placeholder="Select"
            error={errors.active}
            rules={{ required: "Required" }}
          />
        </div>
        {/* Action Buttons */}
        <div className="flex gap-2 xl:gap-4 flex-col md:flex-row w-full md:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            size={"lg"}
          >
            Cancel
          </Button>
          <Button size={"lg"} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
}
