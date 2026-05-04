"use client";

import HeaderCategories from "@/components/common/Header/HeaderCategories";
import { Plus } from "lucide-react";
import { useState } from "react";

const ShippingAddress = () => {
  const [clientData, setClientData] = useState({
    existingClient: "",
    vatPercentage: "",
  });

  const [shippingData, setShippingData] = useState({
    fullName: "",
    address: "",
    postCode: "",
    city: "",
    country: "Cyprus",
  });

  const [errors, setErrors] = useState({});
  const [showNewUserForm, setShowNewUserForm] = useState(false);
  const [newUserData, setNewUserData] = useState({
    fullName: "",
    companyName: "",
    address: "",
    vatNumber: "",
    city: "",
    country: "Cyprus",
    email: "",
    telephone: "",
    vatPercentage: "",
  });

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Client validation
    if (!clientData.existingClient.trim()) {
      newErrors.existingClient = "Client name is required";
    }

    // Shipping validation
    if (!shippingData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!shippingData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!shippingData.postCode.trim()) {
      newErrors.postCode = "Post code is required";
    }
    if (!shippingData.city.trim()) {
      newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateNewUserForm = () => {
    const newErrors = {};

    // New user validation
    if (!newUserData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!newUserData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    if (!newUserData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!newUserData.vatNumber.trim()) {
      newErrors.vatNumber = "VAT number is required";
    }
    if (!newUserData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!newUserData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(newUserData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!newUserData.telephone.trim()) {
      newErrors.telephone = "Telephone is required";
    }
    if (!newUserData.vatPercentage) {
      newErrors.vatPercentage = "VAT percentage is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClient = () => {
    if (clientData.existingClient.trim()) {
      console.log("Saving client:", clientData);
      // Add your save client logic here
    }
  };

  const handleAddNewClient = () => {
    setShowNewUserForm(true);
    setErrors({});
    console.log("Opening new client form");
  };

  const handleSaveNewUser = () => {
    if (validateNewUserForm()) {
      console.log("Saving new user:", newUserData);
      // Add your save new user logic here
      setShowNewUserForm(false);
      // Reset form
      setNewUserData({
        fullName: "",
        companyName: "",
        address: "",
        vatNumber: "",
        city: "",
        country: "Cyprus",
        email: "",
        telephone: "",
        vatPercentage: "",
      });
    }
  };

  const handleCancelNewUser = () => {
    setShowNewUserForm(false);
    setErrors({});
    // Reset form
    setNewUserData({
      fullName: "",
      companyName: "",
      address: "",
      vatNumber: "",
      city: "",
      country: "Cyprus",
      email: "",
      telephone: "",
      vatPercentage: "",
    });
  };

  const handleProceed = () => {
    if (validateForm()) {
      console.log("Form data:", { clientData, shippingData });
      // Add your proceed logic here
    }
  };

  return (
    <>
      <HeaderCategories />
      <div className="bg-[#F8F8F8] min-h-screen">
        <div className="container mx-auto px-4 lg:px-0 py-8 sm:py-12">
          <div className="max-w-6xl mx-auto shadow-sm rounded-2xl">
            <div className="flex flex-col lg:flex-row">
              {/* Left Column - Client Details */}
              <div className="bg-[#f5faff] p-6 sm:p-10 flex-1 flex flex-col items-center justify-center">
                {!showNewUserForm ? (
                  <>
                    <h2 className="text-2xl sm:text-5xl font-bold text-dark mb-12">
                      Enter client details
                    </h2>

                    <div className="flex gap flex-col gap-12">
                      {/* Existing Client Input */}
                      <div className="flex gap-6 items-end">
                        <input
                          type="text"
                          name="existingClient"
                          value={clientData.existingClient}
                          onChange={handleClientChange}
                          placeholder="Enter existing client name"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                            errors.existingClient
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        <div className="flex items-center gap-4">
                          <button
                            onClick={handleAddNewClient}
                            className="flex items-center gap-2 px-4 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors duration-200 text-sm whitespace-nowrap h-[48px]"
                          >
                            <Plus className="text-white" />
                            Add new client
                          </button>
                        </div>
                        {/* {errors.existingClient && (
                          <p className="text-red-500 text-sm">
                            {errors.existingClient}
                          </p>
                        )} */}
                      </div>

                      {/* VAT Percentage */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium ">
                          Vat percentage
                        </label>
                        <select
                          name="vatPercentage"
                          value={clientData.vatPercentage}
                          onChange={handleClientChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark bg-white"
                        >
                          <option value="">
                            Set the vat percentage form here
                          </option>
                          <option value="0">0%</option>
                          <option value="19">19%</option>
                        </select>
                      </div>

                      {/* Save Client Button */}
                      <button
                        onClick={handleSaveClient}
                        className="w-full py-3 px-5 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors duration-200 text-sm uppercase tracking-wide"
                      >
                        Save as client
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl sm:text-5xl font-bold text-dark mb-8">
                      Enter client details
                    </h2>

                    <div className="w-full space-y-4 flex-1 flex flex-col min-h-0">
                      <div className="space-y-4 flex-1 overflow-y-auto pr-2 -mr-2">
                        {/* Full Name */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-dark">
                            Full name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={newUserData.fullName}
                            onChange={handleNewUserChange}
                            placeholder="Enter full name"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                              errors.fullName
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.fullName && (
                            <p className="text-red-500 text-sm">
                              {errors.fullName}
                            </p>
                          )}
                        </div>

                        {/* Company Name */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-dark">
                            Company name
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={newUserData.companyName}
                            onChange={handleNewUserChange}
                            placeholder="Enter company name"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                              errors.companyName
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.companyName && (
                            <p className="text-red-500 text-sm">
                              {errors.companyName}
                            </p>
                          )}
                        </div>

                        {/* Address */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-dark">
                            Address
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={newUserData.address}
                            onChange={handleNewUserChange}
                            placeholder="Enter address"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                              errors.address
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.address && (
                            <p className="text-red-500 text-sm">
                              {errors.address}
                            </p>
                          )}
                        </div>

                        {/* VAT Number */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-dark">
                            VAT number
                          </label>
                          <input
                            type="text"
                            name="vatNumber"
                            value={newUserData.vatNumber}
                            onChange={handleNewUserChange}
                            placeholder="Enter VAT number"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                              errors.vatNumber
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.vatNumber && (
                            <p className="text-red-500 text-sm">
                              {errors.vatNumber}
                            </p>
                          )}
                        </div>

                        {/* City */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-dark">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={newUserData.city}
                            onChange={handleNewUserChange}
                            placeholder="Enter city"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                              errors.city ? "border-red-500" : "border-gray-300"
                            }`}
                          />
                          {errors.city && (
                            <p className="text-red-500 text-sm">
                              {errors.city}
                            </p>
                          )}
                        </div>

                        {/* Country */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-dark">
                            Country
                          </label>
                          <select
                            name="country"
                            value={newUserData.country}
                            onChange={handleNewUserChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark bg-white"
                          >
                            <option value="Cyprus">Cyprus</option>
                            <option value="Greece">Greece</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Italy">Italy</option>
                            <option value="Spain">Spain</option>
                            <option value="United Kingdom">
                              United Kingdom
                            </option>
                          </select>
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-dark">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={newUserData.email}
                            onChange={handleNewUserChange}
                            placeholder="Enter email"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                              errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        {/* Telephone */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-dark">
                            Telephone
                          </label>
                          <input
                            type="tel"
                            name="telephone"
                            value={newUserData.telephone}
                            onChange={handleNewUserChange}
                            placeholder="Enter telephone"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                              errors.telephone
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.telephone && (
                            <p className="text-red-500 text-sm">
                              {errors.telephone}
                            </p>
                          )}
                        </div>

                        {/* VAT Percentage */}
                        <div className="space-y-1">
                          <label className="block text-sm font-medium text-dark">
                            VAT percentage
                          </label>
                          <select
                            name="vatPercentage"
                            value={newUserData.vatPercentage}
                            onChange={handleNewUserChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark bg-white ${
                              errors.vatPercentage
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          >
                            <option value="">
                              Set the vat percentage form here
                            </option>
                            <option value="0">0%</option>
                            <option value="5">5%</option>
                            <option value="19">19%</option>
                            <option value="21">21%</option>
                          </select>
                          {errors.vatPercentage && (
                            <p className="text-red-500 text-sm">
                              {errors.vatPercentage}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-4 border-t border-gray-200 mt-4">
                        <button
                          onClick={handleCancelNewUser}
                          className="flex-1 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors duration-200 text-sm uppercase tracking-wide"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNewUser}
                          className="flex-1 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors duration-200 text-sm uppercase tracking-wide"
                        >
                          Save as client
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - Shipping Address */}
              <div className="bg-white p-6 sm:p-10 flex-1 flex flex-col">
                <h2 className="text-2xl sm:text-5xl font-bold text-dark mb-12">
                  Shipping Address
                </h2>

                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-dark">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={shippingData.fullName}
                        onChange={handleShippingChange}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                          errors.fullName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-dark">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        placeholder="Enter your full address"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm">{errors.address}</p>
                      )}
                    </div>

                    {/* Post Code */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-dark">
                        Post code
                      </label>
                      <input
                        type="text"
                        name="postCode"
                        value={shippingData.postCode}
                        onChange={handleShippingChange}
                        placeholder="Enter post code"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                          errors.postCode ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.postCode && (
                        <p className="text-red-500 text-sm">
                          {errors.postCode}
                        </p>
                      )}
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-dark">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        placeholder="Enter city name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark placeholder-gray-400 bg-white ${
                          errors.city ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm">{errors.city}</p>
                      )}
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-dark">
                        Country
                      </label>
                      <select
                        name="country"
                        value={shippingData.country}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-dark bg-white"
                      >
                        <option value="Cyprus">Cyprus</option>
                        <option value="Greece">Greece</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Italy">Italy</option>
                        <option value="Spain">Spain</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>

                  {/* Proceed Button */}
                  <button
                    onClick={handleProceed}
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-semibold transition-colors duration-200 text-sm uppercase tracking-wide"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
