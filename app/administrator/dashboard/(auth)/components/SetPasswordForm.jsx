"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import notImplemented from "@/lib/notImplemented";
import InputPassword from "@/components/common/InputPassword";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

// Zod schema for validation
const schema = z.object({
  password: z.string().min(1, "New password is required"),
  confirmPassword: z.string().min(1, "Confirm new password is required"),
});

const SetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    notImplemented();
    console.log(data);
    reset();
  };

  return (
    <div className="w-[74vw] lg:w-[510px]">
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-6"
      >
        <InputPassword
          label="New Password"
          labelClass={"!text-base"}
          id="password"
          placeholder="New password"
          error={errors?.password}
          {...register("password")}
        />
        <InputPassword
          label="Confirm New Password"
          labelClass={"!text-base"}
          id="confirmPassword"
          placeholder="Confirm new password"
          error={errors?.confirmPassword}
          {...register("confirmPassword")}
        />

        <div className="flex items-center gap-2 md:gap-5 mt-8 flex-col md:flex-row ">
          <Button
            className={"w-full md:py-6 flex-1 md:w-auto"}
            type="submit"
            disabled={isSubmitting}
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SetPasswordForm;
