"use client";

import { supabase } from "@/utils/supabase/client";

export async function QnaList() {
  const { data: qnaListData, error: qnaListError } = await supabase
    .from("qna")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (qnaListError) {
    console.error("Error fetching qna:", qnaListError.message);
    return null;
  }

  // 2. 조회된 QnA 데이터의 id 목록 추출
  const qnaId = qnaListData.map((qna) => qna.qna_id);

  // 3. qna_comments QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaListComment, error: qnaListCommentError } = await supabase
    .from("qna_comments")
    .select("*")
    .in("qna_id", qnaId); // qna_id를 기반으로 조회

  if (qnaListCommentError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaListCommentError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 4. category_id를 기반으로 카테고리 정보를 가져옴
  const categoryId = qnaListData.map((qna) => qna.category_id);

  const { data: categoryData, error: categoryDataError } = await supabase
    .from("categories")
    .select("*")
    .in("category_id", categoryId);

  if (categoryDataError) {
    console.error(
      "Error fetching related data from another_table:",
      categoryDataError.message
    );
    return []; // 추가 데이터가 없더라도 QnA
  }

  // 5. qna_views QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaListView, error: qnaListViewError } = await supabase
    .from("qna_views")
    .select("*")
    .in("qna_id", qnaId);

  if (qnaListViewError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaListViewError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 6. qna_images QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaListImage, error: qnaListImageError } = await supabase
    .from("qna_images")
    .select("*")
    .in("qna_id", qnaId);

  if (qnaListImageError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaListImageError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 6. QnA 데이터에 another_table 데이터를 매핑
  const result = qnaListData.map((qna) => ({
    ...qna,
    qnaComment: qnaListComment.filter(
      (comment) => comment.qna_id === qna.qna_id
    ), // 매칭되는 데이터 추가
    qnaCategory: categoryData.filter(
      (category) => category.category_id === qna.category_id
    ), // 매칭되는 데이터 추가
    qnaView: qnaListView.filter((view) => view.qna_id === qna.qna_id), // 매칭되는 데이터 추가
    qnaImage: qnaListImage.filter((image) => image.qna_id === qna.qna_id), //
  }));

  return result;
}
