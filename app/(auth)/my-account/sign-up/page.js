"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import B2BLeft from "./components/B2BLeft";
import B2BRight from "./components/B2BRight";
import RootSignInImage from "./components/RootSignUp/RootSignInImage";
import RootSignUpForm from "./components/RootSignUp/RootSignUpForm";
import SignUpForm from "./components/SignUpForm";
import SignUpImage from "./components/SignUpImage";
import B2BSignUpForm from "./components/B2BSignUpForm";

function SignUpContent() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("user_type");

  const renderContent = () => {
    switch (userType) {
      case "regular":
        return (
          <>
            {/* Sign Up Image */}
            <SignUpImage />
            {/* Sign Up Form */}
            <SignUpForm />
          </>
        );
      case "b2b":
        return <B2BSignUpForm />;
      default:
        return (
          <>
            {/* Default - Login components */}
            <RootSignInImage />
            <RootSignUpForm />
          </>
        );
    }
  };

  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto">
        {/* Top Info */}
        <div className="py-8 sm:py-12">
          <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">{renderContent()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SignUp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
};

export default SignUp;
