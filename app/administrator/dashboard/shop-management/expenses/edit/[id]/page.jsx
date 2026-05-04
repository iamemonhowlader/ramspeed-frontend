import DashboardHeading from "@/app/administrator/dashboard/components/Common/DashboardHeading";
import React from "react";
import UpdateExpensesForm from "../components/UpdateExpensesForm";


const page = () => {
  return (
    <div>
      <DashboardHeading
        titlePrefix="Create new expense here "
        subtitle="Add your product expense details here"
      />

      <UpdateExpensesForm />
    </div>
  );
};

export default page;
