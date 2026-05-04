"use client";

import { Button } from "@/components/ui/button";
import notImplemented from "@/lib/notImplemented";
import React from "react";
import ImageUpload from "./ImageUpload";

const LogoChangeForm = () => {
  return (
    <div className="max-w-[408px]">
      <p className="text-black font-semibold md:text-2xl mb-6">
        Upload logo here
      </p>

      {/* upload images  */}
      <ImageUpload label="" />

      {/* actions  */}
      <div className="flex items-center gap-2 md:gap-5 mt-8 flex-col md:flex-row ">
        <Button
          onClick={() => notImplemented()}
          className={
            "bg-[#D0D5DD] flex-1 border-[#D0D5DD] text-black w-full md:w-auto"
          }
        >
          Choose Logo
        </Button>
        <Button
          className={"w-full flex-1 md:w-auto"}
          onClick={() => notImplemented()}
        >
          Upload Logo
        </Button>
      </div>
    </div>
  );
};

export default LogoChangeForm;
