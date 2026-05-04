// components/OrderStatCard.jsx
import React from "react";

/**
 * OrderStatCard Component
 *
 * A primary statistics card displaying a large metric with an icon.
 * Features a blue color scheme and prominent typography.
 *
 * @param {React.ComponentType} icon - Icon component to display
 * @param {string} label - Card label/title
 * @param {number} amount - Monetary amount to display
 * @returns {JSX.Element} Rendered stat card
 */
const OrderStatCard = ({ icon: Icon, label, amount }) => {
  return (
    <div
      className="
      /* Base styling */
      px-4 sm:px-6 md:px-8 lg:px-10
      py-4 sm:py-5 md:py-6
      bg-[#F4F7FF]
      rounded-lg sm:rounded-xl md:rounded-2xl
      text-[#396AFF]
      
      /* Responsive sizing */
      w-full sm:w-auto
      min-w-0
    "
    >
      {/* Icon container - responsive sizing */}
      <div
        className="
        /* Responsive dimensions */
        w-14 sm:w-18 md:w-20 lg:w-22
        h-14 sm:h-18 md:h-20 lg:h-22
        
        /* Layout */
        flex items-center justify-center
        
        /* Styling */
        rounded-full
        bg-[#396AFF]
      "
      >
        <Icon color="white" size={20} className={'scale-120 md:scale-150'} />
      </div>

      {/* Label text - responsive typography */}
      <p
        className="
        /* Responsive font sizes */
        text-base sm:text-lg md:text-2xl lg:text-3xl
        
        /* Spacing */
        font-bold
        mt-3 sm:mt-8 md:mt-10
        mb-1 sm:mb-5 md:mb-6
      "
      >
        {label}
      </p>

      {/* Amount text - responsive typography */}
      <p
        className="
        /* Responsive font sizes */
        text-3xl sm:text-4xl md:text-5xl
        
        /* Styling */
        font-bold
      "
      >
        € {amount}
      </p>
    </div>
  );
};

export default OrderStatCard;
