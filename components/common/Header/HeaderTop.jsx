"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { GoZap } from "react-icons/go";

export default function HeaderTop() {
  const [mounted, setMounted] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dropdownRef = useRef(null);

  const languages = ["English", "Greek", "Choose Your Own"];
  const router = useRouter();

  const contactRoute = () => {
    router.push("/contact-us");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mounted]);

  return (
    <header className="bg-primary text-white w-full">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3 sm:py-4 lg:py-6 gap-3 sm:gap-4 flex-wrap">
          {/* Left Section */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
            {/* Language Selector */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-1 text-xs sm:text-sm md:text-base font-semibold hover:text-white transition-colors cursor-pointer"
              >
                <span>{selectedLanguage}</span>
                <FaChevronDown
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${
                    isLanguageOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLanguageOpen && (
                <div className="absolute top-full left-0 mt-2 w-36 sm:w-40 bg-white rounded-lg shadow-md border border-gray-200 py-1 z-50">
                  {languages.map((language) => (
                    <button
                      key={language}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium cursor-pointer hover:bg-gray-100 transition-colors ${
                        selectedLanguage === language
                          ? "bg-gray-50 font-medium text-primary"
                          : "text-black"
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Free Shipping Text */}
            <div className="text-xs sm:text-sm md:text-base font-medium text-center sm:text-left">
              Free Shipping On All Orders Over €100
            </div>
          </div>

          {/* Right Section - Buttons */}
          <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-3">
            {/* Flash Sale */}
            <Link
              href="/flash-sale"
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-[#ffc107] hover:bg-[#e0a800] text-[#3F3F3F] rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm transition-colors shadow-sm"
            >
              <GoZap className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Flash Sale</span>
            </Link>

            {/* Rma Form */}
            <Link
              href="/rma-form"
              className="px-2 sm:px-4 py-1.5 sm:py-2 bg-black hover:bg-black/90 text-white rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm shadow-sm transition-colors"
            >
              RMA Form
            </Link>

            {/* Track Repair */}
            <Link
              href="/repair-tracking"
              className="px-2 sm:px-4 py-1.5 sm:py-2 bg-black hover:bg-black/90 text-white rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm shadow-sm transition-colors"
            >
              Track your repair
            </Link>

            {/* About */}
            <Link
              href="/about-us"
              className="px-2 sm:px-4 py-1.5 sm:py-2 bg-black hover:bg-black/90 text-white rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm shadow-sm transition-colors"
            >
              About Us
            </Link>

            {/* Contact */}
            <button
              onClick={contactRoute}
              className="px-2 sm:px-4 py-1.5 sm:py-2 bg-black hover:bg-black/90 text-white rounded-lg sm:rounded-xl font-semibold text-[10px] sm:text-xs md:text-sm shadow-sm transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
