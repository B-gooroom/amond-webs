import { supabase } from "@/utils/supabase/client";

interface QnaCommentProps {
  user_id: string;
  parent_comment_id: number;
}

export async function QnaComment({
  user_id,
  parent_comment_id,
}: QnaCommentProps) {
  const { data: qnaCommentUserData, error: qnaCommentUserError } =
    await supabase.from("users").select("*").eq("user_id", user_id); // qna_id를 기반으로 조회

  if (qnaCommentUserError) {
    console.error(
      "Error fetching qna comment user:",
      qnaCommentUserError.message
    );
    return null;
  }

  const { data: qnaCommentData, error: qnaCommentError } = await supabase
    .from("qna_comments")
    .select("*")
    .eq("parent_comment_id", parent_comment_id);

  if (qnaCommentError) {
    console.error("Error fetching qna comment:", qnaCommentError.message);
    return qnaCommentUserData;
  }

  const result = qnaCommentData.map((comment) => ({
    ...comment,
    qnaUser: qnaCommentUserData.filter(
      (user) => user.user_id === comment.user_id
    ),
    qnaCommentData: qnaCommentData.filter(
      (comment) => comment.parent_comment_id
    ),
  }));

  return result;
  // return qnaCommentData;
}
