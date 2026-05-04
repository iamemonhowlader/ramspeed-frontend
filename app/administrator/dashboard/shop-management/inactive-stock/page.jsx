import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import stocksColumn from "../../components/Common/TableColumns/stocksColumn";
import { allStocksData } from "@/data/allStocksData";

const InactiveStocks = () => {
  const activeStocks = allStocksData.filter((stock) => !stock.active);

  return (
    <>
      <DashboardHeading
        titlePrefix="Inactive stocks"
        subtitle="Manage Inactive stock products here"
      />

      <DataTable columns={stocksColumn} data={activeStocks} />
    </>
  );
};

export default InactiveStocks;
