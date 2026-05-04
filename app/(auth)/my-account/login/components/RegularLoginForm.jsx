"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/common/InputPassword";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

// -----------------------------
// Zod schema for login form validation
// -----------------------------
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

import { toast } from "sonner";
import useAuthStore from "@/store/authStore";

const RegularLoginForm = () => {
  const router = useRouter();
  const { login, redirectPath, clearRedirectPath } = useAuthStore();

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
  });

  // -----------------------------
  // Form submission handler
  // -----------------------------
  const onSubmit = async (data) => {
    const result = await login(data);
    
    if (result.success) {
      toast.success("Logged in successfully!");
      const target = redirectPath || "/";
      clearRedirectPath();
      router.push(target);
    } else {
      toast.error(result.message || "Invalid credentials");
    }
  };

  return (
    <div className="lg:w-1/2">
      {" "}
      <div className="p-4 sm:p-12 lg:p-16 flex flex-col">
        {" "}
        <div className="max-w-md mx-auto w-full flex flex-col gap-6 lg:gap-12">
          {/* Header */}{" "}
          <div className="text-center">
            {" "}
            <h1 className="text-2xl sm:text-5xl font-bold text-dark mb-6">
              Retail customer login{" "}
            </h1>{" "}
            <p className="text-lg">
              You can reach us anytime via{" "}
              <a
                href="mailto:info@ramspeedcy.com"
                className="text-primary hover:underline"
              >
                info@ramspeedcy.com
              </a>{" "}
            </p>{" "}
          </div>
          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Address */}
            <Input
              label="Email address"
              labelClass={"!text-sm !text-gray-700"}
              id="email"
              placeholder="Enter email address"
              {...register("email")}
              error={errors.email}
            />

            {/* Password */}
            <InputPassword
              label="Password"
              labelClass={"!text-sm !text-gray-700"}
              id="password"
              placeholder="Enter password"
              {...register("password")}
              error={errors.password}
            />

            {/* keep sign in and forgot password  */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox />
                <p className="text-sm text-gray-700">Keep me signed in</p>
              </div>
              <Link
                href="/my-account/login/forget-password"
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button and Link */}
            <div className="flex gap-8 flex-col mt-8">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <div className="text-center text-sm font-medium">
                Don't have an account?{" "}
                <Link
                  href="/my-account/sign-up"
                  className="text-primary hover:underline font-medium"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegularLoginForm;
