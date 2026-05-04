"use client";

import React, { useState, useEffect } from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import usersColumn from "./components/usersColumn";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

const UsersPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await apiFetch(`/api/admin/users?search=${search}`);
      if (response.success) {
        setData(response.data.data || response.data);
      }
    } catch (error) {
      console.error("Failed to fetch admin users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  return (
    <>
      <DashboardHeading titlePrefix="Users">
        <BackButton variant={"outline"} />
        <Link href="/administrator/dashboard/users-management/users/add">
          <Button className={"w-full"}>Add Users</Button>
        </Link>
      </DashboardHeading>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* table container  */}
      <DataTable 
        columns={usersColumn(fetchUsers)} 
        data={data} 
        loading={loading}
      />
    </>
  );
};

export default UsersPage;
