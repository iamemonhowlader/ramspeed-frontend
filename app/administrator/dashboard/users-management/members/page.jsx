"use client";

import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import { members } from "@/data/membersData";
import membersColumn from "../components/membersColumn";
import notImplemented from "@/lib/notImplemented";
import Link from "next/link";

const page = () => {
  return (
    <>
      <DashboardHeading label="Members" subtitle="Manage your members here">
        <BackButton variant={"outline"} />
        <Link href={"/administrator/dashboard/users-management/members/add"}>
          <Button>Add Member</Button>
        </Link>
      </DashboardHeading>

      <div className={"ml-auto max-w-max mb-4"}>
        <Button variant={"destructive"}>Delete Selected</Button>
      </div>

      {/* table container  */}
      <DataTable rowColored columns={membersColumn} data={members} />
    </>
  );
};

export default page;
