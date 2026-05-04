import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import { receipts } from "@/data/receiptsData";
import receiptsColumn from "./components/receiptsColumn";

const ReceiptsPage = () => {
  return (
    <>
      <DashboardHeading
        titlePrefix="All stocks"
        subtitle="Manage stock products here"
      />

      <DataTable columns={receiptsColumn} data={receipts} />
    </>
  );
};

export default ReceiptsPage;
