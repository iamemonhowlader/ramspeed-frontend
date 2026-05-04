"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RootSignUpForm = () => {
  const router = useRouter();

  const handleRetailCustomerClick = () => {
    router.push("/my-account/sign-up?user_type=regular");
  };

  const handleB2BCustomerClick = () => {
    router.push("/my-account/sign-up?user_type=b2b");
  };

  return (
    <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full flex flex-col gap-6 lg:gap-12">
        <h2 className="text-xl lg:text-3xl font-semibold">
          Become a customer at Ramspeed
        </h2>

        <h1 className="text-primary text-3xl sm:text-5xl font-bold">
          Make your choice below
        </h1>

        <p className="leading-relaxed text-center">
          Ramspeed is your trusted marketplace to buy and sell electronics with
          ease. From phones to laptops, upgrade your tech hassle-free.
        </p>

        <div className="space-y-8">
          <button
            onClick={handleRetailCustomerClick}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-md transition-colors duration-200 shadow-sm cursor-pointer"
          >
            Retail Customer
          </button>

          <button
            onClick={handleB2BCustomerClick}
            className="w-full bg-white hover:bg-gray-50 text-primary font-semibold py-4 px-6 rounded-md border-2 border-primary transition-colors duration-200 cursor-pointer"
          >
            B2B Customer
          </button>

          <p className="text-center">
            Already have an account?{" "}
            <Link
              href="/my-account/login"
              className="text-primary hover:text-primary/90 font-medium hover:underline"
            >
              login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RootSignUpForm;
