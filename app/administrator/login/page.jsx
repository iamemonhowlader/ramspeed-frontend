"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { apiFetch } from "@/lib/api";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/common/InputPassword";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiFetch("/api/login/admin", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.success) {
        setToken(response.token);
        setUser({
          ...response.user,
          type: response.user_type,
          table: 'admin_users'
        });
        toast.success(response.message || "Admin login successful!");
        router.push("/administrator/dashboard");
      } else {
        toast.error(response.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Side: Image & Branding */}
        <div className="lg:w-1/2 relative hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
            alt="Admin Portal"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex flex-col justify-end p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Administration Portal</h2>
            <p className="text-blue-100 text-lg max-w-md">
              Secure access to Ramspeedcy business management systems.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 sm:p-16">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Sign In
              </h1>
              <p className="text-gray-500">
                Please enter your administrator credentials to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                label="Username"
                labelClass="!text-sm !text-gray-700 font-medium"
                placeholder="Enter your username"
                {...register("username")}
                error={errors.username}
              />

              <InputPassword
                label="Password"
                labelClass="!text-sm !text-gray-700 font-medium"
                placeholder="Enter your password"
                {...register("password")}
                error={errors.password}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="keep-signed-in" />
                  <label htmlFor="keep-signed-in" className="text-sm text-gray-700 cursor-pointer">
                    Keep me signed in
                  </label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </div>
                ) : (
                  "Login to Dashboard"
                )}
              </Button>
            </form>

            <div className="pt-8 border-t border-gray-100 text-center lg:text-left">
              <p className="text-gray-400 text-xs uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Ramspeedcy | Enterprise Security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
