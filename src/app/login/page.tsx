"use client";
import { verifyOtpForUser } from "@/components/VerifyOtp/page";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  // 전화번호로 유저 추가
  const handleSendOtp = async () => {
    console.log("phoneNumber:", phoneNumber);

    const { error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });
    if (error) {
      console.error("Error sending OTP:", error);
    } else {
      // OTP가 성공적으로 전송된 상태 처리
      setIsOtpSent(true);
    }
  };

  // OTP 인증
  const handleVerifyOtp = async () => {
    const result = await verifyOtpForUser(phoneNumber, otp);
    if (result) {
      router.push("/qna");
      console.log("User successfully added and verified:", result);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter your phone number"
        className="p-2 border border-gray-300 rounded mb-4"
      />
      {isOtpSent ? (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </>
      ) : (
        <button
          onClick={handleSendOtp}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send OTP
        </button>
      )}
    </div>
  );
}
