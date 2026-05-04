import { redirect } from "next/navigation";

const RMAFormPage = () => {
  redirect("/administrator/dashboard/shop-management/rma-history");
};

export default RMAFormPage;
