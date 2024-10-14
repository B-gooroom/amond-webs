import { supabase } from "@/utils/supabase/client";

export async function BoardListData() {
  // 1. 게시판 데이터 조회
  const { data: boardListData, error: boardListError } = await supabase
    .from("board")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (boardListError) {
    console.error("Error fetching qna:", boardListError.message);
    return null;
  }

  // 2. 조회된 QnA 데이터의 id 목록 추출
  const boardId = boardListData.map((board) => board.board_id);

  // 3. board_comments 게시판의 id를 기반으로 추가 정보를 가져옴
  const { data: boardListComment, error: boardListCommentError } =
    await supabase.from("board_comments").select("*").in("board_id", boardId);

  if (boardListCommentError) {
    console.error(
      "Error fetching related data from another_table:",
      boardListCommentError.message
    );
    return [];
  }

  // 4. category_id를 기반으로 카테고리 정보를 가져옴
  const categoryId = boardListData.map((board) => board.category_id);

  const { data: categoryData, error: categoryDataError } = await supabase
    .from("categories")
    .select("*")
    .in("category_id", categoryId);

  if (categoryDataError) {
    console.error(
      "Error fetching related data from another_table:",
      categoryDataError.message
    );
    return [];
  }

  // 5. board_views 게시판의 id를 기반으로 추가 정보를 가져옴
  const { data: boardListView, error: boardListViewError } = await supabase
    .from("board_views")
    .select("*")
    .in("board_id", boardId);

  if (boardListViewError) {
    console.error(
      "Error fetching related data from another_table:",
      boardListViewError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 6. board_images 게시판의 id를 기반으로 추가 정보를 가져옴
  const { data: boardListImage, error: boardListImageError } = await supabase
    .from("board_images")
    .select("*")
    .in("board_id", boardId);

  if (boardListImageError) {
    console.error(
      "Error fetching related data from another_table:",
      boardListImageError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 7. board_likes 게시판의 id를 기반으로 추가 정보를 가져옴
  const { data: boardListLike, error: boardListLikeError } = await supabase
    .from("board_likes")
    .select("*")
    .in("board_id", boardId);

  if (boardListLikeError) {
    console.error(
      "Error fetching related data from another_table:",
      boardListLikeError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 6. QnA 데이터에 another_table 데이터를 매핑
  const result = boardListData.map((board) => ({
    ...board,
    boardComment: boardListComment.filter(
      (comment) => comment.board_id === board.board_id
    ), // 매칭되는 데이터 추가
    boardCategory: categoryData.filter(
      (category) => category.category_id === board.category_id
    ), // 매칭되는 데이터 추가
    boardView: boardListView.filter((view) => view.board_id === board.board_id), // 매칭되는 데이터 추가
    boardImage: boardListImage.filter(
      (image) => image.board_id === board.board_id
    ),
    boardLike: boardListLike.filter((like) => like.board_id === board.board_id),
  }));

  return result;
}
