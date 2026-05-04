import React, { useMemo } from "react";
import DashboardHeading from "../components/Common/DashboardHeading";
import DataTable from "@/components/common/DataTable/DataTable";
import { menuProducts } from "@/data/menuProducts";
import { menuProductsColumns } from "./components/menuProductsColumns";
import flattenData from "@/utils/flattenData";
import BackButton from "@/components/common/Buttons/BackButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ManageMenuProducts = () => {
  const flattenedData = useMemo(() => flattenData(menuProducts), []);

  return (
    <>
      <DashboardHeading
        label={"menu products"}
        subtitle={"Manage your menu products here"}
      >
        <BackButton variant={"outline"} />
        <Link href="/administrator/dashboard/menu-products/add">
          <Button className={"w-full"}>Add Menu Item</Button>
        </Link>
      </DashboardHeading>

      {/* manage products table  */}
      <DataTable columns={menuProductsColumns} data={flattenedData} />
    </>
  );
};

export default ManageMenuProducts;
