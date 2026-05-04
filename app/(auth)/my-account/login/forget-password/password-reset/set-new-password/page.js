"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import InputPassword from "@/components/common/InputPassword";
import { useRouter } from "next/navigation";

// -----------------------------
// Zod Schema for Password Validation
// -----------------------------
const schema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .regex(/(?=.*\d)/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SetNewPassword = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    console.log("Password updated:", data);
    setIsSuccess(false);
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call\
    setIsSuccess(true);
    reset();
    router.push('/my-account/login/forget-password/password-reset/password-updated-successfully')
  };

  const password = watch("newPassword");

  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto">
        <div className="py-8 sm:py-12 max-w-2xl mx-auto">
          <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="text-center">
                <div className="p-4 sm:p-12 lg:p-16 flex flex-col justify-center">
                  <h2 className="text-xl lg:text-3xl font-semibold mb-6">
                    Set new password
                  </h2>
                  <p className="leading-relaxed text-center mb-2 text-gray-600">
                    Must be at least 8 characters and include uppercase,
                    lowercase, and numbers.
                  </p>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 mt-6 md:mt-12 text-left"
                  >
                    {/* New Password */}
                    <InputPassword
                      label="New Password"
                      labelClass="!text-sm !text-gray-700"
                      id="newPassword"
                      placeholder="Enter new password"
                      error={errors?.newPassword}
                      {...register("newPassword")}
                    />

                    {/* Confirm Password */}
                    <InputPassword
                      label="Confirm Password"
                      labelClass="!text-sm !text-gray-700"
                      id="confirmPassword"
                      placeholder="Confirm new password"
                      error={errors?.confirmPassword}
                      {...register("confirmPassword")}
                    />

                    {/* Password Requirements */}
                    {password && (
                      <div className="space-y-2 md:mt-4">
                        <p className="text-sm font-medium text-gray-700">
                          Password Requirements:
                        </p>
                        <div className="space-y-1">
                          {[
                            {
                              test: password.length >= 8,
                              text: "At least 8 characters",
                            },
                            {
                              test: /(?=.*[a-z])/.test(password),
                              text: "One lowercase letter",
                            },
                            {
                              test: /(?=.*[A-Z])/.test(password),
                              text: "One uppercase letter",
                            },
                            {
                              test: /(?=.*\d)/.test(password),
                              text: "One number",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <span
                                className={`text-xs ${
                                  item.test ? "text-green-600" : "text-gray-400"
                                }`}
                              >
                                {item.test ? "✓" : "○"}
                              </span>
                              <span
                                className={`text-xs ${
                                  item.test ? "text-green-600" : "text-gray-500"
                                }`}
                              >
                                {item.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Success Message */}
                    {isSuccess && (
                      <p className="text-green-600 text-sm font-medium">
                        Password updated successfully!
                      </p>
                    )}

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Updating Password...
                        </div>
                      ) : (
                        "Confirm"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;
