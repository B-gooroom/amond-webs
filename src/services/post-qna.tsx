"use client"; // 클라이언트 컴포넌트로 선언

import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "./profile-user";

interface PostQnaProps {
  title: string;
  content: string;
  category: number;
}

export async function PostQna({ title, content, category }: PostQnaProps) {
  const userData = await ProfileUser();

  const { data, error } = await supabase
    .from("qna") // QnA 테이블에 삽입
    .insert([
      {
        title,
        content,
        category_id: category,
        created_at: new Date(),
        updated_at: new Date(),
        user_id: userData.user_id,
      },
    ])
    .select();

  console.log("data", data);

  if (error) {
    console.error("Error inserting QnA post:", error);
    return { error };
  } else {
    console.log("QnA 게시글이 성공적으로 추가되었습니다.");
    // router.push("/post");
    const postId = data[0].qna_id; // 반환된 데이터에서 게시글 ID를 가져옵니다.

    // 게시글 상세 페이지로 이동
    // router.push(`/qna/${postId}`);
    return { postId };
  }
}
