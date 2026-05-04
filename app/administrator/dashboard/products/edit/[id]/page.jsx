"use client";

import DashboardFormContainer from "@/app/administrator/dashboard/components/DashboardFormContainer";
import EditProductForm from "./components/EditProductForm";
import { useParams } from "next/navigation";

const EditProductPage = () => {
  const { id } = useParams();

  return (
    <DashboardFormContainer
      title={`Edit Product #${id}`}
      subtitle={"Update your product details and save changes"}
    >
      <EditProductForm />
    </DashboardFormContainer>
  );
};

export default EditProductPage;
