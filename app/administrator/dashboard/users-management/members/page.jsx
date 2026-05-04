"use client";

import React, { useState, useEffect } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import membersColumn from "../components/membersColumn";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

const MembersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/admin/members?search=${search}`);
      if (response.success) {
        // Handle pagination structure from Laravel
        setData(response.data.data || response.data);
      }
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [search]);

  return (
    <>
      <DashboardHeading label="Members" subtitle="Manage your members here">
        <BackButton variant={"outline"} />
        <Link href={"/administrator/dashboard/users-management/members/add"}>
          <Button>Add Member</Button>
        </Link>
      </DashboardHeading>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search members..."
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant={"destructive"}>Delete Selected</Button>
      </div>

      {/* table container  */}
      <DataTable 
        rowColored 
        columns={membersColumn(fetchMembers)} 
        data={data} 
        loading={loading}
      />
    </>
  );
};

export default MembersPage;
