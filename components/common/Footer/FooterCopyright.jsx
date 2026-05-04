"use client";
import { usePathname } from "next/navigation";

const FooterCopyright = () => {
  const pathname = usePathname();
  if (pathname.includes("/administrator/dashboard")) {
    return <></>;
  }

  return (
    <div className="p-10 text-center">
      <p className="font-semibold">© Ecomall. All Rights Reserved.</p>
    </div>
  );
};

export default FooterCopyright;
