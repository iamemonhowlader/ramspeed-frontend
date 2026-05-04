import React from "react";
import ImageContainerDashboard from "../../components/Common/ImageContainerDashboard";
import EmailSubmitForm from "../components/EmailSubmitForm";

const ForgotPasswordPage = () => {
  return (
    <ImageContainerDashboard
      title={<p className="text-center">Forgot password</p>}
      bg="#F5FAFF"
      image={"/dashboard/image7.jpg"}
    >
      <p className="text-center text-sm md:text-base lg:text-lg text-gray-500">
        No worries, we will send you reset instructions
      </p>

      <div className="mt-4 md:mt-8">
        <EmailSubmitForm />
      </div>
    </ImageContainerDashboard>
  );
};
export default ForgotPasswordPage;
