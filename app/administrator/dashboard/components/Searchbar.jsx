"use client";

import React, { useEffect } from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import notImplemented from "@/lib/notImplemented";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Searchbar = ({ placeholder }) => {
  const form = useForm({
    defaultValues: { search: "" },
  });

  const onSubmit = (values) => {
    notImplemented();
  };

  useEffect(() => {
    if (form.formState.errors.search) {
      toast.warning("search field is empty");
    }
  }, [form.formState.errors.search]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-2 w-full sm:flex-row sm:items-center"
      >
        {/* Search Input Field */}
        <FormField
          control={form.control}
          name="search"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="w-full md:w-auto">
              <div className="relative w-full sm:w-64 md:w-72 lg:w-80 xl:w-96">
                <Input
                  placeholder={placeholder || "Search by name"}
                  {...field}
                  className={`pr-10 py-4 sm:py-5 w-full text-sm sm:text-base focus-visible:ring-0 focus-visible:ring-offset-0 ${
                    form.formState.errors.search ? "border-red-500" : ""
                  }`}
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  <SearchIcon size={18} />
                </span>
              </div>
              <FormMessage className="text-xs mt-1" />
            </FormItem>
          )}
        />

        {/* Search Button */}
        <Button
          size="lg"
          type="submit"
          className="w-full sm:w-auto py-2 sm:py-2.5 text-sm sm:text-base font-semibold"
        >
          Search
        </Button>
      </form>
    </Form>
  );
};

export default Searchbar;
