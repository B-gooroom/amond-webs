import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "./profile/profile-user";

interface UserAccountDeactivateResponse {
  setErrorMessage: (message: string) => void;
  setSuccessMessage: (message: string) => void;
}

export async function UserAccountDeactivate({
  setErrorMessage,
  setSuccessMessage,
}: UserAccountDeactivateResponse) {
  const user = await ProfileUser();

  if (!user) {
    setErrorMessage("로그인된 사용자가 없습니다.");
    return;
  }

  const userId = user.user_id;

  // is_used를 false로 업데이트
  const { data, error } = await supabase
    .from("users") // 'users' 테이블에서
    .update({ is_used: false }) // is_used를 false로 업데이트
    .eq("user_id", userId); // 현재 로그인한 사용자의 ID에 해당하는 행만 업데이트

  console.log("data >>", data);

  if (error) {
    setErrorMessage("계정 탈퇴 중 오류가 발생했습니다: " + error.message);
  } else {
    setSuccessMessage("계정이 성공적으로 탈퇴되었습니다.");
  }
}
