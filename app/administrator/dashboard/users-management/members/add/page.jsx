"use client";

import FormSelect from "@/app/administrator/dashboard/components/Common/FormSelect";
import DashboardFormContainer from "@/app/administrator/dashboard/components/DashboardFormContainer";
import InputPassword from "@/components/common/InputPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character (!, @, #, $, %, ^, &, *)"
  );

const schema = z
  .object({
    type: z.string().min(1, "Type is required"),
    fullName: z.string().min(1, "Full name is required"),
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
    telephone: z.string().min(1, "Telephone is required"),
    username: z.string().min(1, "Username is required"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
    active: z.string().min(1, "Active status is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const AddMember = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      active: "yes",
    },
  });

  const onSubmit = async (data) => {
    try {
      // Map frontend fields to database columns
      const payload = {
        full_name: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.telephone,
        address: data.address,
        city: data.city,
        post_code: data.postCode,
        country: data.country,
        active: data.active,
        type: data.type,
        cperson: data.contactPerson,
        vat_num: data.vatNumber,
        company_reg_num: data.companyRegisterNumber,
      };

      const response = await apiFetch("/api/admin/members/store", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.success) {
        toast.success("Member created successfully");
        reset();
        // Redirect to members list
        window.location.href = "/administrator/dashboard/users-management/members";
      }
    } catch (error) {
      console.error("Failed to create member:", error);
      toast.error(error.message || "Failed to create member");
    }
  };

  const onCancel = () => {
    window.location.href = "/administrator/dashboard/users-management/members";
  };

  return (
    <DashboardFormContainer
      title="Add your member details here"
      subtitle="Add your member details and create new member"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Type"
            id="type"
            placeholder="Business / Individual"
            error={errors?.type}
            {...register("type")}
          />
          <Input
            label="Full Name"
            id="fullName"
            placeholder="John Doe"
            error={errors?.fullName}
            {...register("fullName")}
          />
          <Input
            label="Contact Person"
            id="contactPerson"
            placeholder="Michael Smith"
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
            placeholder="123 Green Street"
            error={errors?.address}
            {...register("address")}
          />
          <Input
            label="Post Code"
            id="postCode"
            placeholder="9000"
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
            placeholder="example@email.com"
            error={errors?.email}
            {...register("email")}
          />
          <Input
            label="Telephone"
            id="telephone"
            placeholder="+357 99999999"
            error={errors?.telephone}
            {...register("telephone")}
          />
          <Input
            label="Username"
            id="username"
            placeholder="member001"
            error={errors?.username}
            {...register("username")}
          />
          <InputPassword
            label="Password"
            id="password"
            placeholder="********"
            error={errors?.password}
            {...register("password")}
          />
          <InputPassword
            label="Confirm Password"
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
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </DashboardFormContainer>
  );
};

export default AddMember;
