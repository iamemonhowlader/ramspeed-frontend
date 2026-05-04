"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormSelect from "../../components/Common/FormSelect";
import ImageUpload from "../../shop-management/change-logo/components/ImageUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import notImplemented from "@/lib/notImplemented";

// Zod schema for form validation
const schema = z.object({
  adLocation: z.string().min(1, "Ad location is required"),
  adLink: z.string().url("Invalid URL").min(1, "Ad link is required"),
});

const UploadAdForm = () => {
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

  const onSubmit = (data) => {
    notImplemented();
    console.log(data);
    reset();
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

        {/* Image upload (no validation) */}
        <ImageUpload label="" />

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
