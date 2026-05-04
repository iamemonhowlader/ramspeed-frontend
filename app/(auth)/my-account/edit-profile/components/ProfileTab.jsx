"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Validation Schema
const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  mobile: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  postCode: z.string().min(1, "Post code is required"),
  country: z.string().min(1, "Country is required"),
  street: z.string().min(1, "Street address is required"),
});

const ProfileTab = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    console.log("Profile updated:", data);
    reset();
  };

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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
        >
          <Input
            label="First Name"
            placeholder="Enter first name"
            {...register("firstName")}
            error={errors.firstName}
          />
          <Input
            label="Last Name"
            placeholder="Enter last name"
            {...register("lastName")}
            error={errors.lastName}
          />
          <Input
            label="Mobile Number"
            placeholder="Enter mobile number"
            {...register("mobile")}
            error={errors.mobile}
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
            label="Street Address"
            placeholder="Enter street address"
            {...register("street")}
            error={errors.street}
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
