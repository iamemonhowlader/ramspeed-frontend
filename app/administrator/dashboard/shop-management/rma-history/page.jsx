"use client";

import { useState } from "react";
import DataTable from "@/components/common/DataTable/DataTable";
import DashboardHeading from "../../components/Common/DashboardHeading";
import { rmaHistory as data } from "@/data/rmaHistory";
import RMAHistoryColumns from "./components/RMAHistoryColumns";

const RmaHistoryPage = () => {
  const [rmaHistory, setRmaHistory] = useState(data);
  const columns = RMAHistoryColumns.map((col) => ({
    ...col,
    meta: { rmaHistory, setRmaHistory },
  }));

  return (
    <div>
      <DashboardHeading titlePrefix="RMA" label="history" />

      {/* horizontal line  */}
      <div className="h-3 bg-primary  rounded-full mb-8" />

      <DataTable
        markRow={"delivered"}
        markRowColor={"#4ade80"}
        columns={columns}
        data={rmaHistory}
      />
    </div>
  );
};
export default RmaHistoryPage;
