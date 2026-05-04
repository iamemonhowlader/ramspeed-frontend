import React from "react";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import { users } from "@/data/usersData";
import Link from "next/link";
import DashboardHeading from "../../../components/Common/DashboardHeading";
import usersAccessLevelColumns from "./components/usersAccessLevelColumns";

const UsersAccessLevelPage = () => {
  return (
    <>
      <DashboardHeading titlePrefix="Users">
        <BackButton variant={"outline"} />
        <Link className="w-full" href="/administrator/dashboard/users-management/users/add">
          <Button className={'w-full'}>Add Users</Button>
        </Link>
      </DashboardHeading>

      {/* table container  */}
      <DataTable columns={usersAccessLevelColumns} data={users} />
    </>
  );
};

export default UsersAccessLevelPage;