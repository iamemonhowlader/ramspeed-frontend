"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormSelect from "../../../components/Common/FormSelect";
import PaymentMethod from "./PaymentMethod";
import DateRange from "../../../components/DateRange";

// Zod schema for validation
const schema = z.object({
  invoiceNumber: z.number().min(0.01, "Invalid Input"),
  supplier: z.string().min(1, "Supplier is required"),
  expenseType: z.string().min(1, "Expense type is required"),
  grossValue: z.number().min(1, "Invalid Input"),
  vat: z.string().min(1, "VAT is required"),
});

function NewExpenseForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      invoiceNumber: "",
      supplier: "",
      expenseType: "",
      grossValue: "",
      vat: "",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-10 mb-6 xl:mb-10 border-b border-[#D0D5DD] pb-4">
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
          className={"xl:-translate-y-2"}
          label="Invoice number"
          id="invoiceNumber"
          placeholder="Write invoice number"
          type="number"
          step="1"
          error={errors.invoiceNumber}
          {...register("invoiceNumber", { valueAsNumber: true })}
        />

        <FormSelect
          name="expenseType"
          control={control}
          label="Expense type"
          className={"w-full mt-0 xl:-mt-2"}
          options={[
            { value: "purchase", label: "Purchase" },
            { value: "car_fuel", label: "Car Fuel" },
            { value: "car_service", label: "Car Service" },
            { value: "building", label: "Building" },
            { value: "service_receipt", label: "Service Receipt" },
            { value: "electricity", label: "Electricity" },
            { value: "internet_phone", label: "Internet & Phone" },
            { value: "water", label: "Water" },
            { value: "bank_fee", label: "Bank Fee" },
            { value: "expenses_services", label: "Expenses Services" },
          ]}
          placeholder="Select expense type"
          error={errors.expenseType}
          rules={{ required: "Expense type is required" }}
        />
      </div>

      {/* payment methods  */}
      <div className=" my-15 lg:my-26 xl:my-36 border-b border-[#D0D5DD] pb-4">
        <PaymentMethod />
      </div>

      <div>
        <DateRange fromLabel="Date paid" toLabel="Expire date" />

        <div className="mt-4 grid lg:grid-cols-2 gap-6 xl:gap-10">
          {/* gross value  */}
          <Input
            label="Gross value"
            id="grossValue"
            placeholder="Write name of the product"
            type="number"
            step="1"
            error={errors.grossValue}
            {...register("grossValue", { valueAsNumber: true })}
          />{" "}
          {/* vat  */}
          <FormSelect
            name="vat"
            control={control}
            label="Vat"
            options={[
              { value: '19', label: "19%" },
              { value: '9', label: "9%" },
              { value: '5', label: "5%" },
              { value: '0', label: "0%" },
            ]}
            placeholder="Select vat"
            error={errors.vat}
            rules={{ required: "vat is required" }}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 md:max-w-max ml-auto">
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

export default NewExpenseForm;
