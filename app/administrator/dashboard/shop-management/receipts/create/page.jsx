"use client";

import React, { useState } from "react";
import DashboardHeading from "../../../components/Common/DashboardHeading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";
import { toast } from "react-toastify";
import BackButton from "@/components/common/Buttons/BackButton";

const CreateReceiptPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    amount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.amount) {
      toast.error("Name and Amount are required");
      return;
    }

    if (isNaN(parseFloat(formData.amount))) {
      toast.error("Amount must be a valid number");
      return;
    }

    setLoading(true);
    try {
      const response = await apiFetch("/api/admin/receipts/store", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.success) {
        toast.success("New receipt added successfully!");
        router.push("/administrator/dashboard/shop-management/receipts");
      } else {
        toast.error(response.message || "Failed to add receipt");
      }
    } catch (error) {
      toast.error("An error occurred while saving the receipt");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardHeading
        titlePrefix="Create"
        titleHighlight="Receipt"
        subtitle="Create a new receipt"
      >
        <BackButton />
      </DashboardHeading>

      <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl border border-[#E8E8E8] shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#191D23] font-semibold text-sm">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-[#191D23] font-semibold text-sm">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter receipt description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-[#191D23] font-semibold text-sm">
              Amount (€) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#E8E8E8]">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.push("/administrator/dashboard/shop-management/receipts")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Receipt"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateReceiptPage;
