import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

function Textarea({
  className,
  id,
  label,
  error,
  alignment = "col",
  ...props
}) {
  return (
    <div className={`flex flex-${alignment} gap-1 xl:gap-4`}>
      {!!label && (
        <Label htmlFor={id}>
          {label}
        </Label>
      )}
      <div>
        <textarea
          data-slot="textarea"
          id={id}
          className={cn(
            "border-input placeholder:text-gray-300 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

            //custom
            `text-xs xl:text-lg font-semibold  xl:px-5 xl:py-6 bg-white h-30 ${
              error ? "border-red-600" : ""
            }`,
            className
          )}
          {...props}
        />
        {error && (
          <span className="text-red-500 text-sm">{error?.message}</span>
        )}
      </div>
    </div>
  );
}

export { Textarea };
