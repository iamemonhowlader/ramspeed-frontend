"use client";

import DashboardFormContainer from "@/app/administrator/dashboard/components/DashboardFormContainer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiFetch } from "@/lib/api";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";

const UpdateStoreInformation = () => {
  const [storeInfoList, setStoreInfoList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [storeData, setStoreData] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchStoreInfo();
  }, []);

  const fetchStoreInfo = async () => {
    try {
      const response = await apiFetch("/api/admin/store-info");
      if (response.success) {
        setStoreInfoList(response.data);
      }
    } catch (error) {
      toast.error("Failed to fetch store information.");
    }
  };

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const selectedItem = storeInfoList.find((item) => item.id.toString() === id);
    if (selectedItem) {
      setStoreData(selectedItem.Store_Data);
    } else {
      setStoreData("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) {
      toast.error("Please select a store info field.");
      return;
    }
    if (!storeData) {
      toast.error("Store data cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await apiFetch("/api/admin/store-info/update", {
        method: "POST",
        body: JSON.stringify({
          id: selectedId,
          Store_Data: storeData,
        }),
      });

      if (response.success) {
        toast.success(response.message || "Store Data updated successfully!");
        fetchStoreInfo(); // Refresh the list
      } else {
        toast.error(response.message || "Failed to update store info.");
      }
    } catch (error) {
      toast.error("An error occurred during update.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardFormContainer
        title={"Change Store Address / Info"}
        subtitle={"Select a field and update its data (HTML tags supported)"}
      >
        <form onSubmit={onSubmit} className="w-full space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Store Info Field:</label>
            <select
              value={selectedId}
              onChange={handleSelectChange}
              className="w-full border rounded-md p-2 h-10 bg-white"
            >
              <option value="">Select field</option>
              {storeInfoList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.Info}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold">Store Data (HTML Allowed):</label>
            <Textarea
              id="Store_Data"
              placeholder="e.g. <b>RAMSPEEDcy</b>"
              rows={5}
              value={storeData}
              onChange={(e) => setStoreData(e.target.value)}
            />
          </div>

          <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md border border-red-100">
            <p>For adding New line add &lt;br&gt;</p>
            <p>For adding bold Text add &lt;b&gt; text &lt;/b&gt;</p>
            <p>You can add any html tags and they would take effect everywhere!</p>
          </div>

          <div className="md:max-w-max ml-auto flex gap-2 xl:gap-4 flex-col md:flex-row w-full md:w-auto">
            <Button
              type="submit"
              disabled={isSubmitting || !selectedId}
              className="px-8"
            >
              {isSubmitting ? "Updating..." : "Submit"}
            </Button>
          </div>
        </form>
      </DashboardFormContainer>

      {/* Table displaying all current info */}
      <DashboardFormContainer title="Current Store Details">
        <div className="overflow-x-auto w-full border rounded-md">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#00FFFF] text-black">
              <tr>
                <th className="px-4 py-3 border">Store Info</th>
                <th className="px-4 py-3 border">Store Details</th>
              </tr>
            </thead>
            <tbody>
              {storeInfoList.map((item) => (
                <tr key={item.id} className="border-b bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 border font-semibold w-1/4">{item.Info}</td>
                  <td className="px-4 py-3 border break-all">
                    {/* Render plain text of the HTML directly as shown in legacy */}
                    {item.Store_Data}
                  </td>
                </tr>
              ))}
              {storeInfoList.length === 0 && (
                <tr>
                  <td colSpan="2" className="text-center py-4 text-gray-500">
                    Loading store information...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DashboardFormContainer>
    </div>
  );
};

export default UpdateStoreInformation;
