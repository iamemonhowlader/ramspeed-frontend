import React from "react";
import ImageContainerDashboard from "../../components/Common/ImageContainerDashboard";
import OTPForm from "../components/OTPForm";

const PasswordResetPage = () => {
  return (
    <ImageContainerDashboard
      title={"Password reset"}
      bg="#F5FAFF"
      image={"/dashboard/image8.png"}
      className={"text-center"}
    >
      <p className="text-center text-sm md:text-base lg:text-lg text-gray-500">
        We send a 6 digit code to miketyson43@gmail.com
      </p>

      <div className="mt-4 md:mt-8">
        <OTPForm />
      </div>
    </ImageContainerDashboard>
  );
};
export default PasswordResetPage;
