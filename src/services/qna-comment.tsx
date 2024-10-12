import { supabase } from "@/utils/supabase/client";

interface QnaCommentProps {
  id: string;
}

export async function QnaComment({ id }: QnaCommentProps) {
  // 1. qna_id를 기반으로 QnA 데이터를 가져옴
  const { data: qnaCommentData, error: qnaCommentError } = await supabase
    .from("qna_comments")
    .select("*")
    .eq("qna_id", id);

  if (qnaCommentError) {
    console.error("Error fetching qna detail:", qnaCommentError.message);
    return null;
  }

  // 2. qna_id로 user 데이터를 가져옴
  const userId = qnaCommentData.map((qna) => qna.user_id);

  const { data: qnaCommentUserData, error: qnaCommentUserError } =
    await supabase.from("users").select("*").eq("user_id", userId); // qna_id를 기반으로 조회

  if (qnaCommentUserError) {
    console.error(
      "Error fetching qna comment user:",
      qnaCommentUserError.message
    );
    return null;
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
}
