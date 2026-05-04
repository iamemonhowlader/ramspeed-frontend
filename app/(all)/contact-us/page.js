"use client";
import GoogleMap from "@/app/(all)/contact-us/components/GoogleMap";
import Link from "next/link";
import { useState } from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook, FaTiktok, FaWhatsapp } from "react-icons/fa6";
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };
  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="py-8 sm:py-12">
          <div className="w-full">
            <div className="flex items-center justify-center">
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 border p-4 sm:p-8 rounded-2xl">
                {/* Left Column */}
                <div className="flex flex-col items-start justify-center text-[#414141]">
                  <div className="mb-8 sm:mb-12">
                    <h1 className="text-4xl font-bold text-black mb-6">
                      Do you have some questions?
                    </h1>

                    <p className=" mb-8">
                      We are at your disposal 7 days a week!
                    </p>

                    <div className=" mb-8 space-y-1">
                      <p>205 Faneromenis Avenue | Post</p>
                      <p>Code: 6035 City: Larnaca |</p>
                      <p>Country: Cyprus</p>
                    </div>

                    <p className="text-gray-900 mb-2">info@ramspeedcy.com</p>

                    <p className="text-gray-900 font-semibold mb-6">
                      +357 24400601
                    </p>

                    <div className="flex gap-4">
                      <Link
                        className="hover:text-primary cursor-pointer transform duration-200"
                        href="https://www.facebook.com/RamSpeed20171/"
                      >
                        <FaFacebook size={24} />
                      </Link>
                      <Link
                        className=" hover:text-primary cursor-pointer transform duration-200"
                        href="https://www.instagram.com/ramspeedcy/#"
                      >
                        <FaInstagramSquare size={24} />
                      </Link>
                      <Link
                        className=" hover:text-primary cursor-pointer transform duration-200"
                        href="https://w.app/ramspeedcy"
                      >
                        <FaWhatsapp size={24} />
                      </Link>
                      <Link
                        className=" hover:text-primary cursor-pointer transform duration-200"
                        href="https://www.tiktok.com/@_ramspeed_"
                      >
                        <FaTiktok size={24} />
                      </Link>
                    </div>
                  </div>
                  {/* Map */}
                  <GoogleMap />
                </div>

                {/* Right Column - Form */}
                <div>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-black font-bold mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-[#9ca3af] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-[#9ca3af] bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="surname"
                        className="block text-black font-bold mb-2"
                      >
                        Surname
                      </label>
                      <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        placeholder="Enter your surname"
                        className="w-full px-4 py-3 border border-[#9ca3af] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-[#9ca3af] bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-black font-bold mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email address"
                        className="w-full px-4 py-3 border border-[#9ca3af] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-[#9ca3af] bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-black font-bold mb-2"
                      >
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="w-full px-4 py-3 border border-[#9ca3af] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-[#9ca3af] bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block text-black font-bold mb-2"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Enter country name"
                        className="w-full px-4 py-3 border border-[#9ca3af] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-[#9ca3af] bg-white"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-black font-bold mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message.."
                        rows="4"
                        className="w-full px-4 py-3 border border-[#9ca3af] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-[#9ca3af] bg-white resize-none"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-auto bg-primary hover:bg-primary/90 cursor-pointer text-white font-semibold py-3 px-10 rounded-lg transition-colors duration-200"
                    >
                      SEND
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
