"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import FormSelect from "../Common/FormSelect";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

// Zod schema for validation
const schema = z.object({
  productName: z.string().optional(),
  supplierName: z.string().optional(),
  products: z.string().optional(),
});

const ProductSupplierForm = () => {
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      productName: "",
      supplierName: "",
      products: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFetch("/api/admin/dashboard-data");
        if (response.success) {
          setCategories(response.categories.map(c => ({ label: c.name, value: c.id.toString() })));
          setSuppliers(response.suppliers.map(s => ({ label: s.full_name, value: s.id.toString() })));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    };
    fetchData();
  }, []);

  const onSubmit = (data) => {
    const params = new URLSearchParams();
    if (data.productName && data.productName !== "all") params.append("Category", data.productName);
    if (data.supplierName && data.supplierName !== "all") params.append("Supplier", data.supplierName);
    if (data.products) params.append("s", data.products);
    
    router.push(`/administrator/dashboard/manage-products?${params.toString()}`);
  };

  return (
    <div className="w-[70vw] lg:w-[510px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-6"
      >
        <FormSelect
          className={"w-full"}
          name="productName"
          control={control}
          label="Category"
          options={[{ label: "All Categories", value: "all" }, ...categories]}
          placeholder="Select Category"
        />

        <FormSelect
          className={"w-full"}
          name="supplierName"
          control={control}
          label="Supplier Name"
          options={[{ label: "All Suppliers", value: "all" }, ...suppliers]}
          placeholder="Select Supplier"
        />

        <Input
          label="Search Text"
          id="products"
          placeholder="Product name or code"
          {...register("products")}
        />

        <div className="flex items-center gap-2 md:gap-5 mt-8 flex-col md:flex-row ">
          <Button
            className={"w-full flex-1 md:w-auto bg-blue-600 hover:bg-blue-700"}
            type="submit"
            disabled={isSubmitting}
          >
            Search Products
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductSupplierForm;
