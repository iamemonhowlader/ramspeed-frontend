import BackButton from "@/components/common/Buttons/BackButton";
import { Wrench } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Page in Development",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 text-gray-800 px-4">
      {/* Floating Icon */}
      <div className="relative mb-8">
        <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-full shadow-md border border-blue-100 animate-bounce-slow">
          <Wrench className="text-blue-500 w-10 h-10 sm:w-12 sm:h-12" />
        </div>
        <div className="absolute inset-0 blur-2xl bg-blue-200/40 rounded-full -z-10"></div>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-3">
        This Page is Under Development 🚧
      </h1>

      <p className="text-sm sm:text-base text-gray-600 text-center max-w-md mb-8 leading-relaxed">
        We’re currently building this feature. It will be available soon — thank
        you for your patience!
      </p>

      <BackButton className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg bg-blue-600 text-white text-sm sm:text-base font-medium hover:bg-blue-500 transition shadow-md">
        Go back
      </BackButton>
    </div>
  );
}
