import React from "react";
import DataTable from "@/components/common/DataTable/DataTable";
import { productsData } from "@/data/productsData";
import DashboardHeading from "../Common/DashboardHeading";
import { productsColumns } from "../../manage-products/components/productsColumns";

const ProductsWithoutStock = () => {
  return (
    <>
      <DashboardHeading
        titlePrefix="Manage your products"
        label={"Without Stock"}
      />

      {/* manage products table  */}
      <DataTable
        rowColored={true}
        columns={productsColumns}
        data={productsData}
      />
    </>
  );
};

export default ProductsWithoutStock;
