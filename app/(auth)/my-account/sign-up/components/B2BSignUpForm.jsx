"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/common/InputPassword";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

// -----------------------------
// Zod schema for B2B sign-up validation
// -----------------------------
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

const schema = z
  .object({
    companyName: z.string().min(1, "Company name is required"),
    companyRegistrationNumber: z
      .string()
      .min(1, "Registration number is required"),
    companyVATNumber: z.string().min(1, "VAT number is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    postCode: z.string().min(1, "Post code is required"),
    country: z.string().min(1, "Country is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(1, "Mobile number is required"),
    telephone: z.string().optional(),
    newsletter: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const B2BSignUpForm = () => {
  const router = useRouter();
  const { redirectPath } = useAuthStore();
  // -----------------------------
  // useForm setup with Zod resolver
  // -----------------------------
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      newsletter: false,
      country: "Cyprus",
    },
  });

  // -----------------------------
  // Form submission handler
  // -----------------------------
  const onSubmit = async (data) => {
    try {
      const response = await apiFetch("/api/register/member", {
        method: "POST",
        body: JSON.stringify({
          full_name: data.companyName, // Usually company name is the main identifier for wholesalers
          username: data.username,
          email: data.email,
          password: data.password,
          address: data.streetAddress,
          post_code: data.postCode,
          city: data.city,
          country: data.country,
          phone: data.mobile,
          fax: data.telephone,
          type: 'wholesaler',
          vat_num: data.companyVATNumber,
          company_reg_num: data.companyRegistrationNumber,
          cperson: `${data.firstName} ${data.lastName}`
        })
      });

      if (response.success) {
        toast.success(response.message || "Registration successful!");
        reset();
        router.push("/my-account/sign-up/confirmation");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row"
    >
      {/* -----------------------------
        Company Details
        ----------------------------- */}
      <div className="lg:w-1/2 bg-[#f5faff] p-4 sm:p-12 lg:p-16 flex flex-col">
        {" "}
        <div className="max-w-md mx-auto w-full flex flex-col gap-6 lg:gap-12">
          {/* Header */}{" "}
          <div className="text-center">
            {" "}
            <h1 className="text-2xl sm:text-5xl font-bold text-dark mb-6">
              Register as B2B customer{" "}
            </h1>{" "}
            <p className="text-lg">
              You can reach us anytime via{" "}
              <Link
                href="mailto:info@ramspeedcy.com"
                className="text-primary hover:underline"
              >
                info@ramspeedcy.com
              </Link>{" "}
            </p>{" "}
          </div>
          {/* Company Form */}
          <div className="space-y-5">
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Company name"
              id="companyName"
              placeholder="Enter company name"
              {...register("companyName")}
              error={errors.companyName}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Company registration number"
              id="companyRegistrationNumber"
              placeholder="Enter company registration number"
              {...register("companyRegistrationNumber")}
              error={errors.companyRegistrationNumber}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Company VAT number"
              id="companyVATNumber"
              placeholder="Enter VAT number"
              {...register("companyVATNumber")}
              error={errors.companyVATNumber}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Street address"
              id="streetAddress"
              placeholder="Enter street address"
              {...register("streetAddress")}
              error={errors.streetAddress}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="City"
              id="city"
              placeholder="Enter your city"
              {...register("city")}
              error={errors.city}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Post code"
              id="postCode"
              placeholder="Enter your post code"
              {...register("postCode")}
              error={errors.postCode}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Country"
              id="country"
              placeholder="Enter your country name"
              {...register("country")}
              error={errors.country}
              className={'cursor-not-allowed'}
              readOnly
            />
          </div>
        </div>
      </div>
      {/* -----------------------------
        Contact Person Details
        ----------------------------- */}
      <div className="lg:w-1/2 p-4 sm:p-12 lg:p-16 flex flex-col">
        <div className="max-w-md mx-auto w-full flex flex-col gap-6 lg:gap-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-5xl font-bold text-dark mb-6">
              Contact person details
            </h1>
            <p className="text-lg">
              You can reach us anytime via{" "}
              <Link
                href="mailto:info@ramspeedcy.com"
                className="text-primary hover:underline"
              >
                info@ramspeedcy.com
              </Link>
            </p>
          </div>

          {/* Contact Form */}
          <div className="space-y-5">
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="First name"
              id="firstName"
              placeholder="Enter your first name"
              {...register("firstName")}
              error={errors.firstName}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Last name"
              id="lastName"
              placeholder="Enter your last name"
              {...register("lastName")}
              error={errors.lastName}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Username"
              id="username"
              placeholder="Enter username"
              {...register("username")}
              error={errors.username}
            />
            <InputPassword
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Password"
              id="password"
              placeholder="Enter password"
              {...register("password")}
              error={errors.password}
            />
            <InputPassword
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Confirm password"
              id="confirmPassword"
              placeholder="Enter password"
              {...register("confirmPassword")}
              error={errors.confirmPassword}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Email address"
              id="email"
              placeholder="Enter email address"
              {...register("email")}
              error={errors.email}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Mobile"
              id="mobile"
              placeholder="Enter mobile number"
              {...register("mobile")}
              error={errors.mobile}
            />
            <Input
              labelClass={"!text-sm !text-gray-700"}
              containerClassName={"!gap-1"}
              label="Telephone number"
              id="telephone"
              placeholder="Enter your telephone number"
              {...register("telephone")}
              error={errors.telephone}
            />

            {/* Newsletter Checkbox */}
            <div className="flex items-center">
              <Checkbox
                id="newsletter"
                {...register("newsletter")}
                className="h-4 w-4 text-primary border-[#9CA3AF] rounded focus:ring-primary"
              />
              <label
                htmlFor="newsletter"
                className="ml-2 text-xs text-[#444444]"
              >
                I would like to subscribe to the Newsletter list
              </label>
            </div>

            {/* Submit Button and Sign-in Link */}
            <div className="flex gap-8 flex-col mt-8">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
              </Button>

              <div className="text-center text-sm font-medium">
                Already have an account?{" "}
                <Link
                  href="/my-account/login?user_type=b2b"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default B2BSignUpForm;
