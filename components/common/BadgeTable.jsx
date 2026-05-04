import { cn } from "@/lib/utils";
import React from "react";

const BadgeTable = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        " bg-[#0068C8] text-white px-3 py-1 rounded-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default BadgeTable;
