"use client";
import { useState } from "react";

const B2BLeft = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    companyRegistrationNumber: "",
    companyVATNumber: "",
    streetAddress: "",
    city: "",
    postCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };
  return (
    <div className="lg:w-1/2 bg-[#f5faff]">
      <div className="p-8 sm:p-12 lg:p-16 flex flex-col">
        <div className="max-w-md mx-auto w-full flex flex-col gap-6 lg:gap-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-5xl font-bold text-dark mb-6">
              Register as B2B customer
            </h1>
            <p className="text-lg">
              You can reach us anytime via{" "}
              <a
                href="mailto:info@ramspeedcy.com"
                className="text-primary hover:underline"
              >
                info@ramspeedcy.com
              </a>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Company name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm bg-white"
              />
            </div>
            {/* Company Registration Number */}
            <div>
              <label
                htmlFor="companyRegistrationNumber"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Company registration number
              </label>
              <input
                type="text"
                id="companyRegistrationNumber"
                name="companyRegistrationNumber"
                value={formData.companyRegistrationNumber}
                onChange={handleChange}
                placeholder="Enter company registration number"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm bg-white"
              />
            </div>

            {/* Company VAT Number */}
            <div>
              <label
                htmlFor="companyVATNumber"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Company VAT number
              </label>
              <input
                type="text"
                id="companyVATNumber"
                name="companyVATNumber"
                value={formData.companyVATNumber}
                onChange={handleChange}
                placeholder="Enter VAT number"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm bg-white"
              />
            </div>

            {/* Street Address */}
            <div>
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Street address
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleChange}
                placeholder="Enter street address"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm bg-white"
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm bg-white"
              />
            </div>

            {/* Post Code */}
            <div>
              <label
                htmlFor="postCode"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Post code
              </label>
              <input
                type="text"
                id="postCode"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                placeholder="Enter your post code"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm bg-white"
              />
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter your country name"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm bg-white"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default B2BLeft;
