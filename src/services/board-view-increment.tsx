import { supabase } from "@/utils/supabase/client";

interface BoardViewIncrementProps {
  id: string;
}

export async function BoardViewIncrement({ id }: BoardViewIncrementProps) {
  const boardId = id;

  // 1. 레코드 조회
  const { data: boardViewData, error: boardViewDataError } = await supabase
    .from("board_views")
    .select("view_count")
    .eq("board_id", boardId)
    .single(); // 단일 레코드만 가져옴

  if (boardViewDataError) {
    console.error("Error fetching view count:", boardViewDataError.message);

    // 2. 조회된 데이터가 없으면 새로운 레코드 삽입
    if (
      boardViewDataError.message ===
      // "JSON object requested, multiple (or no) rows returned"
      "JSON object requested, multiple (or no) rows returned"
    ) {
      const { error: insertError } = await supabase
        .from("board_views")
        .insert([{ board_id: boardId, view_count: 1 }]); // 새로운 레코드 삽입

      if (insertError) {
        console.error("Error inserting new view count:", insertError.message);
      } else {
        console.log("View count inserted successfully");
      }
      return;
    } else {
      console.error("Error fetching view count:", boardViewDataError.message);
      return;
    }
  }
  // 3. 기존 레코드가 있으면 view_count 값을 1 증가시켜 업데이트
  const currentViewCount = boardViewData.view_count || 0;

  const { error: updateError } = await supabase
    .from("board_views")
    .update({ view_count: currentViewCount + 1 })
    .eq("board_id", boardId);

  if (updateError) {
    console.error("Error updating view count:", updateError.message);
  } else {
    console.log("View count incremented successfully");
  }
}
