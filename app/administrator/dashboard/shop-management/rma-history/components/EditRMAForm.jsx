"use client";

import { Button } from "@/components/ui/button";
import ImageUpload from "@/app/administrator/dashboard/shop-management/change-logo/components/ImageUpload";
import { useState, useEffect } from "react";
import DevicePasswordTermsToolTip from "@/app/(all)/rma-form/components/DevicePasswordTermsToolTip";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

const emptyFormData = {
  beforeImage: null,
  afterImage: null,
  beforeImageLink: "",
  afterImageLink: "",
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

export default function EditRMAForm() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(emptyFormData);
  const [loading, setLoading] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchRma = async () => {
      try {
        const response = await apiFetch(`/api/admin/rma-history/${id}`);
        if (response.success) {
          const data = response.data;
          setFormData((prev) => ({
            ...prev,
            ...data,
            customerName: data.customerName || "",
            phoneNumber: data.phoneNumber || "",
            customerEmail: data.customerEmail || "",
            deviceType: data.deviceType || "",
            others: data.others || "",
            brand: data.brand || "",
            model: data.model || "",
            password: data.password || "",
            issue: data.issue || "",
            repairStatus: data.repairStatus || "",
            customerNote: data.customerNote || "",
            repairCost: data.repairCost || "",
            charger: data.accessories?.charger || { no: true, yes: false },
            battery: data.accessories?.battery || { no: true, yes: false },
            sdCard: data.accessories?.sdCard || { no: true, yes: false },
            simCard: data.accessories?.simCard || { no: true, yes: false },
            caseBag: data.accessories?.caseBag || { no: true, yes: false },
          }));
        }
      } catch (error) {
        console.error("Failed to fetch RMA:", error);
        toast.error("Failed to load RMA data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRma();
  }, [id]);

  const handleCheckboxChange = (category, option) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        no: option === "no",
        yes: option === "yes",
      },
    }));
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: null }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.customerName?.trim()) {
      errors.customerName = "Customer name is required";
    }
    
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      console.warn("Validation failed:", errors);
      toast.error("Please fill in the required fields (Customer Name)");
    }
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    console.log("Submit clicked, data:", formData);
    if (!validateForm()) return;

    try {
      setLoading(true);
      const payload = {
        ...formData,
        accessories: {
          charger: formData.charger,
          battery: formData.battery,
          sdCard: formData.sdCard,
          simCard: formData.simCard,
          caseBag: formData.caseBag,
        }
      };

      console.log("Sending payload to API:", payload);
      const response = await apiFetch(`/api/admin/rma-history/update/${id}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.success) {
        toast.success("RMA updated successfully");
        router.push("/administrator/dashboard/shop-management/rma-history");
      } else {
        toast.error(response.message || "Failed to update");
      }
    } catch (error) {
      console.error("Failed to update RMA:", error);
      toast.error("Failed to update RMA: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading RMA data...</div>;

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white rounded-2xl border-[#dedede] shadow-xl p-6 md:p-8 gap-12 flex flex-col">
        <h1 className="text-3xl md:text-5xl font-semibold text-dark mb-14">
          Product RMA form (Ticket: {formData.ticketId || id})
        </h1>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-dark text-sm font-medium mb-2">Customer name</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) => handleInputChange("customerName", e.target.value)}
              className={`w-full px-4 py-2.5 border ${formErrors.customerName ? "border-red-500" : "border-gray-300"} rounded-lg outline-none transition`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className={`w-full px-4 py-2.5 border ${formErrors.phoneNumber ? "border-red-500" : "border-gray-300"} rounded-lg outline-none transition`}
            />
          </div>
        </div>

        {/* Device Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Device type</label>
            <select
              value={formData.deviceType}
              onChange={(e) => handleInputChange("deviceType", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none bg-white"
            >
              <option value="">Device type</option>
              <option value="phone">Phone</option>
              <option value="tablet">Tablet</option>
              <option value="laptop">Laptop</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Others</label>
            <input
              type="text"
              value={formData.others}
              onChange={(e) => handleInputChange("others", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Brand</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => handleInputChange("brand", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Model</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => handleInputChange("model", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
            />
          </div>
        </div>

        {/* Multiple Select Box */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {["charger", "battery", "sdCard", "simCard", "caseBag"].map((item) => (
            <div key={item}>
              <label className="block text-sm font-medium mb-3 capitalize">{item}</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[item]?.no}
                    onChange={() => handleCheckboxChange(item, "no")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">No</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[item]?.yes}
                    onChange={() => handleCheckboxChange(item, "yes")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm">Yes</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Issue and Notes */}
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Issue</label>
            <input
              value={formData.issue}
              onChange={(e) => handleInputChange("issue", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Repair status</label>
            <input
              value={formData.repairStatus}
              onChange={(e) => handleInputChange("repairStatus", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Technician notes</label>
            <textarea
              value={formData.customerNote}
              onChange={(e) => handleInputChange("customerNote", e.target.value)}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none resize-none"
            />
          </div>
        </div>

        {/* Cost */}
        <div>
          <label className="block text-sm font-medium mb-2">Repair cost</label>
          <input
            type="number"
            value={formData.repairCost}
            onChange={(e) => handleInputChange("repairCost", e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg outline-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <Button onClick={() => router.back()} variant="outline">Cancel</Button>
          <Button onClick={handleSubmit}>Update RMA</Button>
        </div>
      </div>
    </div>
  );
}
