"use client";

import React, { useState, useEffect } from "react";
import DataTable from "@/components/common/DataTable/DataTable";
import ImageContainerDashboard from "../../components/Common/ImageContainerDashboard";
import AddNavbarLinkForm from "./components/AddNavbarLinkForm";
import NavLinksColumns from "./components/NavLinksColumns";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

const CustomNavbarPage = () => {
  const [navLinks, setNavLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNavLinks = async () => {
    setLoading(true);
    try {
      const response = await apiFetch('/api/admin/menu');
      if (response.success) {
        // Transform data to match expected format
        const transformedData = response.data.map((item, index) => ({
          id: item.id,
          serial: index + 1,
          category: item.name,
          url: item.active_page
        }));
        setNavLinks(transformedData);
      }
    } catch (error) {
      console.error("Failed to fetch navbar links:", error);
      toast.error("Failed to fetch navbar links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavLinks();
  }, []);

  return (
    <>
      <ImageContainerDashboard
        title={"Custom Navigation Bar"}
        className={"lg:!p-8"}
      >
        {/* form  */}
        <AddNavbarLinkForm />

        {/* horizontal line  */}
        <div className="h-3 bg-primary rounded-full my-4 md:my-6" />

        {/* table  */}
        <div className="overflow-x-auto w-[75vw] md:w-auto">
          <DataTable columns={NavLinksColumns(fetchNavLinks)} data={navLinks} loading={loading} />
        </div>
      </ImageContainerDashboard>
    </>
  );
};

export default CustomNavbarPage;
