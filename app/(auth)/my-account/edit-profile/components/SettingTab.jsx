"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";

// -----------------------------
// Zod validation schema
// -----------------------------
const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// -----------------------------
// Component: SettingTab
// -----------------------------
const SettingTab = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiFetch("/api/frontend/account/update", {
        method: "POST",
        body: JSON.stringify({
          current_password: data.currentPassword,
          password: data.newPassword,
        }),
      });

      if (response.success) {
        toast.success("Password updated successfully!");
        reset();
      } else {
        toast.error(response.message || "Failed to update password");
      }
    } catch (error) {
      toast.error("An error occurred while updating password");
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <h3 className="border-b border-gray-200 font-semibold text-sm sm:text-base md:text-lg text-[#191C1F] px-3 sm:px-6 py-2 sm:py-[6px]">
        CHANGE PASSWORD
      </h3>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 sm:p-6 flex flex-col gap-4 sm:gap-6"
      >
        {/* Current Password */}
        <Input
          labelClass={"!text-sm !text-gray-700"}
          containerClassName={"!gap-1"}
          type="password"
          label="Current Password"
          placeholder="Enter current password"
          {...register("currentPassword")}
          error={errors.currentPassword}
        />

        {/* New Password */}
        <Input
          labelClass={"!text-sm !text-gray-700"}
          containerClassName={"!gap-1"}
          type="password"
          label="New Password"
          placeholder="Enter new password"
          {...register("newPassword")}
          error={errors.newPassword}
        />

        {/* Confirm Password */}
        <Input
          labelClass={"!text-sm !text-gray-700"}
          containerClassName={"!gap-1"}
          type="password"
          label="Confirm Password"
          placeholder="Re-enter new password"
          {...register("confirmPassword")}
          error={errors.confirmPassword}
        />

        {/* Submit Button */}
        <div className="mt-2 sm:mt-4">
          <Button
            type="submit"
            className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Change Password"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SettingTab;
