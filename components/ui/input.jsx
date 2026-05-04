import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

const Input = React.forwardRef(({
  containerClassName,
  className,
  type,
  id,
  label,
  labelClass,
  error,
  alignment = "col",
  ...props
}, ref) => {
  return (
    <div className={cn("flex flex-col gap-1 xl:gap-4", containerClassName)}>
      {!!label && (
        <Label htmlFor={id} className={cn("", labelClass)}>
          {label}
        </Label>
      )}
      <div>
        <input
          type={type}
          data-slot="input"
          id={id}
          className={cn(
            "file:text-foreground placeholder:text-gray-300 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-0",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",

            //custom
            `text-xs xl:text-lg font-semibold xl:px-5 xl:py-6 bg-white ${
              error ? "border-red-600" : ""
            }`,
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-red-500 text-[10px] md:text-xs">
            {error?.message}
          </span>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input";

export { Input };
