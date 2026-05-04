"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";

const BackButton = ({ variant, children, ...props }) => {
  const router = useRouter();
  return (
    <Button variant={variant} onClick={() => router.back()} {...props}>
      {children || "Back"}
    </Button>
  );
};

export default BackButton;
