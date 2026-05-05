"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

// Zod schema
const schema = z.object({
  fullLink: z.string().url("Invalid URL").min(1, "Full link is required"),
  linkName: z.string().min(1, "Link name is required"),
});

const AddNavbarLinkForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullLink: "",
      linkName: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await apiFetch('/api/admin/menu/store', {
        method: 'POST',
        body: JSON.stringify({
          name: data.linkName,
          namegr: data.linkName, // For now, same as English name
          active_page: data.fullLink,
          type: 'custom',
          parent: 0 // Top-level menu item
        })
      });

      if (result.success) {
        toast.success("Navbar link added successfully");
        reset();
        // Refresh the page to show new data
        window.location.reload();
      } else {
        toast.error(result.message || "Failed to add navbar link");
      }
    } catch (error) {
      console.error("Error adding navbar link:", error);
      toast.error("Failed to add navbar link");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[75vw] md:w-auto space-y-2"
    >
      <div className=" flex flex-col lg:flex-row items-center gap-2">
        <Input
          containerClassName={"w-full"}
          labelClass={"!text-sm"}
          label="Full Link"
          id="fullLink"
          placeholder="[https://example.com](https://example.com)"
          error={errors?.fullLink}
          {...register("fullLink")}
        />

        <Input
          containerClassName={"w-full"}
          labelClass={"!text-sm"}
          label="Link Name"
          id="linkName"
          placeholder="Example Link"
          error={errors?.linkName}
          {...register("linkName")}
        />
      </div>
      <Button
        className={"xl:py-6 w-full"}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};
export default AddNavbarLinkForm;
