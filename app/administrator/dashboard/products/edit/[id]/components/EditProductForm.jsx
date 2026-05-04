"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FormSelect from "@/app/administrator/dashboard/components/Common/FormSelect";
import MultiImageUpload from "@/app/administrator/dashboard/components/ImageUpload/MultiImageUpload";
import { apiFetch } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  namegr: z.string().optional(),
  priceDollar: z.number().min(0, "Price ($) must be non-negative"),
  priceCyprusDollar: z.number().min(0, "Price in Cyprus ($) must be non-negative"),
  priceSupEuro: z.number().min(0, "Supplier Price (€) must be non-negative"),
  storeProfit: z.number().min(0, "Profit can't be negative"),
  code: z.string().min(1, "Code is required"),
  supplier: z.string().min(1, "Supplier is required"),
  weight: z.number().min(0, "Weight is required"),
  size: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  descriptiongr: z.string().optional(),
  stock: z.number().min(0, "Stock must be non-negative"),
  minimumQuantity: z.number().min(1, "Minimum quantity must be at least 1"),
  stockCyprus: z.number().min(0, "Stock in Cyprus must be non-negative"),
  options: z.string().optional(),
  newArrival: z.string().min(1, "Required"),
  flashSale: z.string().min(1, "Required"),
  active: z.string().min(1, "Required"),
});

