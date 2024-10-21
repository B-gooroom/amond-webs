import { BoardAddLikeProps } from "@/app/board/[id]/page";
import { supabase } from "@/utils/supabase/client";

export async function BoardAddLike({ board_id, user_id }: BoardAddLikeProps) {
  // const { data, error } = await supabase.from("board_likes").insert([
  //   { board_id, user_id }, // 추가할 데이터
  // ]);

  // if (error) {
  //   console.error("Error updating board like:", error.message);
  //   return { error };
  // }

  // return data;
  const { data: existingLike, error: selectError } = await supabase
    .from("board_likes")
    .select("*")
    .eq("board_id", board_id)
    .eq("user_id", user_id);

  if (selectError) {
    console.error("Error checking like:", selectError);
    return;
  }

  if (existingLike && existingLike.length > 0) {
    // 이미 좋아요를 눌렀다면 좋아요 취소 처리
    const { error: deleteError } = await supabase
      .from("board_likes")
      .delete()
      .eq("board_id", board_id)
      .eq("user_id", user_id);

    if (deleteError) {
      console.error("Error removing like:", deleteError);
    } else {
      console.log("Like removed");
      return true;
    }
  } else {
    // 좋아요가 없으면 추가
    const { error: insertError } = await supabase
      .from("board_likes")
      .insert([{ board_id, user_id }]);

    if (insertError) {
      console.error("Error adding like:", insertError);
    } else {
      console.log("Like added");
      return true;
    }
  }
}
