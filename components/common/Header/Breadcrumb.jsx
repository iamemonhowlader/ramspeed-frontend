"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

// Configuration for custom page titles and paths
const breadcrumbConfig = {
  "/": "Home",
  "/home": "Home",
  "/about": "About Us",
  "/shop-now": "Shop Now",
  "/flash-sale": "Flash Sale",
  "/repair-tracking": "Track Your Repair",
  // Add more custom mappings as needed
};

// Function to format path segments into readable titles
const formatPathSegment = (segment) => {
  if (!segment) return "";

  // Check if we have a custom title for this segment
  if (breadcrumbConfig[`/${segment}`]) {
    return breadcrumbConfig[`/${segment}`];
  }

  // Format the segment: replace hyphens with spaces and capitalize
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Breadcrumb = () => {
  const pathname = usePathname();

  // Generate breadcrumb items based on current path
  const breadcrumbItems = useMemo(() => {
    // Always start with Home
    const items = [{ href: "/", label: "Home" }];

    // If we're on the home page, return just Home
    if (pathname === "/" || pathname === "/home") {
      return items;
    }

    // Split the pathname and filter out empty segments
    const pathSegments = pathname
      .split("/")
      .filter((segment) => segment !== "");

    // Build breadcrumb items from path segments
    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Check if we have a custom title for the full path
      const customTitle = breadcrumbConfig[currentPath];
      const label = customTitle || formatPathSegment(segment);

      items.push({
        href: currentPath,
        label: label,
        isLast: index === pathSegments.length - 1,
      });
    });

    return items;
  }, [pathname]);

  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="flex flex-wrap justify-start items-center space-x-2 font-medium py-4 sm:py-6">
          {breadcrumbItems.map((item, index) => (
            <div key={item.href} className="flex items-center text-xs lg:text-base space-x-2">
              {index > 0 && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="m14.413 10.663-6.25 6.25a.939.939 0 1 1-1.328-1.328L12.42 10 6.836 4.413a.939.939 0 1 1 1.328-1.328l6.25 6.25a.94.94 0 0 1-.001 1.328"
                    fill="#CBD5E1"
                  />
                </svg>
              )}
              {item.isLast ? (
                <span className="text-white font-medium">{item.label}</span>
              ) : (
                <Link
                  href={item.href}
                  className="text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
