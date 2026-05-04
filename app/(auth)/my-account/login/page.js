"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import B2BLoginForm from "./components/B2BLoginForm";
import B2BLoginImage from "./components/B2BLoginImage";
import RegularLoginImage from "./components/RegularImage";
import RegularLoginForm from "./components/RegularLoginForm";
import RootLoginForm from "./components/RootLogin/RootLoginForm";
import RootLoginImage from "./components/RootLogin/RootLoginImage";
import UniversalLoginForm from "./components/UniversalLoginForm/UniversalLoginForm";

function LoginContent() {
  const searchParams = useSearchParams();
  const userType = searchParams.get("user_type");

  const renderContent = () => {
    switch (userType) {
      case "regular":
        return (
          <>
            {/* Login Image */}
            <RegularLoginImage />
            {/* Login Form */}
            <RegularLoginForm />
          </>
        );
      case "b2b":
        return (
          <>
            {/* Login Image */}
            <B2BLoginImage />
            {/* Login Form */}
            <B2BLoginForm />
          </>
        );
      default:
        return (
          <>
            {/* Default - Login components */}
            <RootLoginImage />
            <RootLoginForm />
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
              <div className="flex flex-col lg:flex-row">
                <UniversalLoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Login = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default Login;
