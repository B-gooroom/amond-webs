import { supabase } from "@/utils/supabase/client";

interface BoardDetailProps {
  id: string;
}

export async function BoardDetail({ id }: BoardDetailProps) {
  const { data: boardDetailData, error: boardDetailError } = await supabase
    .from("board")
    .select("*")
    .eq("board_id", id);

  if (boardDetailError) {
    console.error("Error fetching qna detail:", boardDetailError.message);
    return null;
  }

  // 2. category_id를 기반으로 카테고리 정보를 가져옴
  const categoryId = boardDetailData.map((qna) => qna.category_id);

  const { data: categoryData, error: categoryDataError } = await supabase
    .from("categories")
    .select("*")
    .eq("category_id", categoryId);

  if (categoryDataError) {
    console.error(
      "Error fetching related data from another_table:",
      categoryDataError.message
    );
    return [];
  }

  // 3. 조회된 QnA 데이터의 id 목록 추출
  const boardId = boardDetailData.map((board) => board.board_id);

  // 3. qna_comments QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: boardDetailComment, error: boardDetailCommentError } =
    await supabase.from("board_comments").select("*").in("board_id", boardId); // qna_id를 기반으로 조회

  if (boardDetailCommentError) {
    console.error(
      "Error fetching related data from another_table:",
      boardDetailCommentError.message
    );
    return [];
  }

  // 4. qna_id로 user 데이터를 가져옴
  const userId = boardDetailData.map((board) => board.user_id);

  const { data: qnaDetailUserData, error: qnaDetailUserDataError } =
    await supabase.from("users").select("*").in("user_id", userId);

  if (qnaDetailUserDataError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaDetailUserDataError.message
    );
    return [];
  }

  const { data: boardDetailImage, error: boardDetailImageError } =
    await supabase.from("board_images").select("*").in("board_id", boardId);

  if (boardDetailImageError) {
    console.error(
      "Error fetching related data from another_table:",
      boardDetailImageError.message
    );
    return [];
  }

  const { data: boardDetailLike, error: boardDetailLikeError } = await supabase
    .from("board_likes")
    .select("*")
    .in("board_id", boardId);

  if (boardDetailLikeError) {
    console.error(
      "Error fetching related data from another_table:",
      boardDetailLikeError.message
    );
    return [];
  }

  const result = boardDetailData.map((board) => ({
    ...board,
    boardCategory: categoryData.filter(
      (category) => category.category_id === board.category_id
    ),
    boardUser: qnaDetailUserData.filter(
      (user) => user.user_id === board.user_id
    ),
    boardComment: boardDetailComment.filter(
      (comment) => comment.board_id === board.board_id
    ),
    boardImage: boardDetailImage.filter(
      (image) => image.board_id === board.board_id
    ),
    boardLike: boardDetailLike.filter(
      (like) => like.board_id === board.board_id
    ),
  }));

  return result;
}
