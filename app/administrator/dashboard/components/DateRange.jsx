"use client";

// components/DateRange.jsx
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * DateRange Component
 *
 * A date range picker component with separate selects for day, month, and year.
 * Allows users to select "From" and "To" dates.
 *
 * @param {Function} onChange - Callback function that receives the latest date range value
 *                              in format: { from: "dd/mm/yyyy", to: "dd/mm/yyyy" }
 * @returns {JSX.Element} Rendered date range component
 */
const DateRange = ({
  className,
  onChange,
  fromLabel,
  toLabel,
  start = "//",
  end = "//",
}) => {
  // State for "From" date components

  const startArray = start.split("/");
  const endArray = end.split("/");

  const [fromDay, setFromDay] = useState(startArray[0] || "");
  const [fromMonth, setFromMonth] = useState(startArray[1] || "");
  const [fromYear, setFromYear] = useState(startArray[2] || "");

  // State for "To" date components
  const [toDay, setToDay] = useState(endArray[0] || "");
  const [toMonth, setToMonth] = useState(endArray[1] || "");
  const [toYear, setToYear] = useState(endArray[2] || "");

  /**
   * Handle changes to any date component and trigger onChange callback
   * Constructs the complete date range object and passes it to parent
   */
  const handleDateChange = (
    newFromDay,
    newFromMonth,
    newFromYear,
    newToDay,
    newToMonth,
    newToYear
  ) => {
    const dateRange = {
      from: `${newFromDay}/${newFromMonth}/${newFromYear}`,
      to: `${newToDay}/${newToMonth}/${newToYear}`,
    };
    if (!!onChange) {
      onChange(dateRange);
    }
  };

  /**
   * Handle "From" day change
   */
  const handleFromDayChange = (value) => {
    setFromDay(value);
    handleDateChange(value, fromMonth, fromYear, toDay, toMonth, toYear);
  };

  /**
   * Handle "From" month change
   */
  const handleFromMonthChange = (value) => {
    setFromMonth(value);
    handleDateChange(fromDay, value, fromYear, toDay, toMonth, toYear);
  };

  /**
   * Handle "From" year change
   */
  const handleFromYearChange = (value) => {
    setFromYear(value);
    handleDateChange(fromDay, fromMonth, value, toDay, toMonth, toYear);
  };

  /**
   * Handle "To" day change
   */
  const handleToDayChange = (value) => {
    setToDay(value);
    handleDateChange(fromDay, fromMonth, fromYear, value, toMonth, toYear);
  };

  /**
   * Handle "To" month change
   */
  const handleToMonthChange = (value) => {
    setToMonth(value);
    handleDateChange(fromDay, fromMonth, fromYear, toDay, value, toYear);
  };

  /**
   * Handle "To" year change
   */
  const handleToYearChange = (value) => {
    setToYear(value);
    handleDateChange(fromDay, fromMonth, fromYear, toDay, toMonth, value);
  };

  // Generate day options (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1).padStart(2, "0"),
  }));

  // Generate month options (1-12)
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, "0"),
    label: String(i + 1).padStart(2, "0"),
  }));

  // Generate year options (current year - 100 to current year + 10)
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 111 }, (_, i) => {
    const year = currentYear - 100 + i;
    return {
      value: String(year),
      label: String(year),
    };
  });

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-center gap-2 lg:gap-7 max-w-max md:max-w-full",
        className
      )}
    >
      {/* "From" Date Section */}
      <div className="flex items-center gap-2 justify-end md:justify-start w-full md:max-w-max">
        <Label>{fromLabel || "From"}</Label>
        <div className="flex items-center gap-3">
          {/* Day Select */}
          <div className="flex flex-col gap-1">
            <Select value={fromDay} onValueChange={handleFromDayChange}>
              <SelectTrigger className="py-0">
                <SelectValue placeholder="dd" />
              </SelectTrigger>
              <SelectContent>
                {dayOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Month Select */}
          <div className="flex flex-col gap-1">
            <Select value={fromMonth} onValueChange={handleFromMonthChange}>
              <SelectTrigger className="py-0">
                <SelectValue placeholder="mm" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Select */}
          <div className="flex flex-col gap-1">
            <Select value={fromYear} onValueChange={handleFromYearChange}>
              <SelectTrigger className="py-0">
                <SelectValue placeholder="yyyy" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* "To" Date Section */}
      <div className="flex items-center gap-2 justify-end md:justify-start w-full md:max-w-max">
        <Label>{toLabel || "To"}</Label>
        <div className="flex items-center gap-3">
          {/* Day Select */}
          <div className="flex flex-col gap-1">
            <Select value={toDay} onValueChange={handleToDayChange}>
              <SelectTrigger className="py-0">
                <SelectValue placeholder="dd" />
              </SelectTrigger>
              <SelectContent>
                {dayOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Month Select */}
          <div className="flex flex-col gap-1">
            <Select value={toMonth} onValueChange={handleToMonthChange}>
              <SelectTrigger className="py-0">
                <SelectValue placeholder="mm" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Year Select */}
          <div className="flex flex-col gap-1">
            <Select value={toYear} onValueChange={handleToYearChange}>
              <SelectTrigger className="py-0">
                <SelectValue placeholder="yyyy" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRange;
