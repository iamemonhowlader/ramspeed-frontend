import React, { useState } from "react";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

const InputPassword = React.forwardRef(({
  containerClassName,
  id,
  label,
  labelClass,
  error,
  ...props
}, ref) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className={cn("flex flex-col gap-1 xl:gap-4 w-full", containerClassName)}
    >
      {!!label && (
        <Label htmlFor={id} className={cn("", labelClass)}>
          {label}
        </Label>
      )}
      <div className="relative w-full ">
        <Input id={id} type={show ? "text" : "password"} ref={ref} {...props} />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600`}
          tabIndex={-1}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <span className="text-red-500 text-[10px] md:text-xs">
          {error?.message}
        </span>
      )}
    </div>
  );
});

InputPassword.displayName = "InputPassword";

export default InputPassword;