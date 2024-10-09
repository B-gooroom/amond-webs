"use client";
import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "./profile-user";

export async function ProfileUserPost() {
  const userData = await ProfileUser();

  const { data: qnaPostData, error: qnaPostError } = await supabase
    .from("qna")
    .select("*")
    .eq("user_id", userData.user_id);

  if (qnaPostError) {
    console.error("Error fetching user:", qnaPostError.message);
    return null;
  }

  return qnaPostData;
}
