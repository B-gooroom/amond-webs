import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "./profile-user";

export async function BusinessVerified() {
  // 회사 인증 여부 확인
  const user = await ProfileUser();

  if (!user) {
    throw new Error("User not found");
  }

  const userId = user.user_id;

  try {
    // Supabase로 users 테이블에서 해당 userId의 business_verified 업데이트
    const { error } = await supabase
      .from("users") // 테이블 명
      .update({ business_verified: true }) // 업데이트할 컬럼과 값
      .eq("user_id", userId); // 해당 userId에 대해 업데이트

    if (error) {
      throw new Error(`Failed to update business_verified: ${error.message}`);
    }

    console.log("Business verified successfully for user:", userId);
    return true; // 성공 시 true 반환
  } catch (error) {
    console.error("Error updating business_verified:", error);
    return false; // 실패 시 false 반환
  }
}
