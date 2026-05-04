"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import notImplemented from "@/lib/notImplemented";
import { useRouter } from "next/navigation";

// Zod schema for validation
const schema = z.object({
  email: z.string().email("Invalid email address"),
});

const EmailSubmitForm = () => {
  const router = useRouter();
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
    router.push("/administrator/dashboard/password-reset");
  };

  return (
    <div className="w-full lg:w-[510px]">
      {" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-6"
      >
        <Input
          label="Email"
          labelClass={"!text-base"}
          id="email"
          placeholder="Enter your email address"
          error={errors?.email}
          {...register("email")}
        />
        <div className="flex items-center gap-2 md:gap-5 flex-col md:flex-row ">
          <Button
            className={"w-full flex-1 md:w-auto"}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
export default EmailSubmitForm;
