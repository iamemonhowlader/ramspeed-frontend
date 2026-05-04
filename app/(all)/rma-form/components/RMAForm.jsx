"use client";

import { Button } from "@/components/ui/button";
import RMACustomerAgreement from "./RMACustomerAgreement";
import ImageUpload from "@/app/administrator/dashboard/shop-management/change-logo/components/ImageUpload";
import { useState } from "react";
import DevicePasswordTerms from "./DevicePasswordTermsToolTip";

const initialFormData = {
  beforeImage: null,
  afterImage: null,
  customerName: "",
  phoneNumber: "",
  deviceType: "",
  others: "",
  brand: "",
  model: "",
  charger: { no: true, yes: false },
  battery: { no: true, yes: false },
  sdCard: { no: true, yes: false },
  simCard: { no: true, yes: false },
  caseBag: { no: true, yes: false },
  passwordType: "none",
  password: "",
  issue: "",
  repairStatus: "",
  customerNote: "",
  repairCost: "",
  patternLock: [
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ],
  patternOrder: [],
};

export default function RMAForm() {
  const [openAgreement, setOpenAgreement] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  const handleCheckboxChange = (category, option) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        no: option === "no",
        yes: option === "yes",
      },
    }));
  };
  // Handle image uploads
  const handleChangeBeforeImage = (image) => {
    setFormData((prev) => ({ ...prev, beforeImage: image }));
  };
  const handleRemoveBeforeImage = () => {
    setFormData((prev) => ({ ...prev, beforeImage: null }));
  };
  const handleChangeAfterImage = (image) => {
    setFormData((prev) => ({ ...prev, afterImage: image }));
  };
  const handleRemoveAfterImage = () => {
    setFormData((prev) => ({ ...prev, afterImage: null }));
  };

  // handle input updates
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: null })); // clear error on change
  };

  // Reset form
  const reset = () => {
    setFormData(initialFormData);
    setFormErrors({});
  };

  const handlePatternClick = (row, col) => {
    setFormData((prev) => {
      const key = `${row}-${col}`;
      const isAlreadySelected = prev.patternLock[row][col];

      if (isAlreadySelected) {
        const index = prev.patternOrder.findIndex((item) => item.key === key);
        const newOrder = prev.patternOrder.slice(0, index);
        const newPattern = prev.patternLock.map((r) => [...r]);

        prev.patternOrder.slice(index).forEach((item) => {
          const [r, c] = item.key.split("-").map(Number);
          newPattern[r][c] = false;
        });

        return { ...prev, patternLock: newPattern, patternOrder: newOrder };
      } else {
        const newPattern = prev.patternLock.map((r, i) =>
          i === row ? r.map((c, j) => (j === col ? true : c)) : r
        );
        const newOrder = [...prev.patternOrder, { key, row, col }];
        return { ...prev, patternLock: newPattern, patternOrder: newOrder };
      }
    });
  };

  // Basic validation logic except image upload
  const validateForm = () => {
    const errors = {};

    if (!formData.beforeImage) {
      errors.beforeImage = "Before photo is required";
    }

    // if (!formData.afterImage) {
    //   errors.afterImage = "After photo is required";
    // }

    if (!formData.customerName.trim()) {
      errors.customerName = "Customer name is required";
    }

    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    }

    if (!formData.deviceType.trim()) {
      errors.deviceType = "Device type is required";
    }

    // Example: others is optional, no validation

    if (!formData.brand.trim()) {
      errors.brand = "Brand is required";
    }

    if (!formData.model.trim()) {
      errors.model = "Model is required";
    }

    // Validate charger, battery, etc. — ensure one checkbox is true for each
    ["charger", "battery", "sdCard", "simCard", "caseBag"].forEach((item) => {
      if (!formData[item].no && !formData[item].yes) {
        errors[item] = `Please select Yes or No for ${item}`;
      }
    });

    // Password validation
    if (
      formData.passwordType === "pin" &&
      (!formData.password || formData.password.trim().length < 4)
    ) {
      errors.password = "PIN must be at least 4 digits";
    }

    if (formData.passwordType === "password" && !formData.password.trim()) {
      errors.password = "Password is required";
    }

    if (
      formData.passwordType === "pattern" &&
      formData.patternOrder.length === 0
    ) {
      errors.patternOrder = "Please set a pattern lock";
    }

    if (!formData.issue.trim()) {
      errors.issue = "Issue description is required";
    }

    // if (!formData.repairStatus.trim()) {
    //   errors.repairStatus = "Repair status is required";
    // }

    // customerNote is optional, no validation

    // repair cost is optional
    // if (!formData.repairCost.toString().trim()) {
    //   errors.repairCost = "Repair cost is required";
    // } else if (isNaN(formData.repairCost) || Number(formData.repairCost) < 0) {
    //   errors.repairCost = "Please enter a valid repair cost";
    // }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setOpenAgreement(true);
  };

  const getPatternNumber = (row, col) => {
    const key = `${row}-${col}`;
    const index = formData.patternOrder.findIndex((item) => item.key === key);
    return index >= 0 ? index + 1 : null;
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white rounded-2xl border-[#dedede] shadow-xl p-6 md:p-8 gap-12 flex flex-col">
        <h1 className="text-3xl md:text-5xl font-semibold text-dark mb-14">
          Product RMA form
        </h1>

        {/* Photo Upload Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          {/* Before Photo */}
          <div className="">
            <label className="block text-black text-2xl font-semibold  mb-2">
              Before photo
            </label>
            <ImageUpload
              file={formData?.beforeImage}
              onChange={handleChangeBeforeImage}
              onRemove={handleRemoveBeforeImage}
              errors={formErrors.beforeImage}
              label=""
            />
          </div>

          {/* After Photo */}
          <div className="">
            <label className="block text-black text-2xl font-semibold  mb-2">
              After photo (optional)
            </label>
            <ImageUpload
              file={formData?.afterImage}
              onChange={handleChangeAfterImage}
              onRemove={handleRemoveAfterImage}
              errors={formErrors.afterImage}
              label=""
            />
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-dark text-sm font-medium  mb-2">
              Customer name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              className={`w-full px-4 py-2.5 border ${formErrors.customerName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
            />
            {formErrors.customerName && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.customerName}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">
              Phone number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({ ...formData, phoneNumber: e.target.value })
              }
              className={`w-full px-4 py-2.5 border ${formErrors.phoneNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
            />
            {formErrors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.phoneNumber}
              </p>
            )}
          </div>
        </div>

        {/* Device Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium  mb-2">
              Device type
            </label>
            <select
              value={formData.deviceType}
              onChange={(e) =>
                setFormData({ ...formData, deviceType: e.target.value })
              }
              className={`w-full px-4 py-2.5 border ${formErrors.deviceType ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white`}
            >
              <option value="">Device type</option>
              <option value="phone">Phone</option>
              <option value="tablet">Tablet</option>
              <option value="laptop">Laptop</option>
            </select>
            {formErrors.deviceType && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.deviceType}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">
              Others (Optional)
            </label>
            <input
              type="text"
              placeholder="Write device name"
              value={formData.others}
              onChange={(e) =>
                setFormData({ ...formData, others: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">Brand</label>
            <input
              type="text"
              placeholder="Enter brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className={`w-full px-4 py-2.5 border ${formErrors.brand ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
            />
            {formErrors.brand && (
              <p className="text-red-500 text-sm mt-1">{formErrors.brand}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium  mb-2">Model</label>
            <input
              type="text"
              placeholder="Enter device model"
              value={formData.model}
              onChange={(e) =>
                setFormData({ ...formData, model: e.target.value })
              }
              className={`w-full px-4 py-2.5 border ${formErrors.model ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition`}
            />
            {formErrors.model && (
              <p className="text-red-500 text-sm mt-1">{formErrors.model}</p>
            )}
          </div>
        </div>

        {/* Multiple Select Box */}
        <div className="">
          <h2 className="text-base font-bold text-primary mb-4">
            Multiple select box with the following
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {["charger", "battery", "sdCard", "simCard", "caseBag"].map(
              (item) => (
                <div key={item}>
                  <label className="block text-sm font-medium  mb-3 capitalize">
                    {item === "sdCard"
                      ? "SD card"
                      : item === "simCard"
                        ? "Sim card"
                        : item === "caseBag"
                          ? "Case or bag"
                          : item}
                  </label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[item].no}
                        onChange={() => handleCheckboxChange(item, "no")}
                        className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${formErrors[item] ? "border-red-500" : ""
                          }`}
                      />
                      <span className="ml-2 text-sm ">No</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[item].yes}
                        onChange={() => handleCheckboxChange(item, "yes")}
                        className={`w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 ${formErrors[item] ? "border-red-500" : ""
                          }`}
                      />
                      <span className="ml-2 text-sm ">Yes</span>
                    </label>
                  </div>
                  {formErrors[item] && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors[item]}
                    </p>
                  )}
                </div>
              )
            )}
          </div>
        </div>

        {/* Password Type */}
        <div className="">
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            Password type <DevicePasswordTerms />
          </label>
          <select
            value={formData.passwordType}
            onChange={(e) => handleInputChange("passwordType", e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          >
            <option value="pin">PIN</option>
            <option value="password">Password</option>
            <option value="pattern">Pattern Lock</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Pattern Lock - Only show when Pattern is selected */}
        {formData.passwordType === "pattern" && (
          <div>
            <svg className="w-40 h-40 sm:w-48 sm:h-48" viewBox="0 0 200 200">
              {formData.patternOrder.length > 1 && (
                <g>
                  {formData.patternOrder.map((dot, index) => {
                    if (index === formData.patternOrder.length - 1) return null;
                    const nextDot = formData.patternOrder[index + 1];
                    const x1 = 33.33 + dot.col * 66.66;
                    const y1 = 33.33 + dot.row * 66.66;
                    const x2 = 33.33 + nextDot.col * 66.66;
                    const y2 = 33.33 + nextDot.row * 66.66;
                    return (
                      <line
                        key={`line-${index}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#2563eb"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    );
                  })}
                </g>
              )}

              {[0, 1, 2].map((row) => (
                <g key={row}>
                  {[0, 1, 2].map((col) => {
                    const isSelected = formData.patternLock[row][col];
                    const patternNum = getPatternNumber(row, col);
                    const x = 33.33 + col * 66.66;
                    const y = 33.33 + row * 66.66;
                    return (
                      <g key={col}>
                        <circle
                          cx={x}
                          cy={y}
                          r="20"
                          fill={isSelected ? "#2563eb" : "#dbeafe"}
                          stroke={isSelected ? "#2563eb" : "#bfdbfe"}
                          strokeWidth="2"
                          className="cursor-pointer hover:stroke-blue-400 transition-all"
                          onClick={() => handlePatternClick(row, col)}
                        />
                        {isSelected && patternNum && (
                          <text
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                            className="pointer-events-none"
                          >
                            {patternNum}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>
              ))}
            </svg>
            {formErrors.patternOrder && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.patternOrder}
              </p>
            )}
            <button
              onClick={() =>
                handleInputChange("patternOrder", []) ||
                handleInputChange("patternLock", [
                  [false, false, false],
                  [false, false, false],
                  [false, false, false],
                ])
              }
              className="mt-2 text-sm text-primary font-bold cursor-pointer"
            >
              Clear Pattern
            </button>
          </div>
        )}

        {/* PIN/Password Input - Only show when PIN or Password is selected */}
        {(formData.passwordType === "pin" ||
          formData.passwordType === "password") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {formData.passwordType === "pin" ? "Enter PIN" : "Enter Password"}
              </label>
              <input
                type={formData.passwordType === "pin" ? "number" : "text"}
                placeholder={
                  formData.passwordType === "pin"
                    ? "Enter PIN code"
                    : "Enter password"
                }
                value={formData.password || ""}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${formErrors.password ? "border-red-500" : "border-gray-300"
                  }`}
              />
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>
              )}
            </div>
          )}

        {/* Issue and Repair Status */}
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium  mb-2">Issue</label>
            <input
              placeholder="Write your device issue"
              value={formData.issue}
              onChange={(e) =>
                setFormData({ ...formData, issue: e.target.value })
              }
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${formErrors.issue ? "border-red-500" : "border-gray-300"
                }`}
            />
            {formErrors.issue && (
              <p className="text-red-500 text-sm mt-1">{formErrors.issue}</p>
            )}
          </div>


          {/* <div>
            <label className="block text-sm font-medium  mb-2">
              Repair status (Optional)
            </label>
            <input
              placeholder="Write repair status for the device"
              value={formData.repairStatus}
              onChange={(e) =>
                setFormData({ ...formData, repairStatus: e.target.value })
              }
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${formErrors.repairStatus ? "border-red-500" : "border-gray-300"
                }`}
            />
            {formErrors.repairStatus && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.repairStatus}
              </p>
            )}
          </div> */}
        </div>

        {/* Customer Note */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Customer note (Optional)
          </label>
          <textarea
            placeholder="Write customer note"
            value={formData.customerNote}
            onChange={(e) =>
              setFormData({ ...formData, customerNote: e.target.value })
            }
            rows="4"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
          />
        </div>

        {/* Repair Cost */}
        <div>
          <label className="block text-sm font-medium  mb-2">
            Repair cost (Optional)
          </label>
          <input
            type="number"
            placeholder="Enter repair cost"
            value={formData.repairCost}
            onChange={(e) =>
              setFormData({ ...formData, repairCost: e.target.value })
            }
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${formErrors.repairCost ? "border-red-500" : "border-gray-300"
              }`}
          />
          {formErrors.repairCost && (
            <p className="text-red-500 text-sm mt-1">{formErrors.repairCost}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button onClick={() => reset()} variant={"outline"}>
            Reset
          </Button>
          <Button onClick={() => handleSubmit()}>Save</Button>

          {/* agreement pop up  */}
          <RMACustomerAgreement
            open={openAgreement}
            onOpenChange={setOpenAgreement}
          />
        </div>
        {Object.keys(formErrors).length !== 0 && (
          <p className="text-red-500 text-sm mt-1 text-right">
            Complete the form
          </p>
        )}
      </div>
    </div>
  );
}
