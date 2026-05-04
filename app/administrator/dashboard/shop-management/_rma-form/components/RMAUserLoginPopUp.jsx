"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/common/InputPassword";
import Link from "next/link";
import { toast } from "sonner";

// -----------------------------
// Zod schema for B2B login form validation
// -----------------------------
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const RMAUserLoginPopUp = ({ setCustomer, open, onOpenChange }) => {
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
  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    toast.success("Login successful");
    reset();
    setCustomer(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Customer Login at Ramspeed</DialogTitle>
          <div className="sm:p-12 lg:p-16 flex flex-col">
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

              {/*forgot password  */}
              <Link
                href="/my-account/login/forget-password"
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot password?
              </Link>

              {/* Login Button and Register Link */}
              <div className="flex gap-8 flex-col mt-8">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>

                <div className="text-center text-sm font-medium">
                  Don't have an account?{" "}
                  <Link
                    href="/my-account/sign-up?user_type=regular"
                    className="text-primary hover:underline font-medium"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default RMAUserLoginPopUp;
