import React from "react";
import ImageContainerDashboard from "../../components/Common/ImageContainerDashboard";
import UploadAdForm from "../components/UploadAdForm";

const AdvertisementPage = () => {
  return (
    <ImageContainerDashboard
      title={"Advertisement"}
      subtitle={"Custom your advertisement here"}
    >
      <UploadAdForm />
    </ImageContainerDashboard>
  );
};

export default AdvertisementPage;
