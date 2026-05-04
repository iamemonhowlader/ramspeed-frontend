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
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const SignInForm = () => {
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
    <div className="w-full lg:w-[510px]">
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-6"
      >
        <Input
          label="Username"
          labelClass={"!text-base"}
          id="username"
          placeholder="Enter your username"
          error={errors?.username}
          {...register("username")}
        />
        <InputPassword
          label="Password"
          labelClass={"!text-base"}
          id="password"
          placeholder="+3349499"
          error={errors?.password}
          {...register("password")}
        />

        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Checkbox />
            <p className="text-[#44444499] text-xs md:text-base">
              Keep me signed in
            </p>
          </div>

          <div className="ml-auto text-right">
            <Link
              className="text-primary underline text-xs md:text-base "
              href="/administrator/dashboard/forgot-password"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-5 md:mt-8 flex-col md:flex-row ">
          <Button
            className={"w-full flex-1 md:w-auto"}
            type="submit"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
