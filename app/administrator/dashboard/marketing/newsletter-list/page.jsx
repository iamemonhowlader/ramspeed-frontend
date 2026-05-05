"use client";

import React, { useState, useEffect } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import NewsLetterColumns from "./components/NewsLetterColumns";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

const NewsLetterList = () => {
  const [newsletterList, setNewsletterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNewsletters, setSelectedNewsletters] = useState([]);

  const fetchNewsletters = async () => {
    setLoading(true);
    try {
      const response = await apiFetch('/api/admin/newsletters');
      if (response.success) {
        // Transform data to match expected format
        const transformedData = response.data.map((item, index) => ({
          id: item.id,
          serial: index + 1,
          email: item.Email,
          phone: item.Phone_Number || 'N/A'
        }));
        setNewsletterList(transformedData);
      }
    } catch (error) {
      console.error("Failed to fetch newsletters:", error);
      toast.error("Failed to fetch newsletters");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedNewsletters.length === 0) {
      toast.error("Please select at least one newsletter to delete");
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedNewsletters.length} newsletter subscription(s)?`)) return;

    try {
      const response = await apiFetch('/api/admin/newsletters/delete-multiple', {
        method: 'DELETE',
        body: JSON.stringify({ ids: selectedNewsletters })
      });

      if (response.success) {
        toast.success(response.message);
        setSelectedNewsletters([]);
        fetchNewsletters();
      } else {
        toast.error(response.message || "Failed to delete newsletters");
      }
    } catch (error) {
      console.error("Error deleting newsletters:", error);
      toast.error("Failed to delete newsletters");
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  return (
    <>
      <DashboardHeading
        titlePrefix="Newsletter"
        label="list"
        subtitle="Manage your newsletter here"
      >
        <BackButton />
      </DashboardHeading>

      <div className={"ml-auto max-w-max mb-4"}>
        <Button 
          variant={"destructive"}
          onClick={handleDeleteSelected}
          disabled={selectedNewsletters.length === 0}
        >
          Delete Selected {selectedNewsletters.length > 0 && `(${selectedNewsletters.length})`}
        </Button>
      </div>

      {/* table container  */}
      <DataTable 
        rowColored 
        columns={NewsLetterColumns(fetchNewsletters, selectedNewsletters, setSelectedNewsletters)} 
        data={newsletterList} 
        loading={loading}
      />
    </>
  );
};

export default NewsLetterList;
