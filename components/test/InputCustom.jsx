import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputCustom = ({ form, label, id, checkBox, children }) => {
  const [showPassword, setShowPassword] = useState(false);

  if (id.includes("password") || id.includes("confirmPassword")) {
    return (
      <FormField
        control={form.control}
        name={id}
        render={({ field }) => {
          const isActive = field.value && field.value.length > 0;
          return (
            <FormItem className="relative">
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    id={id}
                    className="peer h-10 md:h-14 focus:outline-none focus:border-none text-[rgba(33,43,54,1)] text-base font-normal"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>

                  {/* Label */}
                  <FormLabel
                    htmlFor={id}
                    className={`absolute left-3 transition-all text-[rgba(145,158,171,1)] px-1
                                            ${
                                              isActive
                                                ? "top-0 -translate-y-1/2 text-xs bg-white"
                                                : "top-1/2 text-base -translate-y-1/2 peer-focus:top-0 peer-focus:text-xs peer-focus:bg-white"
                                            }`}
                  >
                    {label}
                  </FormLabel>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    );
  }

  if (checkBox) {
    return (
      <FormField
        control={form.control}
        name={id}
        render={({ field }) => (
          <FormItem className="flex items-center space-x-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel className="text-xs md:text-sm text-[rgba(33,43,54,1)] font-normal">
              {children}
            </FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <FormField
      control={form.control}
      name={id}
      render={({ field }) => {
        const isActive = field.value && field.value.length > 0;

        return (
          <FormItem className="relative w-full">
            <FormControl>
              <div className="relative">
                {/* Input */}
                <Input
                  {...field}
                  id={id}
                  className="peer h-10 md:h-14 focus:outline-none focus:border-none text-[rgba(33,43,54,1)] text-base font-normal"
                />

                {/* Label */}
                <FormLabel
                  htmlFor={id}
                  className={`absolute left-3 transition-all text-[rgba(145,158,171,1)] px-1
                                            ${
                                              isActive
                                                ? "top-0 -translate-y-1/2 text-xs bg-white"
                                                : "top-1/2 text-base -translate-y-1/2 peer-focus:top-0 peer-focus:text-xs peer-focus:bg-white"
                                            }
              `}
                >
                  {label}
                </FormLabel>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputCustom;
