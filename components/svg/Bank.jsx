import React from "react";

const Bank = ({ color, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        d="M8.6665 13.334H5.99984V22.6673H8.6665V13.334ZM16.6665 13.334H13.9998V22.6673H16.6665V13.334ZM27.9998 25.334H2.6665V28.0006H27.9998V25.334ZM24.6665 13.334H21.9998V22.6673H24.6665V13.334ZM15.3332 4.34732L22.2798 8.00065H8.3865L15.3332 4.34732ZM15.3332 1.33398L2.6665 8.00065V10.6673H27.9998V8.00065L15.3332 1.33398Z"
        fill={color}
      />
    </svg>
  );
};

export default Bank;
