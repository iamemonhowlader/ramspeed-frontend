import React from "react";
import ImageContainerDashboard from "./components/Common/ImageContainerDashboard";
import AdminControlPanel from "./components/AdminControlPanel/AdminControlPanel";
import ProductsWithoutStock from "./components/ProductsWithoutStock/ProductsWithoutStock";

const AdminDashboard = () => {
  return (
    <div className="space-y-20">
      <ImageContainerDashboard
        title={"Administrator control panel"}
        bg="#F5FAFF"
        image={"/dashboard/image5.jpg"}
      >
        <AdminControlPanel />
      </ImageContainerDashboard>

      <ProductsWithoutStock />
    </div>
  );
};

export default AdminDashboard;