export default function EditProductForm() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [suppliers, setSuppliers] = useState([]);
  const [calculatedPrices, setCalculatedPrices] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      newArrival: "no",
      flashSale: "no",
      active: "yes",
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, dashboardRes] = await Promise.all([
          apiFetch(`/api/admin/products/${id}`),
          apiFetch("/api/admin/dashboard-data")
        ]);

        if (dashboardRes.success) {
          setSuppliers(dashboardRes.suppliers.map(s => ({ label: s.full_name, value: s.id.toString() })));
        }

        if (productRes.success) {
          const p = productRes.data;
          setCalculatedPrices({
            euro: p.calculated_price_euro,
            selling: p.calculated_selling_price_euro,
            cyprus: p.calculated_price_cyprus_euro,
            cyProfit: p.calculated_cy_profit_tax_euro
          });
          
          reset({
            name: p.name,
            namegr: p.namegr || "",
            priceDollar: parseFloat(p.price || 0),
            priceCyprusDollar: parseFloat(p.price_cy_unconverted || 0),
            priceSupEuro: parseFloat(p.price_sup_cy || 0),
            storeProfit: parseFloat(p.store_profit || 0),
            code: p.code,
            supplier: p.supplier_id?.toString(),
            weight: parseFloat(p.weihgt || 0),
            size: p.size || "",
            description: p.description || "",
            descriptiongr: p.descriptiongr || "",
            stock: parseInt(p.availability || 0),
            minimumQuantity: parseInt(p.minquantity || 1),
            stockCyprus: parseInt(p.availability_cy || 0),
            options: p.options || "",
            newArrival: p.new_arrival || "no",
            flashSale: p.offer === 'yes' ? "yes" : "no",
            active: p.active || "yes",
          });
        }
      } catch (error) {
        toast.error("Failed to load product data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await apiFetch(`/api/admin/products/update/${id}`, {
        method: "POST",
        body: JSON.stringify({
          ...data,
          price: data.priceDollar,
          price_cy: data.priceCyprusDollar,
          price_sup_cy: data.priceSupEuro,
          weihgt: data.weight,
          ssize: data.size,
          minquantity: data.minimumQuantity,
          availability: data.stock,
          availability_cy: data.stockCyprus,
          arrival: data.newArrival,
          offer: data.flashSale,
          supplier: data.supplier,
        }),
      });

      if (response.success) {
        toast.success("Product updated successfully!");
        router.push("/administrator/dashboard/manage-products");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update product");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading product details...</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
      {/* Section: Basic Information */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6 text-[#05314E] border-b pb-2">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Name (English)" id="name" error={errors.name} {...register("name")} />
          <Input label="Name (Greek)" id="namegr" error={errors.namegr} {...register("namegr")} />
          <Input label="Code" id="code" error={errors.code} {...register("code")} />
          <FormSelect
            name="supplier"
            control={control}
            label="Supplier"
            options={suppliers}
            placeholder="Select supplier"
            error={errors.supplier}
          />
        </div>
      </div>

      {/* Section: Pricing & Profit */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6 text-[#05314E] border-b pb-2">Pricing & Profit</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Input label="Price ($)" id="priceDollar" type="number" step="0.01" error={errors.priceDollar} {...register("priceDollar", { valueAsNumber: true })} />
          <Input label="Price In Cyprus ($)" id="priceCyprusDollar" type="number" step="0.01" error={errors.priceCyprusDollar} {...register("priceCyprusDollar", { valueAsNumber: true })} />
          <Input label="CY Supplier Price (€)" id="priceSupEuro" type="number" step="0.01" error={errors.priceSupEuro} {...register("priceSupEuro", { valueAsNumber: true })} />
          <Input label="Store Profit (%)" id="storeProfit" type="number" step="1" error={errors.storeProfit} {...register("storeProfit", { valueAsNumber: true })} />
        </div>

        {calculatedPrices && (
          <div className="bg-blue-50 p-4 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-4 border border-blue-100">
            <div>
              <p className="text-xs text-blue-600 font-semibold uppercase">Price (€)</p>
              <p className="text-lg font-bold text-blue-900">€{Number(calculatedPrices.euro || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-semibold uppercase">Selling Price (€)</p>
              <p className="text-lg font-bold text-blue-900">€{Number(calculatedPrices.selling || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-semibold uppercase">Cyprus Price (€)</p>
              <p className="text-lg font-bold text-blue-900">€{Number(calculatedPrices.cyprus || 0).toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-semibold uppercase">CY + PROF/TAX (€)</p>
              <p className="text-lg font-bold text-blue-900">€{Number(calculatedPrices.cyProfit || 0).toFixed(2)}</p>
            </div>
          </div>
        )}
      </div>

      {/* Section: Inventory & Physical */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6 text-[#05314E] border-b pb-2">Inventory & Physical</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Input label="Stock" id="stock" type="number" error={errors.stock} {...register("stock", { valueAsNumber: true })} />
          <Input label="Stock in Cyprus" id="stockCyprus" type="number" error={errors.stockCyprus} {...register("stockCyprus", { valueAsNumber: true })} />
          <Input label="Minimum Quantity" id="minimumQuantity" type="number" error={errors.minimumQuantity} {...register("minimumQuantity", { valueAsNumber: true })} />
          <Input label="Weight (KG)" id="weight" type="number" step="0.001" error={errors.weight} {...register("weight", { valueAsNumber: true })} />
          <Input label="Size" id="size" placeholder="e.g. 10x20x30" error={errors.size} {...register("size")} />
          <Input label="Options" id="options" placeholder="e.g. Black, White" error={errors.options} {...register("options")} />
        </div>
      </div>

      {/* Section: Descriptions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6 text-[#05314E] border-b pb-2">Descriptions</h3>
        <div className="space-y-6">
          <Textarea label="Description (English)" id="description" rows={5} error={errors.description} {...register("description")} />
          <Textarea label="Description (Greek)" id="descriptiongr" rows={5} error={errors.descriptiongr} {...register("descriptiongr")} />
        </div>
      </div>

      {/* Section: Media */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold mb-6 text-[#05314E] border-b pb-2">Product Images</h3>
        <MultiImageUpload />
      </div>

      {/* Section: Status & Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky bottom-0 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-6">
            <FormSelect name="newArrival" control={control} label="New Arrival" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
            <FormSelect name="flashSale" control={control} label="Flash Sale" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
            <FormSelect name="active" control={control} label="Active" options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button type="button" variant="outline" className="flex-1 md:flex-none" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" className="flex-1 md:flex-none bg-[#0068C8] hover:bg-[#0056a3]" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Save Product"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
