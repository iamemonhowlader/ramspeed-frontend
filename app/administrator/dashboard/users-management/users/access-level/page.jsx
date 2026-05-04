"use client";

import React, { useState, useEffect } from "react";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import Link from "next/link";
import DashboardHeading from "../../../components/Common/DashboardHeading";
import usersAccessLevelColumns from "./components/usersAccessLevelColumns";
import { apiFetch } from "@/lib/api";

const UsersAccessLevelPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccessLevels = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("/api/admin/access-levels");
      if (response.success) {
        setData(response.data.data || response.data);
      }
    } catch (error) {
      console.error("Failed to fetch access levels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccessLevels();
  }, []);

  return (
    <>
      <DashboardHeading titlePrefix="Users">
        <BackButton variant={"outline"} />
        <Link className="w-full" href="/administrator/dashboard/users-management/users/access-level/add">
          <Button className={'w-full'}>Add Access Level</Button>
        </Link>
      </DashboardHeading>

      {/* table container  */}
      <DataTable 
        columns={usersAccessLevelColumns(fetchAccessLevels)} 
        data={data} 
        loading={loading}
      />
    </>
  );
};

export default UsersAccessLevelPage;