"use client";
import { supabase } from "@/utils/supabase/client";

// OTP 검증 함수
export async function verifyOtpForUser(phoneNumber: string, otp: string) {
  try {
    // OTP 검증 요청
    const { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber, // 인증 중인 사용자 전화번호
      token: otp, // 사용자가 입력한 OTP 코드
      type: "sms", // OTP 전송 방법
    });

    if (error) {
      // 에러 처리: 잘못된 OTP나 서버 문제 등
      console.error("Error verifying OTP:", error.message);
      return { success: false, message: error.message };
    }

    // 유저가 성공적으로 인증되었을 때의 처리
    console.log("User verified:", data);
    return { success: true, user: data.user };
  } catch (error) {
    // 예외 처리
    console.error("Unexpected error:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
}
