"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import useAuthStore from "@/store/authStore";

// Validation Schema
const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(8, "Phone number is too short")
    .regex(/^[0-9+ ]+$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  postCode: z.string().min(1, "Post code is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
});

const ProfileTab = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiFetch("/api/frontend/account");
        if (response.success && response.data) {
          const profile = response.data;
          setValue("fullName", profile.full_name || "");
          setValue("email", profile.email || "");
          setValue("phone", profile.phone || "");
          setValue("address", profile.address || "");
          setValue("city", profile.city || "");
          setValue("postCode", profile.post_code || "");
          setValue("country", profile.country || "");
        }
      } catch (error) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await apiFetch("/api/frontend/account/update", {
        method: "POST",
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          post_code: data.postCode,
          country: data.country
        }),
      });

      if (response.success) {
        toast.success("Profile updated successfully!");
        // Update local user state if needed
        if (user) {
          setUser({ ...user, full_name: data.fullName, email: data.email });
        }
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="w-full">
      {/* Header */}
      <h3 className="border-b border-gray-200 font-semibold text-sm sm:text-base md:text-lg text-[#191C1F] px-3 sm:px-6 py-2 sm:py-[6px]">
        ACCOUNT SETTING
      </h3>

      {/* Profile Form */}
      <div className="p-3 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10">
        <div className="flex justify-center md:justify-start">
          <Avatar className="size-28 md:size-30 xl:size-[176px]">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || "User")}&background=0068c8&color=fff`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
        >
          <div className="col-span-1 sm:col-span-2">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              {...register("fullName")}
              error={errors.fullName}
            />
          </div>
          <Input
            label="Phone Number"
            placeholder="Enter phone number"
            {...register("phone")}
            error={errors.phone}
          />
          <Input
            label="Email Address"
            placeholder="Enter email address"
            {...register("email")}
            error={errors.email}
          />
          <Input
            label="City"
            placeholder="Enter city"
            {...register("city")}
            error={errors.city}
          />
          <Input
            label="Post Code"
            placeholder="Enter post code"
            {...register("postCode")}
            error={errors.postCode}
          />
          <Input
            label="Country"
            placeholder="Enter country"
            {...register("country")}
            error={errors.country}
          />
          <Input
            label="Full Address"
            placeholder="Enter full address"
            {...register("address")}
            error={errors.address}
          />

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 mt-2 sm:mt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileTab;
