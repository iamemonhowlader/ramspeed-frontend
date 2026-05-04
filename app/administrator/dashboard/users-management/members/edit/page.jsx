import { redirect } from "next/navigation";

const page = () => {
  redirect("/administrator/dashboard/users-management/members");
};

export default page;
