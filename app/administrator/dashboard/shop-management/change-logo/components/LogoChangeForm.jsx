"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

const LogoChangeForm = () => {
  const [everywhereLogo, setEverywhereLogo] = useState(null);
  const [pdfLogo, setPdfLogo] = useState(null);
  const [currentLogos, setCurrentLogos] = useState({ everywhere: "", pdf: "" });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await apiFetch("/api/admin/logo");
        if (response.success) {
          const everywhere = response.data.find(l => l.id == 1)?.path || "";
          const pdf = response.data.find(l => l.id == 2)?.path || "";
          
          const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
          
          setCurrentLogos({ 
            everywhere: everywhere ? (everywhere.startsWith('http') ? everywhere : `${baseUrl}/${everywhere}`) : "", 
            pdf: pdf ? (pdf.startsWith('http') ? pdf : `${baseUrl}/${pdf}`) : "" 
          });
        }
      } catch (error) {
        console.error("Failed to fetch logos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLogos();
  }, []);

  const handleUpload = async (location) => {
    const file = location === 1 ? everywhereLogo : pdfLogo;
    if (!file) {
      toast.error("Please select a logo first");
      return;
    }

    setUpdating(true);
    try {
      const formData = new FormData();
      formData.append("logo", file);
      formData.append("location", location);

      const response = await apiFetch("/api/admin/logo/update", {
        method: "POST",
        body: formData,
        // apiFetch usually handles JSON, but for FormData we might need to be careful.
        // Assuming apiFetch handles FormData or we can pass headers.
      });

      if (response.success) {
        toast.success("Logo updated successfully");
        setCurrentLogos(prev => ({
          ...prev,
          [location === 1 ? "everywhere" : "pdf"]: `${process.env.NEXT_PUBLIC_API_URL}/${response.path}`
        }));
        if (location === 1) setEverywhereLogo(null);
        else setPdfLogo(null);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload logo");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div>Loading logos...</div>;

  return (
    <div className="flex flex-col gap-10">
      {/* Everywhere Logo */}
      <div className="max-w-[408px]">
        <p className="text-black font-semibold md:text-2xl mb-6">
          Everywhere Logo (PNG)
        </p>
        <ImageUpload 
          label="" 
          src={currentLogos.everywhere} 
          onChange={(file) => setEverywhereLogo(file)}
          onRemove={() => setEverywhereLogo(null)}
        />
        <div className="mt-4">
          <Button
            className="w-full"
            disabled={!everywhereLogo || updating}
            onClick={() => handleUpload(1)}
          >
            {updating ? "Uploading..." : "Upload Everywhere Logo"}
          </Button>
        </div>
      </div>

      {/* PDF Logo */}
      <div className="max-w-[408px]">
        <p className="text-black font-semibold md:text-2xl mb-6">
          PDF Logo (JPG)
        </p>
        <ImageUpload 
          label="" 
          src={currentLogos.pdf} 
          onChange={(file) => setPdfLogo(file)}
          onRemove={() => setPdfLogo(null)}
        />
        <div className="mt-4">
          <Button
            className="w-full"
            disabled={!pdfLogo || updating}
            onClick={() => handleUpload(2)}
          >
            {updating ? "Uploading..." : "Upload PDF Logo"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoChangeForm;
