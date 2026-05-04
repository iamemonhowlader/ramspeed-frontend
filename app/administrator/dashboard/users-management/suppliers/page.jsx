"use client";

import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import Link from "next/link";
import { suppliers } from "@/data/suppliersData";
import suppliersColumns from "./components/suppliersColumns";

const SupplierPage = () => {
  return (
    <>
      <DashboardHeading label="Suppliers" subtitle="Manage your suppliers here">
        <BackButton variant={"outline"} />
        <Link href={"/administrator/dashboard/users-management/suppliers/add"}>
          <Button>Add Supplier</Button>
        </Link>
      </DashboardHeading>

      <div className={"ml-auto max-w-max mb-4"}>
        <Button variant={"destructive"}>Delete Selected</Button>
      </div>

      {/* table container  */}
      <DataTable rowColored columns={suppliersColumns} data={suppliers} />
    </>
  );
};
export default SupplierPage;
