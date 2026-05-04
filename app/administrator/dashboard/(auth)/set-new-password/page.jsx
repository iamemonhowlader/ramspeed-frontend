import React from "react";
import ImageContainerDashboard from "../../components/Common/ImageContainerDashboard";
import SetPasswordForm from "../components/SetPasswordForm";

const SetPasswordPage = () => {
  return (
    <ImageContainerDashboard
      title={<p className="text-center">Set new password</p>}
      bg="#F5FAFF"
      image={"/dashboard/image10.png"}
    >
      <p className="text-center text-sm md:text-base lg:text-lg text-gray-500">
        Must be at least 8 character
      </p>

      <div className="mt-10 md:mt-15">
        <SetPasswordForm />
      </div>
    </ImageContainerDashboard>
  );
};
export default SetPasswordPage;
