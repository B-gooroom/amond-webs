"use client";
import { supabase } from "@/utils/supabase/client";

export async function ProfileUser() {
  // 현재 로그인한 사용자의 정보를 가져옵니다.

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error.message);
    return null;
  }

  const userEmail = data.user.email;

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("email", userEmail)
    .in("is_used", [true])
    .single();

  if (userError) {
    console.error("Error fetching user:", userError.message);
    return null;
  }

  return userData;
}
