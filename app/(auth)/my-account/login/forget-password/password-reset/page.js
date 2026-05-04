"use client";

import { useEffect, useRef, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const PasswordReset = () => {
  const router = useRouter();
  const otpRef = useRef(null);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    // Automatically focus first OTP input
    if (otpRef.current) {
      const firstInput = otpRef.current.querySelector("input");
      if (firstInput) firstInput.focus();
    }
  }, []);

  const handleSubmit = () => {
    router.push(
      "/my-account/login/forget-password/password-reset/set-new-password"
    );
  };

  return (
    <div className="bg-[#F8F8F8]">
      <div className="container mx-auto">
        {/* Top Info */}
        <div className="py-8 sm:py-12 max-w-2xl mx-auto">
          <div className="bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="text-center">
                <div className="p-4 sm:p-12 lg:p-16 flex flex-col justify-center">
                  {/* container card  */}
                  <div className="max-w-[260px] md:max-w-full mx-auto ">
                    <h2 className="text-xl lg:text-3xl font-semibold mb-4 md:mb-6">
                      Password reset
                    </h2>

                    <p className="leading-relaxed text-center mb-2">
                      We sent a 6-digit code to miketyson43@gmail.com
                    </p>

                    <div className="space-y-4 md:space-y-8 mt-6 md:mt-12">
                      {/* OTP Input Fields */}
                      <div>
                        <label className="block text-sm font-medium text-dark mb-4 text-left">
                          OTP
                        </label>
                        <div ref={otpRef} className="w-full">
                          <InputOTP
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
                            onChange={(value) => setOtp(value)}
                          >
                            <InputOTPGroup className="flex justify-between w-full">
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmit}
                        className="w-full font-semibold py-4 md:py-6 px-6 rounded-md transition-all duration-200 shadow-sm"
                        disabled={otp.length !== 6}
                      >
                        Continue
                      </Button>

                      {/* Resend Code */}
                      <p className="text-sm text-center">
                        {"Didn't receive the code?"}{" "}
                        <span className="text-primary hover:text-primary/90 font-medium hover:underline cursor-pointer">
                          Click to resend code
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
