import React from "react";
import ImageContainerDashboard from "../../components/Common/ImageContainerDashboard";
import LogoChangeForm from "./components/LogoChangeForm";

const page = () => {
  return (
    <ImageContainerDashboard
      title={"Change your logo "}
      subtitle={"Change you logo and get the value of full customization"}
    >
      <LogoChangeForm />
    </ImageContainerDashboard>
  );
};

export default page;
