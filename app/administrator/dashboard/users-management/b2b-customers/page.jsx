import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import { b2bCustomers } from "@/data/b2bCustomerData";
import B2BCustomerColumns from "./components/B2BCustomerColumns";

const B2BCustomer = () => {
  return (
    <>
      <DashboardHeading
        titlePrefix="B2B Customer"
        label="Activation"
        subtitle="Manage your B2B Customer here"
      >
        <BackButton />
      </DashboardHeading>

      <div className={"ml-auto max-w-max mb-4"}>
        <Button variant={"destructive"}>Delete Selected</Button>
      </div>

      {/* table container  */}
      <DataTable rowColored columns={B2BCustomerColumns} data={b2bCustomers} />
    </>
  );
};
export default B2BCustomer;
