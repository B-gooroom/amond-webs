"use client";

import { QnaAddLikeProps } from "@/app/qna/[id]/page";
import { supabase } from "@/utils/supabase/client";

interface QnaDetailProps {
  id: string;
}

export async function QnaDetail({ id }: QnaDetailProps) {
  // 1. qna_id를 기반으로 QnA 데이터를 가져옴
  const { data: qnaDetailData, error: qnaDetailError } = await supabase
    .from("qna")
    .select("*")
    .eq("qna_id", id);

  if (qnaDetailError) {
    console.error("Error fetching qna detail:", qnaDetailError.message);
    return null;
  }

  // 2. category_id를 기반으로 카테고리 정보를 가져옴
  const categoryId = qnaDetailData.map((qna) => qna.category_id);

  const { data: categoryData, error: categoryDataError } = await supabase
    .from("categories")
    .select("*")
    .eq("category_id", categoryId);

  if (categoryDataError) {
    console.error(
      "Error fetching related data from another_table:",
      categoryDataError.message
    );
    return qnaDetailData; // 추가 데이터가 없더라도 QnA
  }

  // 3. 조회된 QnA 데이터의 id 목록 추출
  const qnaId = qnaDetailData.map((qna) => qna.qna_id);

  // 3. qna_comments QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaDetailComment, error: qnaDetailCommentError } =
    await supabase.from("qna_comments").select("*").in("qna_id", qnaId); // qna_id를 기반으로 조회

  if (qnaDetailCommentError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaDetailCommentError.message
    );
    return qnaDetailData; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 4. qna_id로 user 데이터를 가져옴
  const userId = qnaDetailData.map((qna) => qna.user_id);

  const { data: qnaDetailUserData, error: qnaDetailUserDataError } =
    await supabase.from("users").select("*").in("user_id", userId);

  if (qnaDetailUserDataError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaDetailUserDataError.message
    );
    return qnaDetailData; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 5. qna_likes QnA의 id를 기반으로 추가 정보를 가져옴
  // TODO: qna_likes 테이블을 추가하기
  const { data: qnaDetailLike, error: qnaDetailLikeError } = await supabase
    .from("qna_likes")
    .select("*")
    .in("qna_id", qnaId);

  if (qnaDetailLikeError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaDetailLikeError.message
    );
    return qnaDetailData; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  const result = qnaDetailData.map((qna) => ({
    ...qna,
    qnaCategory: categoryData.filter(
      (category) => category.category_id === qna.category_id
    ),
    qnaComment: qnaDetailComment.filter(
      (comment) => comment.qna_id === qna.qna_id
    ),
    qnaUser: qnaDetailUserData.filter((user) => user.user_id === qna.user_id),
    qnaLike: qnaDetailLike.filter((like) => like.qna_id === qna.qna_id),
  }));

  return result;
  // return qnaDetailData;
}

export async function QnaAddLike({ qna_id, user_id }: QnaAddLikeProps) {
  const { data: existingLike, error: selectError } = await supabase
    .from("qna_likes")
    .select("*")
    .eq("qna_id", qna_id)
    .eq("user_id", user_id);

  if (selectError) {
    console.error("Error checking like:", selectError);
    return;
  }

  if (existingLike && existingLike.length > 0) {
    // 이미 좋아요를 눌렀다면 좋아요 취소 처리
    const { error: deleteError } = await supabase
      .from("qna_likes")
      .delete()
      .eq("qna_id", qna_id)
      .eq("user_id", user_id);

    if (deleteError) {
      console.error("Error removing like:", deleteError);
    } else {
      console.log("Like removed");
    }
  } else {
    // 좋아요가 없으면 추가
    const { error: insertError } = await supabase
      .from("qna_likes")
      .insert([{ qna_id, user_id }]);

    if (insertError) {
      console.error("Error adding like:", insertError);
    } else {
      console.log("Like added");
    }
  }
}
