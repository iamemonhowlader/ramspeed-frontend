import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import stocksColumn from "../../components/Common/TableColumns/stocksColumn";
import { allStocksData } from "@/data/allStocksData";

const page = () => {
  return (
    <>
      <DashboardHeading
        titlePrefix="All stocks"
        subtitle="Manage stock products here"
      />

      <DataTable columns={stocksColumn} data={allStocksData} />
    </>
  );
};

export default page;
