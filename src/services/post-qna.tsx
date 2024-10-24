"use client"; // 클라이언트 컴포넌트로 선언

import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "./profile/profile-user";

interface PostQnaProps {
  title: string;
  content: string;
  category: number;
  photos?: File[];
}
const sanitizeFileName = (name: string) => {
  return name
    .replace(/\s+/g, "-") // 공백을 대시(-)로 치환
    .replace(/[^\w.-]/g, ""); // 알파벳, 숫자, 점(.) 및 대시(-)를 제외한 모든 문자 제거
};

export async function PostQna({
  title,
  content,
  category,
  photos,
}: PostQnaProps) {
  const userData = await ProfileUser();

  const { data: postData, error: postError } = await supabase
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

  console.log("postData", postData);

  if (postError) {
    console.error("Error inserting QnA post:", postError);
    return { postError };
  }

  const postId = postData[0].qna_id; // 반환된 데이터에서 게시글 ID를 가져옵니다.

  if (photos && photos.length > 0) {
    // 첫 번째 이미지를 업로드하고 썸네일로 저장
    for (let i = 0; i < photos.length; i++) {
      const sanitizedFileName = sanitizeFileName(photos[i].name);

      const { data: imageData, error: imageError } = await supabase.storage
        .from("test_bucket")
        .upload(`public/${Date.now()}_${sanitizedFileName}`, photos[i]);

      if (imageError) {
        console.error(`Error uploading image ${i}:`, imageError);

        // 이미지 업로드 실패 시 이미 생성된 게시글을 삭제
        await supabase.from("qna").delete().eq("qna_id", postId);

        return { error: imageError }; // 글과 이미지 업로드 모두 실패로 처리
      }

      const imageUrl = `https://xtlpqspaohusobjcvsas.supabase.co/storage/v1/object/sign/test_bucket/${imageData.path}`;

      // 모든 이미지를 qna_images 테이블에 저장
      const { error: qnaImageError } = await supabase
        .from("qna_images")
        .insert([{ qna_id: postId, image_url: imageUrl }]);

      if (qnaImageError) {
        console.error(
          `Error inserting image ${i} into qna_images:`,
          qnaImageError
        );
      }
    }
  }
  return { postId };
}
