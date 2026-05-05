"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const Logo = () => {
  const [logoPath, setLogoPath] = useState("/logo.jpg");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await apiFetch("/api/admin/logo");
        if (response.success) {
          const logo = response.data.find((l) => l.id == 1); // Everywhere logo
          if (logo && logo.path) {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
            const fullPath = logo.path.startsWith('http') ? logo.path : `${baseUrl}/${logo.path}`;
            setLogoPath(fullPath);
          }
        }
      } catch (error) {
        console.error("Failed to fetch logo:", error);
      }
    };
    fetchLogo();
  }, []);

  return (
    <Link
      href="/"
      className="cr-logo flex items-center justify-center lg:justify-start"
    >
      <Image
        src={logoPath}
        alt="logo"
        width={297}
        height={100}
        className="logo block h-auto w-auto max-w-[150px] sm:max-w-[200px] md:max-w-[250px] lg:max-w-[297px] max-h-[60px] sm:max-h-[80px] lg:max-h-[100px] object-contain"
        unoptimized // Necessary for external images or if we don't want to configure next.config.js for dynamic paths
      />
    </Link>
  );
};

export default Logo;
