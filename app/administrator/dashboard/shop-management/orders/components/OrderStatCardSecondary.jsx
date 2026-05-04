// components/OrderStatCardSecondary.jsx
import React from "react";

/**
 * OrderStatCardSecondary Component
 *
 * A secondary statistics card displaying a metric with a custom-colored icon.
 * Designed for horizontal layout with icon and details side-by-side.
 * Supports dynamic color theming via props.
 *
 * @param {React.ComponentType} icon - Icon component to display
 * @param {string} label - Card label/title
 * @param {number} amount - Monetary amount to display
 * @param {string} color - Hex color for the amount text
 * @param {string} iconBg - Hex color for the icon background
 * @returns {JSX.Element} Rendered stat card
 */
const OrderStatCardSecondary = ({
  icon: Icon,
  label,
  amount,
  color,
  iconBg,
}) => {
  return (
    <div
      className="
      /* Base styling */
      p-4 sm:p-5 md:p-6 lg:p-7
      bg-white
      border border-[#D0D5DD]
      
      /* Layout */
      flex items-center
      gap-3 sm:gap-4 md:gap-5 lg:gap-6
      
      /* Responsive sizing */
      w-full 
      hover:scale-103 transition-transform duration-300 hover:shadow-md
    "
    >
      {/* Icon container - responsive sizing */}
      <div
        className="
          /* Responsive dimensions */
          p-2 sm:p-3 md:p-4
          
          /* Layout */
          flex items-center justify-center
          flex-shrink-0
          
          /* Styling */
          rounded-md
          max-w-max
        "
        style={{ backgroundColor: iconBg || '#E7EDFF' }}
      >
        <Icon color={color || '#0068C8'} />
      </div>

      {/* Content wrapper - responsive layout */}
      <div
        className="
        /* Layout */
        flex flex-col sm:flex-row
        items-start sm:items-center
        justify-between
        
        /* Responsive spacing */
        gap-2 sm:gap-0
        
        /* Sizing */
        w-full
        min-w-0
      "
      >
        {/* Label text - responsive typography */}
        <p
          className="
          /* Responsive font sizes */
          text-sm sm:text-base md:text-lg
          
          /* Styling */
          font-semibold
          text-[#344054]
        "
        >
          {label}
        </p>

        {/* Amount text - responsive typography */}
        <p
          className="
            /* Responsive font sizes */
            text-base sm:text-lg md:text-xl
            
            /* Styling */
            font-bold
            flex-shrink-0
          "
          style={{ color: color }}
        >
          € {amount}
        </p>
      </div>
    </div>
  );
};

export default OrderStatCardSecondary;
