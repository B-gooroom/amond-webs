"use client";
import { supabase } from "@/utils/supabase/client";

export async function QnaPopular() {
  const { data: qnaData, error: qnaDataError } = await supabase
    .from("qna")
    .select("*")
    .eq("is_popular", true)
    .order("created_at", { ascending: false })
    .limit(3);

  if (qnaDataError) {
    console.error("Error fetching popular QnA:", qnaDataError.message);
    return [];
  }

  // 2. 조회된 QnA 데이터의 id 목록 추출
  const qnaId = qnaData.map((qna) => qna.qna_id);

  // 3. qna_comments QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaComment, error: qnaCommentError } = await supabase
    .from("qna_comments")
    .select("*")
    .in("qna_id", qnaId); // qna_id를 기반으로 조회

  if (qnaCommentError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaCommentError.message
    );
    return qnaData; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  const { data: qnaView, error: qnaViewError } = await supabase
    .from("qna_views")
    .select("*")
    .in("qna_id", qnaId);

  if (qnaViewError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaViewError.message
    );
    return qnaData; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 4. QnA 데이터에 another_table 데이터를 매핑
  const result = qnaData.map((qna) => ({
    ...qna,
    qnaComment: qnaComment.filter((comment) => comment.qna_id === qna.qna_id), // 매칭되는 데이터 추가
    qnaView: qnaView.filter((view) => view.qna_id === qna.qna_id), // 매칭되는 데이터 추가
  }));

  return result;
}
