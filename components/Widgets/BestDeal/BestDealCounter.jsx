"use client";

import { useEffect, useState } from "react";

const BestDealCounter = () => {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 10,
    minutes: 41,
    seconds: 22,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  return (
    <div className="mb-6 lg:mb-0">
      <div className="bg-white border-2 border-primary rounded-2xl p-6 sm:p-8 mx-auto h-full flex flex-col justify-between overflow-hidden gap-3 sm:gap-0">
        {/* Header Badge */}
        <div className="flex justify-center">
          <span className="bg-[#299F6C] text-white px-7 py-4 rounded-2xl text-sm font-medium uppercase tracking-wide">
            GRAB THE OFFER
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-5xl font-bold text-black font-mulish text-center">
          Best deal for today
        </h2>

        {/* Subtitle */}
        <p className="text-black text-center text-xs sm:text-base leading-relaxed px-2">
          BEST DEAL OF THE DAY - CHECK FOR OTHER DEAL AND GRAB THE OFFER
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-3 sm:gap-4">
          <div className="bg-primary text-white rounded-lg px-3 sm:px-4 py-3 text-center min-w-[60px] sm:min-w-[70px]">
            <div className="text-xl sm:text-2xl font-bold leading-none">
              {mounted ? String(timeLeft.hours).padStart(2, "0") : "10"}
            </div>
            <div className="text-xs mt-1">Hours</div>
          </div>
          <div className="bg-primary text-white rounded-lg px-3 sm:px-4 py-3 text-center min-w-[60px] sm:min-w-[70px]">
            <div className="text-xl sm:text-2xl font-bold leading-none">
              {mounted ? String(timeLeft.minutes).padStart(2, "0") : "41"}
            </div>
            <div className="text-xs mt-1">min</div>
          </div>
          <div className="bg-primary text-white rounded-lg px-3 sm:px-4 py-3 text-center min-w-[60px] sm:min-w-[70px]">
            <div className="text-xl sm:text-2xl font-bold leading-none">
              {mounted ? String(timeLeft.seconds).padStart(2, "0") : "22"}
            </div>
            <div className="text-xs mt-1">Secs</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestDealCounter;
