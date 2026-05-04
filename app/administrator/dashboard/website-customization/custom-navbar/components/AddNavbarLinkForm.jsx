"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import notImplemented from "@/lib/notImplemented";

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

  const onSubmit = (data) => {
    notImplemented();
    console.log(data);
    reset();
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
