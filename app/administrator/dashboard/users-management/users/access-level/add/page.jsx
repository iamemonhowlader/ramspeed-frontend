"use client";

import FormSelect from "@/app/administrator/dashboard/components/Common/FormSelect";
import DashboardFormContainer from "@/app/administrator/dashboard/components/DashboardFormContainer";
import { Button } from "@/components/ui/button";
import { apiFetch } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  uid: z.string().min(1, "User is required"),
  menu: z.string().min(1, "Required"),
  featured: z.string().min(1, "Required"),
  news: z.string().min(1, "Required"),
  shipping: z.string().min(1, "Required"),
  banlist: z.string().min(1, "Required"),
  user_account: z.string().min(1, "Required"),
  user_level: z.string().min(1, "Required"),
  members: z.string().min(1, "Required"),
  suppliers: z.string().min(1, "Required"),
  BalanceSheet: z.string().min(1, "Required"),
});

const AddAccessLevel = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      menu: "0",
      featured: "0",
      news: "0",
      shipping: "0",
      banlist: "0",
      user_account: "0",
      user_level: "0",
      members: "0",
      suppliers: "0",
      BalanceSheet: "0",
    },
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiFetch("/api/admin/users");
        if (response.success) {
          // In a real scenario, we might want to filter users who already have an access level
          setUsers(response.data.data || response.data);
        }
      } catch (error) {
        toast.error("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await apiFetch("/api/admin/access-levels/store", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.success) {
        toast.success("Access level assigned successfully");
        window.location.href = "/administrator/dashboard/users-management/users/access-level";
      }
    } catch (error) {
      toast.error(error.message || "Failed to assign access level");
    }
  };

  const yesNoOptions = [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ];

  return (
    <DashboardFormContainer
      title="Assign Access Level"
      subtitle="Define module permissions for an admin user"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            name="uid"
            control={control}
            label="Select User"
            options={users.map((u) => ({ label: u.full_name, value: String(u.id) }))}
            placeholder={loadingUsers ? "Loading users..." : "Select a user"}
          />

          <FormSelect name="members" control={control} label="Members Access" options={yesNoOptions} />
          <FormSelect name="news" control={control} label="News Access" options={yesNoOptions} />
          <FormSelect name="shipping" control={control} label="Shipping Access" options={yesNoOptions} />
          <FormSelect name="suppliers" control={control} label="Suppliers Access" options={yesNoOptions} />
          <FormSelect name="menu" control={control} label="Menu Access" options={yesNoOptions} />
          <FormSelect name="featured" control={control} label="Featured Access" options={yesNoOptions} />
          <FormSelect name="banlist" control={control} label="Banlist Access" options={yesNoOptions} />
          <FormSelect name="user_account" control={control} label="User Account Access" options={yesNoOptions} />
          <FormSelect name="user_level" control={control} label="User Level Access" options={yesNoOptions} />
          <FormSelect name="BalanceSheet" control={control} label="Balance Sheet Access" options={yesNoOptions} />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => window.location.href = "/administrator/dashboard/users-management/users/access-level"}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Assigning..." : "Assign Permissions"}
          </Button>
        </div>
      </form>
    </DashboardFormContainer>
  );
};

export default AddAccessLevel;
