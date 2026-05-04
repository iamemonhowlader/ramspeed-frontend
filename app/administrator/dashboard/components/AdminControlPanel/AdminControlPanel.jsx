"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import notImplemented from "@/lib/notImplemented";
import FormSelect from "../Common/FormSelect";

// Zod schema for validation
const schema = z.object({
  productName: z.string().min(1, "Product name is required"),
  supplierName: z.string().min(1, "Supplier name is required"),
  products: z.string().min(1, "Products field is required"),
});

const ProductSupplierForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      productName: "",
      supplierName: "",
      products: "",
    },
  });

  const onSubmit = (data) => {
    notImplemented();
    console.log(data);
    reset();
  };

  return (
    <div className="w-[70vw] lg:w-[510px]">
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-6"
      >
        <FormSelect
          className={"w-full"}
          name="productName"
          control={control}
          label="Product Name"
          options={[
            { label: "Product 1", value: "product-1" },
            { label: "Product 2", value: "product-2" },
            { label: "Product 3", value: "product-3" },
          ]}
          placeholder="Select Product"
          error={errors?.productName}
        />

        <FormSelect
          className={"w-full"}
          name="supplierName"
          control={control}
          label="Supplier Name"
          options={[
            { label: "Supplier A", value: "supplier-a" },
            { label: "Supplier B", value: "supplier-b" },
            { label: "Supplier C", value: "supplier-c" },
          ]}
          placeholder="Select Supplier"
          error={errors?.supplierName}
        />

        <Input
          label="Products"
          id="products"
          placeholder="Search products"
          error={errors?.products}
          {...register("products")}
        />

        <div className="flex items-center gap-2 md:gap-5 mt-8 flex-col md:flex-row ">
          <Button
            className={"w-full flex-1 md:w-auto"}
            type="submit"
            disabled={isSubmitting}
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductSupplierForm;
