import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "../profile/profile-user";

export async function QnaBookmarkByUser() {
  const user = await ProfileUser();

  const userId = user?.user_id;

  const { data: qnaBookmarkData, error: qnaBookmarkError } = await supabase
    .from("qna_bookmarks")
    .select("*")
    .eq("user_id", userId);

  if (qnaBookmarkError) {
    console.error("Error fetching bookmark data:", qnaBookmarkError.message);
    return null;
  }

  const qnaBookmarkDataId = qnaBookmarkData?.map((qna) => qna.qna_id);

  const { data: qnaListData, error: qnaListError } = await supabase
    .from("qna")
    .select("*")
    .in("qna_id", qnaBookmarkDataId);

  if (qnaListError) {
    console.error("Error fetching qna:", qnaListError.message);
    return [];
  }

  // 3. qna_comments QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaLikeListComment, error: qnaListCommentError } =
    await supabase
      .from("qna_comments")
      .select("*")
      .in("qna_id", qnaBookmarkDataId); // qna_id를 기반으로 조회

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
  const { data: qnaBookmarkListView, error: qnaBookmarkViewError } =
    await supabase
      .from("qna_views")
      .select("*")
      .in("qna_id", qnaBookmarkDataId);

  if (qnaBookmarkViewError) {
    console.error(
      "Error fetching related data from another_table:",
      qnaBookmarkViewError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 6. qna_images QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaLikeListImage, error: qnaListImageError } = await supabase
    .from("qna_images")
    .select("*")
    .in("qna_id", qnaBookmarkDataId);

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
    qnaComment: qnaLikeListComment.filter(
      (comment) => comment.qna_id === qna.qna_id
    ), // 매칭되는 데이터 추가
    qnaCategory: categoryData.filter(
      (category) => category.category_id === qna.category_id
    ), // 매칭되는 데이터 추가
    qnaView: qnaBookmarkListView.filter((view) => view.qna_id === qna.qna_id), // 매칭되는 데이터 추가
    qnaImage: qnaLikeListImage.filter((image) => image.qna_id === qna.qna_id), //
  }));
  return result;
}

export async function BoardBookmarkByUser() {
  const user = await ProfileUser();

  const userId = user?.user_id;

  const { data: boardBookmarkData, error: boardBookmarkError } = await supabase
    .from("board_bookmarks")
    .select("*")
    .eq("user_id", userId);

  if (boardBookmarkError) {
    console.error("Error fetching bookmark data:", boardBookmarkError.message);
    return null;
  }

  const boardBookmarkDataId = boardBookmarkData?.map((board) => board.board_id);

  const { data: boardListData, error: boardListError } = await supabase
    .from("board")
    .select("*")
    .in("board_id", boardBookmarkDataId);

  if (boardListError) {
    console.error("Error fetching qna:", boardListError.message);
    return [];
  }

  // 3. board_comments QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: boardLikeListComment, error: boardListCommentError } =
    await supabase
      .from("board_comments")
      .select("*")
      .in("board_id", boardBookmarkDataId); // qna_id를 기반으로 조회

  if (boardListCommentError) {
    console.error(
      "Error fetching related data from another_table:",
      boardListCommentError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
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
    return []; // 추가 데이터가 없더라도 QnA
  }

  // 5. board_views QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: boardLikeListView, error: boardListViewError } = await supabase
    .from("board_views")
    .select("*")
    .in("board_id", boardBookmarkDataId);

  if (boardListViewError) {
    console.error(
      "Error fetching related data from another_table:",
      boardListViewError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 6. board_images QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: boardLikeListImage, error: boardListImageError } =
    await supabase
      .from("board_images")
      .select("*")
      .in("board_id", boardBookmarkDataId);

  if (boardListImageError) {
    console.error(
      "Error fetching related data from another_table:",
      boardListImageError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  const { data: boardLikeData, error: boardLikeError } = await supabase
    .from("board_likes")
    .select("*")
    .in("board_id", boardBookmarkDataId);

  if (boardLikeError) {
    console.error(
      "Error fetching related data from another_table:",
      boardLikeError.message
    );
    return []; // 추가 데이터가 없더라도
  }

  // 6. Board 데이터에 another_table 데이터를 매핑
  const result = boardListData.map((board) => ({
    ...board,
    boardComment: boardLikeListComment.filter(
      (comment) => comment.board_id === board.board_id
    ), // 매칭되는 데이터 추가
    boardCategory: categoryData.filter(
      (category) => category.category_id === board.category_id
    ), // 매칭되는 데이터 추가
    boardView: boardLikeListView.filter(
      (view) => view.board_id === board.board_id
    ), // 매칭되는 데이터 추가
    boardImage: boardLikeListImage.filter(
      (image) => image.board_id === board.board_id
    ),
    boardLike: boardLikeData.filter((like) => like.board_id === board.board_id),
  }));

  return result;
}