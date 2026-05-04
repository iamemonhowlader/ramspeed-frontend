import { redirect } from "next/navigation";

const RedirectToUsers = () => {
  redirect("/administrator/dashboard/users-management/users");
};

export default RedirectToUsers;
