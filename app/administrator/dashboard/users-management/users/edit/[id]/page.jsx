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

import { useParams } from "next/navigation";
import { apiFetch } from "@/lib/api";

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    username: z.string().min(1, "Username is required"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
    active: z.string().min(1, "Active status is required"),
  })
  .refine((data) => {
    if (data.password && data.password !== data.confirmPassword) {
      return false;
    }
    return true;
  }, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const EditUser = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiFetch(`/api/admin/users/${id}`);
        if (response.success) {
          const u = response.data;
          reset({
            name: u.full_name || "",
            email: u.email || "",
            username: u.username || "",
            active: u.active || "yes",
          });
        }
      } catch (error) {
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        full_name: data.name,
        email: data.email,
        active: data.active,
        user_type: "staff"
      };

      if (data.password) {
        payload.password = data.password;
      }

      const response = await apiFetch(`/api/admin/users/update/${id}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.success) {
        toast.success("Admin user updated successfully");
        window.location.href = "/administrator/dashboard/users-management/users";
      }
    } catch (error) {
      toast.error(error.message || "Failed to update user");
    }
  };

  const onCancel = () => {
    window.location.href = "/administrator/dashboard/users-management/users";
  };

  if (loading) return <div className="p-10 text-center">Loading user details...</div>;

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
