import { cn } from "@/lib/utils";
import React from "react";

/**
 * DashboardHeading Component
 * Responsive heading with title, subtitle, and action buttons
 * Stacks vertically on mobile, horizontal on desktop
 *
 * @param {Object} props
 * @param {string} props.titlePrefix - Text before the label (default: "Manage your")
 * @param {string} props.label - Main label (highlighted in primary color)
 * @param {string} props.subtitle - Subtitle description
 * @param {React.ReactNode} props.children - Action buttons
 * @param {string} props.className - Additional CSS classes
 */
const DashboardHeading = ({
  titlePrefix = "Manage your",
  label,
  subtitle,
  children,
  className,
}) => {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:gap-6 md:flex-row lg:justify-between lg:items-start">
      {/* Title and Subtitle Section */}
      <div className="flex-1 min-w-0">
        <h1 className="text-dark font-bold text-2xl sm:text-3xl lg:text-4xl mb-2 break-words">
          {titlePrefix} <span className="text-primary">{label}</span>
        </h1>
        <p className="text-[#596464] text-sm sm:text-base break-words">
          {subtitle}
        </p>
      </div>

      {/* Action Buttons Section - Responsive flex */}
      <div
        className={cn(
          "flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto flex-shrink-0",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardHeading;
