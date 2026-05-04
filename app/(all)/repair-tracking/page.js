"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RepairTracking = () => {
  const [ticketId, setTicketId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

  const handleTrack = (e) => {
    e.preventDefault();
    // Handle tracking logic here
    console.log("Tracking repair:", { ticketId, phoneNumber });
    alert(`Tracking repair for Ticket ID: ${ticketId}`);
  };

  const handleRepairStatus = () => {
    router.push("/repair-tracking/status");
  };
  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="py-8 sm:py-12">
          <div className="w-full">
            <div className="max-w-2xl">
              {/* Title */}
              <h2 className="text-3xl font-black text-black mb-6 capitalize">
                Track your repair
              </h2>
              <p className="text-[#414141] mb-10">
                To track your order please enter your Order ID in the box below
                and press the &quot; Track &quot; button. This was given to you
                on your receipt and in the confirmation email you should have
                received.
              </p>
            </div>
            <div className="space-y-10">
              <div>
                <label
                  htmlFor="ticketId"
                  className="block text-sm font-bold text-black  mb-2"
                >
                  Ticket ID
                </label>
                <input
                  type="text"
                  id="ticketId"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="Enter your ticket ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:primary focus:border-transparent  placeholder-gray-400 bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-bold text-black  mb-2"
                >
                  Phone number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:primary focus:border-transparent  placeholder-gray-400 bg-white"
                />
              </div>

              {/* Track Button */}
              <button
                onClick={handleRepairStatus}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-2.5 px-10 rounded-md transition-colors duration-200 text-sm uppercase tracking-wide cursor-pointer"
              >
                track
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairTracking;
