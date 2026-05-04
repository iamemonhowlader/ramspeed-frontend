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
import { useParams } from "next/navigation";

const schema = z.object({
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

const EditAccessLevel = () => {
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchAccessLevel = async () => {
      try {
        const response = await apiFetch(`/api/admin/access-levels/${id}`);
        if (response.success) {
          const data = response.data;
          setUserName(data.user?.full_name || "Unknown User");
          reset({
            menu: String(data.menu),
            featured: String(data.featured),
            news: String(data.news),
            shipping: String(data.shipping),
            banlist: String(data.banlist),
            user_account: String(data.user_account),
            user_level: String(data.user_level),
            members: String(data.members),
            suppliers: String(data.suppliers),
            BalanceSheet: String(data.BalanceSheet),
          });
        }
      } catch (error) {
        toast.error("Failed to load access level details");
      } finally {
        setLoading(false);
      }
    };
    fetchAccessLevel();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const response = await apiFetch(`/api/admin/access-levels/update/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.success) {
        toast.success("Access level updated successfully");
        window.location.href = "/administrator/dashboard/users-management/users/access-level";
      }
    } catch (error) {
      toast.error(error.message || "Failed to update access level");
    }
  };

  const yesNoOptions = [
    { label: "Yes", value: "1" },
    { label: "No", value: "0" },
  ];

  if (loading) return <div className="p-10 text-center">Loading permissions...</div>;

  return (
    <DashboardFormContainer
      title={`Edit Access Level: ${userName}`}
      subtitle="Modify module permissions for this user"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            {isSubmitting ? "Updating..." : "Update Permissions"}
          </Button>
        </div>
      </form>
    </DashboardFormContainer>
  );
};

export default EditAccessLevel;
