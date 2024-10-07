"use client";
import Input from "@/components/Input/page";
import { verifyOtpForUser } from "@/components/VerifyOtp/page";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleLogout = async () => {
    const session = await supabase.auth.getSession();

    // console.log("session:", session);
    if (session) {
      await supabase.auth.signOut();
    }
  };

  // 전화번호로 유저 추가
  const handleSendOtp = async () => {
    // 현재 로그인된 세션이 있는지 확인
    // const session = supabase.auth.session();
    const session = await supabase.auth.getSession();

    if (session) {
      // 기존 세션이 있으면 로그아웃
      await handleLogout();
    }

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
    <div className="flex justify-center items-center h-[100vh]">
      <Input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="821096311524"
        // className="p-2 border border-gray-300 rounded-2xl mb-4"
      />
      {isOtpSent ? (
        <>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            // className="p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-green-500 text-white px-10 py-[6px] rounded"
          >
            인증하기
          </button>
        </>
      ) : (
        <button
          onClick={handleSendOtp}
          className="bg-ad-brown-800 text-white px-10 py-[6px] rounded-2xl ml-8"
        >
          로그인
        </button>
      )}
    </div>
  );
}
