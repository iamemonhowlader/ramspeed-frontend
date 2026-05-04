import React from "react";
import DashboardHeading from "../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import { productsColumns } from "./components/productsColumns";
import { productsData } from "@/data/productsData";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const manageProduct = () => {
  return (
    <>
      <DashboardHeading
        label={"products"}
        subtitle={"Manage your products here"}
      >
        <BackButton variant={"outline"} />
        <Link href={"/administrator/dashboard/add-product"}>
          <Button className={'w-full'}>Add Product</Button>
        </Link>
      </DashboardHeading>

      {/* manage products table  */}
      <DataTable
        rowColored={true}
        columns={productsColumns}
        data={productsData}
      />
    </>
  );
};

export default manageProduct;
