"use client";

import { useEffect, useRef, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

const OTPForm = () => {
  const router = useRouter();
  const otpRef = useRef(null);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    // Automatically focus the first OTP slot on mount
    if (otpRef.current) {
      const firstInput = otpRef.current.querySelector("input");
      if (firstInput) firstInput.focus();
    }
  }, []);

  const handleSubmit = () => {
    router.push("/administrator/dashboard/set-new-password");
  };

  return (
    <div className="max-w-[270px] md:max-w-full mx-auto lg:max-w-[450px]">
      <Label className="!text-base mb-2">OTP</Label>

      <div ref={otpRef}>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup className="flex items-center justify-between w-full">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        onClick={handleSubmit}
        className="w-full my-4 md:py-6 md:my-8"
        disabled={otp.length !== 6}
      >
        Continue
      </Button>

      <p className="text-xs md:text-base text-[#414141]">
        Didn’t receive the code?{" "}
        <span className="text-primary cursor-pointer underline">
          Click to resend code
        </span>
      </p>
    </div>
  );
};

export default OTPForm;
