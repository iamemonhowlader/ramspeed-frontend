"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import useAuthStore from "@/store/authStore";

// Validation Schema
const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .min(8, "Phone number is too short")
    .regex(/^[0-9+ ]+$/, "Invalid phone number"),
  email: z.string().email("Invalid email address"),
  city: z.string().min(1, "City is required"),
  postCode: z.string().min(1, "Post code is required"),
  country: z.union([z.string(), z.number()]).refine((val) => val !== "" && val !== null && val !== undefined, "Country is required"),
  address: z.string().min(1, "Address is required"),
});

const ProfileTab = () => {
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiFetch("/api/frontend/account");
        if (response.success && response.data) {
          const profile = response.data;
          setValue("fullName", profile.full_name || "");
          setValue("email", profile.email || "");
          setValue("phone", profile.phone || "");
          setValue("address", profile.address || "");
          setValue("city", profile.city || "");
          setValue("postCode", profile.post_code || "");
          setValue("country", profile.country || "");
        }
      } catch (error) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      // Convert country name to country ID
      const countryMap = {
        "Afghanistan": 1,
        "Albania": 2,
        "Algeria": 3,
        "Andorra": 4,
        "Angola": 5,
        "Antigua and Barbuda": 6,
        "Argentina": 7,
        "Armenia": 8,
        "Australia": 9,
        "Austria": 10,
        "Azerbaijan": 11,
        "Bahamas": 12,
        "Bahrain": 13,
        "Bangladesh": 17,
        "Barbados": 18,
        "Belarus": 19,
        "Belgium": 20,
        "Belize": 21,
        "Benin": 22,
        "Bhutan": 23,
        "Bolivia": 24,
        "Bosnia and Herzegovina": 25,
        "Botswana": 26,
        "Brazil": 27,
        "Brunei": 28,
        "Bulgaria": 29,
        "Burkina Faso": 30,
        "Burundi": 31,
        "Cambodia": 32,
        "Cameroon": 33,
        "Canada": 34,
        "Central African Republic": 35,
        "Chad": 36,
        "Chile": 37,
        "China": 38,
        "Colombia": 39,
        "Comoros": 40,
        "Congo": 41,
        "Costa Rica": 42,
        "Croatia": 43,
        "Cuba": 44,
        "Cyprus": 45,
        "Czech Republic": 46,
        "Denmark": 47,
        "Djibouti": 48,
        "Dominica": 49,
        "Dominican Republic": 50,
        "Ecuador": 51,
        "Egypt": 52,
        "El Salvador": 53,
        "Equatorial Guinea": 54,
        "Eritrea": 55,
        "Estonia": 56,
        "Ethiopia": 57,
        "Fiji": 58,
        "Finland": 59,
        "France": 60,
        "Gabon": 61,
        "Gambia": 62,
        "Georgia": 63,
        "Germany": 64,
        "Ghana": 65,
        "Greece": 66,
        "Grenada": 67,
        "Guatemala": 68,
        "Guinea": 69,
        "Guinea-Bissau": 70,
        "Guyana": 71,
        "Haiti": 72,
        "Honduras": 73,
        "Hungary": 74,
        "Iceland": 75,
        "India": 76,
        "Indonesia": 77,
        "Iran": 78,
        "Iraq": 79,
        "Ireland": 80,
        "Israel": 81,
        "Italy": 82,
        "Jamaica": 83,
        "Japan": 84,
        "Jordan": 85,
        "Kazakhstan": 86,
        "Kenya": 87,
        "Kiribati": 88,
        "Kuwait": 89,
        "Kyrgyzstan": 90,
        "Laos": 91,
        "Latvia": 92,
        "Lebanon": 93,
        "Lesotho": 94,
        "Liberia": 95,
        "Libya": 96,
        "Liechtenstein": 97,
        "Lithuania": 98,
        "Luxembourg": 99,
        "Madagascar": 100,
        "Malawi": 101,
        "Malaysia": 102,
        "Maldives": 103,
        "Mali": 104,
        "Malta": 105,
        "Marshall Islands": 106,
        "Mauritania": 107,
        "Mauritius": 108,
        "Mexico": 109,
        "Micronesia": 110,
        "Moldova": 111,
        "Monaco": 112,
        "Mongolia": 113,
        "Montenegro": 114,
        "Morocco": 115,
        "Mozambique": 116,
        "Myanmar": 117,
        "Namibia": 118,
        "Nauru": 119,
        "Nepal": 120,
        "Netherlands": 121,
        "New Zealand": 122,
        "Nicaragua": 123,
        "Niger": 124,
        "Nigeria": 125,
        "North Korea": 126,
        "Norway": 127,
        "Oman": 128,
        "Pakistan": 129,
        "Palau": 130,
        "Palestine": 131,
        "Panama": 132,
        "Papua New Guinea": 133,
        "Paraguay": 134,
        "Peru": 135,
        "Philippines": 136,
        "Poland": 137,
        "Portugal": 138,
        "Qatar": 139,
        "Romania": 140,
        "Russia": 141,
        "Rwanda": 142,
        "Saint Kitts and Nevis": 143,
        "Saint Lucia": 144,
        "Saint Vincent and the Grenadines": 145,
        "Samoa": 146,
        "San Marino": 147,
        "Sao Tome and Principe": 148,
        "Saudi Arabia": 149,
        "Senegal": 150,
        "Serbia": 151,
        "Seychelles": 152,
        "Sierra Leone": 153,
        "Singapore": 154,
        "Slovakia": 155,
        "Slovenia": 156,
        "Solomon Islands": 157,
        "Somalia": 158,
        "South Africa": 159,
        "South Korea": 160,
        "South Sudan": 161,
        "Spain": 162,
        "Sri Lanka": 163,
        "Sudan": 164,
        "Suriname": 165,
        "Swaziland": 166,
        "Sweden": 167,
        "Switzerland": 168,
        "Syria": 169,
        "Taiwan": 170,
        "Tajikistan": 171,
        "Tanzania": 172,
        "Thailand": 173,
        "Togo": 174,
        "Tonga": 175,
        "Trinidad and Tobago": 176,
        "Tunisia": 177,
        "Turkey": 178,
        "Turkmenistan": 179,
        "Tuvalu": 180,
        "Uganda": 181,
        "Ukraine": 182,
        "United Arab Emirates": 183,
        "United Kingdom": 184,
        "United States": 185,
        "Uruguay": 186,
        "Uzbekistan": 187,
        "Vanuatu": 188,
        "Vatican City": 189,
        "Venezuela": 190,
        "Vietnam": 191,
        "Yemen": 192,
        "Zambia": 193,
        "Zimbabwe": 194
      };

      const response = await apiFetch("/api/frontend/account/update", {
        method: "POST",
        body: JSON.stringify({
          full_name: data.fullName,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          post_code: data.postCode,
          country: countryMap[data.country] || 17 // Default to Bangladesh if not found
        }),
      });

      if (response.success) {
        toast.success("Profile updated successfully!");
        // Update local user state if needed
        if (user) {
          setUser({ ...user, full_name: data.fullName, email: data.email });
        }
      } else {
        toast.error(response.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;

  return (
    <div className="w-full">
      {/* Header */}
      <h3 className="border-b border-gray-200 font-semibold text-sm sm:text-base md:text-lg text-[#191C1F] px-3 sm:px-6 py-2 sm:py-[6px]">
        ACCOUNT SETTING
      </h3>

      {/* Profile Form */}
      <div className="p-3 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-10">
        <div className="flex justify-center md:justify-start">
          <Avatar className="size-28 md:size-30 xl:size-[176px]">
            <AvatarImage src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || "User")}&background=0068c8&color=fff`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6"
        >
          <div className="col-span-1 sm:col-span-2">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              {...register("fullName")}
              error={errors.fullName}
            />
          </div>
          <Input
            label="Phone Number"
            placeholder="Enter phone number"
            {...register("phone")}
            error={errors.phone}
          />
          <Input
            label="Email Address"
            placeholder="Enter email address"
            {...register("email")}
            error={errors.email}
          />
          <Input
            label="City"
            placeholder="Enter city"
            {...register("city")}
            error={errors.city}
          />
          <Input
            label="Post Code"
            placeholder="Enter post code"
            {...register("postCode")}
            error={errors.postCode}
          />
          <Input
            label="Country"
            placeholder="Enter country"
            {...register("country")}
            error={errors.country}
          />
          <Input
            label="Full Address"
            placeholder="Enter full address"
            {...register("address")}
            error={errors.address}
          />

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2 mt-2 sm:mt-4">
            <Button
              type="submit"
              className="w-full sm:w-auto text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileTab;
