"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import InputPassword from "@/components/common/InputPassword";
import Link from "next/link";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[@$!%*?&]/, "Password must contain at least one special character");

const schema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
    mobile: z.string().min(1, "Mobile number is required"),
    telephone: z.string().optional(),
    city: z.string().min(1, "City is required"),
    postCode: z.string().min(1, "Post code is required"),
    country: z.string().min(1, "Country is required"),
    streetAddress: z.string().min(1, "Street address is required"),
    newsletter: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const router = useRouter();
  const { redirectPath, setRedirectPath } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      newsletter: false,
      country: "Cyprus",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await apiFetch("/api/register/member", {
        method: "POST",
        body: JSON.stringify({
          full_name: `${data.firstName} ${data.lastName}`,
          username: data.username,
          email: data.email,
          password: data.password,
          address: data.streetAddress,
          post_code: data.postCode,
          city: data.city,
          country: data.country,
          phone: data.mobile,
          fax: data.telephone,
          type: 'client'
        })
      });

      if (response.success) {
        toast.success(response.message || "Registration successful!");
        reset();
        if (redirectPath) {
          router.push(redirectPath);
        } else {
          router.push("/my-account/login");
        }
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    }
  };

  return (
    <div className="lg:w-1/2 p-4 sm:p-12 lg:p-16 flex flex-col justify-center">
      {" "}
      <div className="max-w-md mx-auto w-full flex flex-col lg:gap-12">
        {/* Header */}{" "}
        <div className="text-center mb-8 lg:mb-12">
          {" "}
          <h1 className="text-2xl sm:text-5xl font-bold text-dark mb-6">
            Register as retail customer
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
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            containerClassName={"!gap-1"}
            label="First name"
            labelClass={"!text-sm !text-gray-700"}
            id="firstName"
            placeholder="Enter your first name"
            {...register("firstName")}
            error={errors.firstName}
          />
          <Input
            containerClassName={"!gap-1"}
            label="Last name"
            labelClass={"!text-sm !text-gray-700"}
            id="lastName"
            placeholder="Enter your last name"
            {...register("lastName")}
            error={errors.lastName}
          />
          <Input
            containerClassName={"!gap-1"}
            label="Username"
            labelClass={"!text-sm !text-gray-700"}
            id="username"
            placeholder="Enter your username"
            {...register("username")}
            error={errors.username}
          />
          <Input
            containerClassName={"!gap-1"}
            label="Email address"
            labelClass={"!text-sm !text-gray-700"}
            id="email"
            placeholder="Enter email address"
            {...register("email")}
            error={errors.email}
          />
          <InputPassword
            containerClassName={"!gap-1"}
            label="Password"
            labelClass={"!text-sm !text-gray-700"}
            id="password"
            placeholder="Enter password"
            {...register("password")}
            error={errors.password}
          />
          <InputPassword
            containerClassName={"!gap-1"}
            label="Confirm password"
            labelClass={"!text-sm !text-gray-700"}
            id="confirmPassword"
            placeholder="Enter password"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
          />
          <Input
            containerClassName={"!gap-1"}
            label="Email address"
            labelClass={"!text-sm !text-gray-700"}
            id="email"
            placeholder="Enter email address"
            {...register("email")}
            error={errors.email}
          />
          <Input
            containerClassName={"!gap-1"}
            label="Mobile"
            id="mobile"
            labelClass={"!text-sm !text-gray-700"}
            placeholder="Enter mobile number"
            {...register("mobile")}
            error={errors.mobile}
          />
          <Input
            containerClassName={"!gap-1"}
            label="Telephone number"
            id="telephone"
            labelClass={"!text-sm !text-gray-700"}
            placeholder="Enter your telephone number"
            {...register("telephone")}
            error={errors.telephone}
          />
          <Input
            containerClassName={"!gap-1"}
            label="City"
            labelClass={"!text-sm !text-gray-700"}
            id="city"
            placeholder="Enter city"
            {...register("city")}
            error={errors.city}
          />
          <Input
            containerClassName={"!gap-1"}
            label="Post code"
            labelClass={"!text-sm !text-gray-700"}
            id="postCode"
            placeholder="Enter post code"
            {...register("postCode")}
            error={errors.postCode}
          />
          <Input
            className={'cursor-not-allowed'}
            containerClassName={"!gap-1"}
            label="Country"
            labelClass={"!text-sm !text-gray-700"}
            id="country"
            placeholder="Enter country"
            {...register("country")}
            error={errors.country}
            readOnly
          />
          <Input
            containerClassName={"!gap-1"}
            label="Street address"
            labelClass={"!text-sm !text-gray-700"}
            id="streetAddress"
            placeholder="Enter your street address"
            {...register("streetAddress")}
            error={errors.streetAddress}
          />

          <div className="flex gap-8 flex-col mt-8">
            <div className="flex items-center">
              <Checkbox
                id="newsletter"
                {...register("newsletter")}
                className="h-4 w-4 text-primary border-[#9CA3AF] rounded focus:ring-primary"
              />
              <label htmlFor="newsletter" className="ml-2 text-[#444444]">
                I would like to subscribe to the Newsletter list
              </label>
            </div>

            <Button type="submit" className="w-full">
              Register
            </Button>

            <div className="text-center text-sm font-medium">
              Already have an account?{" "}
              <Link
                href="/my-account/login?user_type=regular"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
