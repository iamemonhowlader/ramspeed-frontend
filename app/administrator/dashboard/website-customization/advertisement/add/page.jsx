"use client";

import DashboardFormContainer from "@/app/administrator/dashboard/components/DashboardFormContainer";
import { Button } from "@/components/ui/button";
import FormSelect from "@/app/administrator/dashboard/components/Common/FormSelect";
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

const AddAdvertisement = () => {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
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
    router.push('/administrator/dashboard/website-customization/advertisement');
  };

  return (
    <DashboardFormContainer
      title="Add Advertisement"
      subtitle="Create a new advertisement for your website"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
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

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Ad link (Full URL)
          </label>
          <input
            type="url"
            placeholder="https://www.ad.com"
            {...register("adLink")}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {errors?.adLink && (
            <p className="text-red-500 text-sm">{errors.adLink.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-black font-semibold md:text-2xl lg:mb-4">
            Upload image here
          </label>
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

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 md:gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </DashboardFormContainer>
  );
};

export default AddAdvertisement;
