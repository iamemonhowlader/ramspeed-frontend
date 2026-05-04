import React from "react";
import DashboardHeading from "../../../components/Common/DashboardHeading";
import { Input } from "@/components/ui/input";
import NewExpenseForm from "../components/NewExpenseForm";

const page = () => {
  return (
    <div>
      <DashboardHeading
        titlePrefix="Create new expense here "
        subtitle="Add your product expense details here"
      />

      <NewExpenseForm />
    </div>
  );
};

export default page;
