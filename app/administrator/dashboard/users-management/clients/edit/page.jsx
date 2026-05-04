import { redirect } from "next/navigation";

const RedirectToClientsPage = () => {
  redirect("/administrator/dashboard/users-management/clients");
};

export default RedirectToClientsPage;
