"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/common/InputPassword";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// -----------------------------
// Zod schema for login form validation
// -----------------------------
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const UniversalLoginForm = () => {
  const router = useRouter();
  const { login } = useAuthStore();

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
      toast.success("Login successful");
      reset();
      router.push("/");
    } else {
      toast.error(result.message || "Login failed");
    }
  };

  return (
    <>
      <div className="lg:w-1/2">
        <Image
          src="/b2blogin.png"
          alt="Login"
          width={500}
          height={500}
          className="h-full w-full max-h-[866px] object-cover"
        />
      </div>
      <div className="lg:w-1/2">
        <div className="p-4 sm:p-12 lg:p-16 flex flex-col">
          <div className="max-w-md mx-auto w-full flex flex-col gap-6 lg:gap-12">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-5xl font-bold text-dark mb-6">
                Login at Ramspeed
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
            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Username (Changed from Email as per Laravel API) */}
              <Input
                label="Username"
                labelClass={"!text-sm !text-gray-700"}
                id="username"
                placeholder="Enter username"
                {...register("username")}
                error={errors.username}
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
                    href="/my-account/sign-up"
                    className="text-primary hover:underline font-medium"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversalLoginForm;
