"use client";

import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import DataTable from "@/components/common/DataTable/DataTable";
import { clients } from "@/data/clientsData";
import clientsColumn from "./components/clientsColumn";

const ClientsPage = () => {
  return (
    <>
      <DashboardHeading
        label="your clients "
        subtitle="Manage your clients here"
      >
        <BackButton />
      </DashboardHeading>

      {/* table container  */}
      <DataTable rowColored columns={clientsColumn} data={clients} />
    </>
  );
};

export default ClientsPage;
