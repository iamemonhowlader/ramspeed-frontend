"use client";
import { useState } from "react";

const B2BRight = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    <div className="lg:w-1/2 ">
      <div className="p-8 sm:p-12 lg:p-16 flex flex-col">
        <div className="max-w-md mx-auto w-full flex flex-col gap-6 lg:gap-12">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-5xl font-bold text-dark mb-6">
              Contact person details
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
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm"
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm"
              />
            </div>

            {/* Telephone Number */}
            <div>
              <label
                htmlFor="telephone"
                className="block text-sm font-medium text-dark mb-1.5"
              >
                Telephone number
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                placeholder="Enter your telephone number"
                className="w-full px-4 py-3 border border-[#9CA3AF] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-[#9CA3AF] text-sm"
              />
            </div>
            {/* Newsletter Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
                className="h-4 w-4 text-primary border-[#9CA3AF] rounded focus:ring-primary"
              />
              <label htmlFor="newsletter" className="ml-2 text-[#444444]">
                I would like to subscribe to the Newsletter list
              </label>
            </div>

            <div className="flex gap-8 flex-col mt-8">
              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-primary/90 transition-colors duration-200 font-medium text-sm focus:outline-none cursor-pointer"
              >
                Register
              </button>

              {/* Sign In Link */}
              <div className="text-center text-sm font-medium">
                Already have an account?{" "}
                <a
                  href="#"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default B2BRight;
