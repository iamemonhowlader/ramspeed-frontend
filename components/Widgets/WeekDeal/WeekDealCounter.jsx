"use client";

import { useEffect, useState } from "react";

const WeekDealCounter = () => {
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
    <div className="bg-[url('/weakdeals.png')] bg-no-repeat bg-center bg-cover text-white border-2 border-primary rounded-2xl p-8 sm:p-12 mx-auto h-full flex flex-col  gap-5">
      <div className="flex flex-col  gap-5 max-w-[50%]">
        {/* Title */}
        <h2 className="text-2xl sm:text-5xl font-bold text-white font-mulish ">
          50% OFF
        </h2>

        {/* Subtitle */}
        <p className="text-white  text-xs sm:text-base leading-relaxed px-2">
          Grab the best deal today with ultimate exploration
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-start gap-3 sm:gap-4">
          <div className="bg-primary text-white rounded-lg px-3 sm:px-4 py-3  min-w-[60px] sm:min-w-[70px]">
            <div className="text-xl sm:text-2xl font-bold leading-none">
              {mounted ? String(timeLeft.hours).padStart(2, "0") : "10"}
            </div>
            <div className="text-xs mt-1">Hours</div>
          </div>
          <div className="bg-primary text-white rounded-lg px-3 sm:px-4 py-3  min-w-[60px] sm:min-w-[70px]">
            <div className="text-xl sm:text-2xl font-bold leading-none">
              {mounted ? String(timeLeft.minutes).padStart(2, "0") : "41"}
            </div>
            <div className="text-xs mt-1">min</div>
          </div>
          <div className="bg-primary text-white rounded-lg px-3 sm:px-4 py-3  min-w-[60px] sm:min-w-[70px]">
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

export default WeekDealCounter;
