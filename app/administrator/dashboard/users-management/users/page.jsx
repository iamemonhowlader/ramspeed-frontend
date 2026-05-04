import React from "react";
import DashboardHeading from "../../components/Common/DashboardHeading";
import BackButton from "@/components/common/Buttons/BackButton";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/common/DataTable/DataTable";
import { users } from "@/data/usersData";
import usersColumn from "./components/usersColumn";
import Link from "next/link";

const UsersPage = () => {
  return (
    <>
      <DashboardHeading titlePrefix="Users">
        <BackButton variant={"outline"} />
        <Link href="/administrator/dashboard/users-management/users/add">
          <Button className={"w-full"}>Add Users</Button>
        </Link>
      </DashboardHeading>

      {/* table container  */}
      <DataTable columns={usersColumn} data={users} />
    </>
  );
};

export default UsersPage;
