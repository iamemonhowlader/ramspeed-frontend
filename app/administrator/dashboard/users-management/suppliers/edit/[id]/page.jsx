"use client";

import DashboardFormContainer from "@/app/administrator/dashboard/components/DashboardFormContainer";
import InputPassword from "@/components/common/InputPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import FormSelect from "../../../../components/Common/FormSelect";

// Password validation (optional for edit)
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character (!, @, #, $, %, ^, &, *)"
  )
  .optional()
  .or(z.literal(""));

// Supplier schema for edit
const schema = z
  .object({
    companyName: z.string().min(1, "Company name is required"),
    contactPerson: z.string().min(1, "Contact person is required"),
    vatNumber: z.string().min(1, "VAT number is required"),
    companyRegisterNumber: z
      .string()
      .min(1, "Company register number is required"),
    address: z.string().min(1, "Address is required"),
    postCode: z.string().min(1, "Post code is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    username: z.string().min(1, "Username is required"),
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    password: passwordSchema,
    confirmPassword: z.string().optional(),
    active: z.string().min(1, "Active status is required"),
  })
  .refine((data) => {
    if (data.password && data.password !== data.confirmPassword) {
      return false;
    }
    return true;
  }, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const EditSupplier = ({ params }) => {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await apiFetch(`/api/admin/suppliers/${resolvedParams.id}`);
        if (response.success) {
          const supplier = response.data;
          setValue("companyName", supplier.full_name || supplier.name || "");
          setValue("contactPerson", supplier.cperson || "");
          setValue("vatNumber", supplier.vat_num || "");
          setValue("companyRegisterNumber", supplier.company_reg_num || supplier.reg_num || "");
          setValue("address", supplier.address || "");
          setValue("postCode", supplier.post_code || "");
          setValue("city", supplier.city || "");
          setValue("country", supplier.country || "");
          setValue("email", supplier.email || "");
          setValue("phone", supplier.phone || "");
          setValue("username", supplier.username || "");
          setValue("website", supplier.website || "");
          setValue("active", supplier.active === 1 || supplier.active === "yes" ? "yes" : "no");
        } else {
          toast.error("Failed to fetch supplier data");
          router.push("/administrator/dashboard/users-management/suppliers");
        }
      } catch (error) {
        console.error("Error fetching supplier:", error);
        toast.error("Failed to fetch supplier data");
        router.push("/administrator/dashboard/users-management/suppliers");
      }
    };

    fetchSupplier();
  }, [resolvedParams.id, router, setValue]);

  const onSubmit = async (data) => {
    try {
      const updateData = {
        name: data.companyName,
        username: data.username,
        email: data.email,
        active: data.active,
        cperson: data.contactPerson,
        phone: data.phone,
        fax: '',
        vat_num: data.vatNumber,
        reg_num: data.companyRegisterNumber,
        address: data.address,
        post_code: data.postCode,
        city: data.city,
        country: data.country,
        website: data.website || ''
      };

      // Only include password if it's provided
      if (data.password) {
        updateData.password = data.password;
      }

      const response = await apiFetch(`/api/admin/suppliers/update/${resolvedParams.id}`, {
        method: 'POST',
        body: JSON.stringify(updateData)
      });

      if (response.success) {
        toast.success("Supplier updated successfully");
        router.push('/administrator/dashboard/users-management/suppliers');
      } else {
        toast.error(response.message || "Failed to update supplier");
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      toast.error("Failed to update supplier");
    }
  };

  const onCancel = () => {
    router.push("/administrator/dashboard/users-management/suppliers");
  };

  return (
    <DashboardFormContainer
      title="Edit supplier details"
      subtitle="Update your supplier information"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Company Name"
            id="companyName"
            placeholder="Ramspeed Trading Ltd"
            error={errors?.companyName}
            {...register("companyName")}
          />
          <Input
            label="Contact Person"
            id="contactPerson"
            placeholder="John Smith"
            error={errors?.contactPerson}
            {...register("contactPerson")}
          />
          <Input
            label="VAT Number"
            id="vatNumber"
            placeholder="CY12345678A"
            error={errors?.vatNumber}
            {...register("vatNumber")}
          />
          <Input
            label="Company Register Number"
            id="companyRegisterNumber"
            placeholder="HE123456"
            error={errors?.companyRegisterNumber}
            {...register("companyRegisterNumber")}
          />
          <Input
            label="Address"
            id="address"
            placeholder="45 Kings Avenue, Office 3A"
            error={errors?.address}
            {...register("address")}
          />
          <Input
            label="Post Code"
            id="postCode"
            placeholder="3105"
            error={errors?.postCode}
            {...register("postCode")}
          />
          <Input
            label="City"
            id="city"
            placeholder="Limassol"
            error={errors?.city}
            {...register("city")}
          />
          <Input
            label="Country"
            id="country"
            placeholder="Cyprus"
            error={errors?.country}
            {...register("country")}
          />
          <Input
            label="Email"
            id="email"
            placeholder="info@supplier.com"
            error={errors?.email}
            {...register("email")}
          />
          <Input
            label="Phone"
            id="phone"
            placeholder="+357 99999999"
            error={errors?.phone}
            {...register("phone")}
          />
          <Input
            label="Username"
            id="username"
            placeholder="supplier001"
            error={errors?.username}
            {...register("username")}
          />
          <Input
            label="Website"
            id="website"
            placeholder="https://www.supplier.com"
            error={errors?.website}
            {...register("website")}
          />
          <InputPassword
            label="New Password (leave empty to keep current)"
            id="password"
            placeholder="********"
            error={errors?.password}
            {...register("password")}
          />
          <InputPassword
            label="Confirm New Password"
            id="confirmPassword"
            placeholder="********"
            error={errors?.confirmPassword}
            {...register("confirmPassword")}
          />
          <FormSelect
            name="active"
            control={control}
            label="Active"
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            placeholder="Select status"
            error={errors?.active}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 md:gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </DashboardFormContainer>
  );
};

export default EditSupplier;
