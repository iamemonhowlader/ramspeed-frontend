"use client";

import FormSelect from "@/app/administrator/dashboard/components/Common/FormSelect";
import DashboardFormContainer from "@/app/administrator/dashboard/components/DashboardFormContainer";
import InputPassword from "@/components/common/InputPassword";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { users } from "@/data/usersData";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character (!, @, #, $, %, ^, &, *)"
  );

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(1, "Username is required"),
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
    active: z.string().min(1, "Active status is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const EditUser = () => {
  const user = users[0];
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user.fullName,
      email: user.email,
      username: user.username,
      password: user.password,
      confirmPassword: user.password,
      active: "yes",
    },
  });

  const onSubmit = (data) => {
    toast.success("User updated successfully");
    console.log(data);
    reset();
  };

  const onCancel = () => {
    toast.info("User update canceled");
    reset();
  };

  return (
    <DashboardFormContainer
      title={"Edit users now"}
      subtitle={"Edit users today"}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 md:space-y-6"
      >
        <Input
          label="Name"
          id="name"
          placeholder="Mike onouritypeo"
          error={errors?.name}
          {...register("name")}
        />
        <Input
          label="Email"
          id="email"
          placeholder="Sales@Ramspeedcy.com"
          error={errors?.email}
          {...register("email")}
        />
        <Input
          label="Username"
          id="username"
          placeholder="60040401B"
          error={errors?.username}
          {...register("username")}
        />
        <InputPassword
          label="Password"
          id="password"
          placeholder="+3349499"
          error={errors?.password}
          {...register("password")}
        />
        <InputPassword
          label="Confirm Password"
          id="confirmPassword"
          placeholder="+3349499"
          error={errors?.confirmPassword}
          {...register("confirmPassword")}
        />

        <FormSelect
          name={"active"}
          control={control}
          label={"Active"}
          alignment="row"
          options={[
            {
              label: "Yes",
              value: "yes",
            },
            {
              label: "No",
              value: "no",
            },
          ]}
          placeholder={"Select"}
          error={errors?.active}
          rules={{ required: "Required" }}
        />

        {/* Action Buttons */}
        <div className="md:max-w-max ml-auto flex gap-2 xl:gap-4 flex-col md:flex-row w-full md:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </DashboardFormContainer>
  );
};

export default EditUser;
