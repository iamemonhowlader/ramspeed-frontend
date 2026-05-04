// components/FormSelect.jsx
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

// options: array of { value, label }
// name: form field name
// control: RHF control
// label: label to show
// placeholder: select placeholder
// error: error message object
export default function FormSelect({
  name,
  control,
  label,
  options,
  placeholder,
  error,
  className,
  labelClass,
  rules,
  alignment = "col",
  itemClassname
}) {
  return (
    <div
      className={`flex gap-1 xl:gap-4 ${
        alignment === "row" ? "items-center" : ""
      } flex-${alignment}`}
    >
      <Label htmlFor={name} className={labelClass}>
        {label}
      </Label>
      <div>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className={className || ""}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem className={cn(itemClassname)} key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {error && <span className="text-red-500 text-[10px] md:text-[12px] ">{error.message}</span>}
      </div>
    </div>
  );
}
