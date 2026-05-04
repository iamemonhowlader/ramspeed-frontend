import React from "react";
import DashboardHeading from "../../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import DataTable from "@/components/common/DataTable/DataTable";
import Searchbar from "../../../components/Searchbar";
import { balanceSheetData } from "@/data/balanceSheetData";
import BalanceSheetColumns from "../components/BalanceSheetColumns";

const B2BCustomer = () => {
  return (
    <>
      <DashboardHeading
        titlePrefix="Manage your"
        label="balance sheet"
        subtitle="Manage your balance sheet here"
      >
        <BackButton />
      </DashboardHeading>

      <div className={"mb-4"}>
        <Searchbar placeholder={"Write year here for search"} />
      </div>

      {/* table container  */}
      <DataTable
        rowColored
        columns={BalanceSheetColumns}
        data={balanceSheetData}
      />
    </>
  );
};
export default B2BCustomer;
