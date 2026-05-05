"use client";

import TrendingTags from "@/components/Widgets/TrendingTags/TrendingTags";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FooterCopyright from "./FooterCopyright";

const navigationData = [
  {
    category: "About Us",
    links: [
      { link_text: "About Us", link: "/about-us" },
      { link_text: "Contact us", link: "/contact-us" },
    ],
  },
  {
    category: "Support",
    links: [
      { link_text: "Track your repair", link: "/track-repair" },
      { link_text: "Contact us", link: "/contact-us" },
      { link_text: "Repair terms", link: "/repair-terms" },
      { link_text: "Haul Away", link: "/haul-away" },
      { link_text: "Security Center", link: "/security-center" },
      { link_text: "Contact", link: "/contact" },
    ],
  },
  {
    category: "Order",
    links: [
      { link_text: "Check Order", link: "/check-order" },
      { link_text: "Delivery & Pickup", link: "/delivery-pickup" },
      { link_text: "Returns", link: "/returns" },
      { link_text: "Exchanges", link: "/exchanges" },
      { link_text: "Gift Cards", link: "/gift-cards" },
    ],
  },
  {
    category: "Terms & Policies",
    links: [
      { link_text: "Privacy Policy", link: "/privacy-policy" },
      { link_text: "Limited Warranty", link: "/limited-warranty" },
      {
        link_text: "Returns and Cancellation Policy",
        link: "/returns-cancellation-policy",
      },
      { link_text: "Developers", link: "/developers" },
    ],
  },
];
const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes("/administrator/dashboard")) {
    return <></>;
  }

  return (
    <>
      <div className="bg-[#F8F8F8]">
        <div className="w-full mx-auto">
          <div className="py-8 sm:py-12  border-y border-[#ebebeb]">
            <footer className="px-4 sm:px-0 w-full text-sm container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-14">
                <div className="sm:col-span-1 lg:col-span-2">
                  <Link href="/">
                    <Image
                      src="/logo.jpg"
                      alt="logo"
                      width={297}
                      height={100}
                      className="logo block h-auto w-auto max-w-[297px] max-h-[100px] object-contain max-[576px]:max-w-[200px]"
                    />
                  </Link>
                  <p className="text-sm/7 mt-6 font-semibold text-black">
                    <Link href="mailto:Info@ramLinkdcy.com">
                      Info@ramspeedcy.com
                    </Link>
                  </p>
                  <p className="text-sm/7 mt-2 font-semibold  text-black">
                    <Link href="tel:+35724400601">+357 24-400601</Link>
                  </p>
                </div>

                {navigationData.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col lg:items-center lg:justify-start"
                    >
                      <div className="flex flex-col text-sm space-y-2.5">
                        <h2 className="font-semibold mb-6 text-black">
                          {item.category}
                        </h2>
                        {item.links.map((link, index) => (
                          <a
                            key={index}
                            className="hover:text-black transition font-medium "
                            href="#"
                          >
                            {link.link_text}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
              <TrendingTags />
            </footer>
          </div>
          <FooterCopyright />
        </div>
      </div>
    </>
  );
};

export default Footer;
