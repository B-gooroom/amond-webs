import { supabase } from "@/utils/supabase/client";

interface QnaViewIncrementProps {
  id: string;
}

export async function QnaViewIncrement({ id }: QnaViewIncrementProps) {
  const qnaId = id;

  // 1. 레코드 조회
  const { data: qnaViewData, error: qnaViewDataError } = await supabase
    .from("qna_views")
    .select("view_count")
    .eq("qna_id", qnaId)
    .single(); // 단일 레코드만 가져옴

  if (qnaViewDataError) {
    // 2. 해당 레코드가 없으면 새로운 레코드를 삽입
    if (
      qnaViewDataError.message ===
      "JSON object requested, multiple (or no) rows returned"
    ) {
      const { error: insertError } = await supabase
        .from("qna_views")
        .insert([{ qna_id: qnaId, view_count: 1 }]); // 새로운 레코드 삽입

      if (insertError) {
        console.error("Error inserting new view count:", insertError.message);
      } else {
        console.log("View count inserted successfully");
      }
      return;
    } else {
      console.error("Error fetching view count:", qnaViewDataError.message);
      return;
    }
  }

  const currentViewCount = qnaViewData?.view_count || 0;

  // 3. 기존 레코드가 있으면 view_count 값을 1 증가시켜 업데이트
  const { error: updateError } = await supabase
    .from("qna_views")
    .update({ view_count: currentViewCount + 1 })
    .eq("qna_id", qnaId);

  if (updateError) {
    console.error("Error updating view count:", updateError.message);
  } else {
    console.log("View count incremented successfully");
  }
}
