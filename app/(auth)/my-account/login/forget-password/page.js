"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";


// -----------------------------
// Zod schema for forget password form
// -----------------------------
const schema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const ForgetPassword = () => {
  const router = useRouter();
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
    reset();
    router.push("/my-account/login/forget-password/password-reset");
  };

  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto">
        <div className="py-8 sm:py-12 max-w-2xl mx-auto">
          <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="text-center">
                <div className="p-4 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="w-full">
                    <h2 className="text-xl lg:text-3xl font-semibold mb-6">
                      Forgot password
                    </h2>

                    <p className="leading-relaxed text-center">
                      No worries, we will send you reset instructions
                    </p>

                    {/* Form */}
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4 lg:space-y-8 mt-6 md:mt-12 text-left"
                      noValidate
                    >
                      {/* Email Address */}
                      <Input
                        label="Email address"
                        labelClass={"!text-sm !text-gray-700"}
                        id="email"
                        placeholder="Enter email address"
                        {...register("email")}
                        error={errors.email}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Reset"}
                      </Button>

                      <p className="text-center">
                        <Link
                          href="/my-account/login"
                          className="text-primary text-sm hover:text-primary/90 font-medium hover:underline"
                        >
                          Back to login
                        </Link>
                      </p>
                    </form>
                    {/* End Form */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
