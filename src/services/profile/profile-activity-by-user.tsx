import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "./profile-user";

export async function QnaListByUser() {
  const user = await ProfileUser();

  const userId = user?.user_id;

  const { data: qnaListData, error: qnaListError } = await supabase
    .from("qna")
    .select("*")
    .eq("user_id", userId);

  if (qnaListError) {
    console.error("Error fetching qna:", qnaListError.message);
    return [];
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

export async function BoardListByUser() {
  const user = await ProfileUser();

  const userId = user?.user_id;

  const { data: boardListData, error: boardListError } = await supabase
    .from("board")
    .select("*")
    .eq("user_id", userId)
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
