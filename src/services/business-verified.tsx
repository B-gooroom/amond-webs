import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "./profile-user";

export async function BusinessVerified() {
  // 회사 인증 여부 확인
  const user = await ProfileUser();

  const userId = user.user_id;

  const { data, error } = await supabase
    .from("users")
    .select("business_verified")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user data:", error);
  } else {
    return data[0].business_verified;
  }
}
