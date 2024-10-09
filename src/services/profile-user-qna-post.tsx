"use client";
import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "./profile-user";

export async function ProfileUserQnaPost() {
  const userData = await ProfileUser();

  const { data: qnaPostData, error: qnaPostError } = await supabase
    .from("qna")
    .select("*")
    .eq("user_id", userData.user_id);

  if (qnaPostError) {
    console.error("Error fetching user:", qnaPostError.message);
    return null;
  }

  // 2. 조회된 QnA 데이터의 id 목록 추출
  const qnaId = qnaPostData.map((qna) => qna.qna_id);

  // 3. qna_comments QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaPostComment, error: qnaPostCommentError } = await supabase
    .from("qna_comments")
    .select("*")
    .in("qna_id", qnaId); // qna_id를 기반으로 조회

  if (qnaPostCommentError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaPostCommentError.message
    );
    return qnaPostData; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  const categoryId = qnaPostData.map((qna) => qna.category_id);

  const { data: categoryData, error: categoryDataError } = await supabase
    .from("categories")
    .select("*")
    .eq("category_id", categoryId);

  console.log("categoryName", categoryData);

  if (categoryDataError) {
    console.error(
      "Error fetching related data from another_table:",
      categoryDataError.message
    );
    return qnaPostData; // 추가 데이터가 없더라도 QnA
  }

  // 4. qna_views QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaPostView, error: qnaPostViewError } = await supabase
    .from("qna_views")
    .select("*")
    .in("qna_id", qnaId);

  if (qnaPostViewError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaPostViewError.message
    );
    return qnaPostData; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 5. QnA 데이터에 another_table 데이터를 매핑
  const result = qnaPostData.map((qna) => ({
    ...qna,
    qnaCategory: categoryData.filter(
      (category) => category.category_id === qna.category_id
    ), // 매칭되는 데이터 추가
    qnaComment: qnaPostComment.filter(
      (comment) => comment.qna_id === qna.qna_id
    ), // 매칭되는 데이터 추가
    qnaView: qnaPostView.filter((view) => view.qna_id === qna.qna_id), // 매칭되는 데이터 추가
  }));

  return result;
}
