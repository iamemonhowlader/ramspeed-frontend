import React from "react";
import ImageContainerDashboard from "../../components/Common/ImageContainerDashboard";
import SignInForm from "../components/SignInForm";

const SignInPage = () => {
  return (
    <ImageContainerDashboard
      title={
        <p className="text-center">
          Ramspeedcy <br /> Administration portal
        </p>
      }
      bg="#F5FAFF"
      image={"/dashboard/image10.png"}
    >
      <p className="text-center text-sm md:text-base lg:text-lg text-gray-500">
        You can reach us anytime via{" "}
        <span className="text-primary">info@ramspeedcy.com</span>
      </p>

      <div className="mt-10 md:mt-15">
        <SignInForm />
      </div>
    </ImageContainerDashboard>
  );
};
export default SignInPage;
