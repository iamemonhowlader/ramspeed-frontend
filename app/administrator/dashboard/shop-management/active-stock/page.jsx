import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import stocksColumn from "../../components/Common/TableColumns/stocksColumn";
import { allStocksData } from "@/data/allStocksData";

const ActiveStocks = () => {
  const activeStocks = allStocksData.filter((stock) => stock.active);

  return (
    <>
      <DashboardHeading
        titlePrefix="Active stocks"
        subtitle="Manage active stock products here"
      />

      <DataTable columns={stocksColumn} data={activeStocks} />
    </>
  );
};

export default ActiveStocks;
