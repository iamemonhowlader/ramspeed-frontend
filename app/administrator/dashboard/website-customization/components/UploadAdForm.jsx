"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormSelect from "../../components/Common/FormSelect";
import ImageUpload from "../../shop-management/change-logo/components/ImageUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

// Zod schema for form validation
const schema = z.object({
  adLocation: z.string().min(1, "Ad location is required"),
  adLink: z.string().url("Invalid URL").min(1, "Ad link is required"),
  image: z.any().refine((file) => file?.length > 0, "Image is required"),
});

const UploadAdForm = () => {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      adLocation: "",
      adLink: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('ad_location', data.adLocation);
      formData.append('ad_link', data.adLink);
      
      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
      }

      const result = await apiFetch('/api/admin/advertisements/store', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      });

      if (result.success) {
        toast.success("Advertisement added successfully");
        reset();
        setUploadedImage(null);
        router.push('/administrator/dashboard/website-customization/advertisement');
      } else {
        toast.error(result.message || "Failed to add advertisement");
      }
    } catch (error) {
      console.error("Error adding advertisement:", error);
      toast.error("Failed to add advertisement");
    }
  };

  const onCancel = () => {
    reset();
  };

  return (
    <div className="w-[70vw] lg:w-[510px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-6"
      >
        <FormSelect
          name="adLocation"
          control={control}
          label="Advert location"
          itemClassname={"text-[10px] md:text-base"}
          placeholder="Advert location"
          error={errors?.adLocation}
          className={"w-full"}
          options={[
            {
              label: "Banner --> (1540*500)",
              value: "banner",
            },
            {
              label: "Middle (Under the Banner) --> (750*750)",
              value: "middle",
            },
            {
              label: "Top (deals of the day section) --> (750*350)",
              value: "dealsOfTheDayTop",
            },
            {
              label: "Bottom 1st (deals of the day section) --> (350*350)",
              value: "dealsOfTheDayBottom1",
            },
            {
              label: "Bottom 2nd (deals of the day section) --> (350*350)",
              value: "dealsOfTheDayBottom2",
            },
            {
              label:
                "Middle 1st (Under the deals of the day section) --> (350*450)",
              value: "middle1",
            },
            {
              label:
                "Middle 2nd (Under the deals of the day section) --> (350*450)",
              value: "middle2",
            },
            {
              label:
                "Middle 3rd (Under the deals of the day section) --> (350*450)",
              value: "middle3",
            },
            {
              label:
                "Middle 4th (Under the deals of the day section) --> (350*450)",
              value: "middle4",
            },
            {
              label: "Bottom (Featured Section) --> (350*350)",
              value: "featuredBottom",
            },
            {
              label: "Left (Trending Section) --> (750*390)",
              value: "trendingLeft",
            },
            {
              label: "Right (Trending Section) --> (750*390)",
              value: "trendingRight",
            },
          ]}
        />

        <Input
          label="Ad link (Full URL)"
          id="adLink"
          placeholder="https://www.ad.com"
          error={errors?.adLink}
          {...register("adLink")}
        />

        <p className="text-black font-semibold md:text-2xl  lg:mb-4">
          Upload image here
        </p>

        {/* Image upload with validation */}
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setUploadedImage(e.target.files[0]);
              }
            }}
          />
          {errors?.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
          {uploadedImage && (
            <div className="mt-2">
              <img 
                src={URL.createObjectURL(uploadedImage)} 
                alt="Preview" 
                className="w-full h-32 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        {/* actions */}
        <div className="flex items-center gap-2 md:gap-5 mt-8 flex-col md:flex-row ">
          <Button
            onClick={onCancel}
            className={
              "bg-[#D0D5DD] flex-1 border-[#D0D5DD] text-black w-full md:w-auto"
            }
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            className={"w-full flex-1 md:w-auto"}
            type="submit"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadAdForm;
