import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import stocksColumn from "../../components/Common/TableColumns/stocksColumn";
import { allStocksData } from "@/data/allStocksData";

const InactiveWithoutStockQuantity = () => {
  const inactiveWithoutStockQuantity = allStocksData.filter(
    (stock) => !stock.active && stock.quantity === 0
  );

  return (
    <>
      <DashboardHeading
        titlePrefix="Inactive stocks without quantity"
        subtitle="Manage Inactive stock products without quantity here"
      />

      <DataTable columns={stocksColumn} data={inactiveWithoutStockQuantity} />
    </>
  );
};

export default InactiveWithoutStockQuantity;
