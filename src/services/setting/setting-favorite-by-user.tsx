import { supabase } from "@/utils/supabase/client";
import { ProfileUser } from "../profile/profile-user";

export async function QnaFavoriteByUser() {
  const user = await ProfileUser();

  const userId = user?.user_id;

  const { data: qnaLikeData, error: qnaLikeError } = await supabase
    .from("qna_likes")
    .select("*")
    .eq("user_id", userId);

  if (qnaLikeError) {
    console.error("Error fetching qna_likes:", qnaLikeError.message);
    return [];
  }

  const qnaId = qnaLikeData.map((qna) => qna.qna_id);

  const { data: qnaListData, error: qnaListError } = await supabase
    .from("qna")
    .select("*")
    .in("qna_id", qnaId);

  if (qnaListError) {
    console.error("Error fetching qna:", qnaListError.message);
    return [];
  }

  // 3. qna_comments QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: qnaLikeListComment, error: qnaListCommentError } =
    await supabase.from("qna_comments").select("*").in("qna_id", qnaId); // qna_id를 기반으로 조회

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
  const { data: qnaLikeListView, error: qnaListViewError } = await supabase
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
  const { data: qnaLikeListImage, error: qnaListImageError } = await supabase
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
    qnaComment: qnaLikeListComment.filter(
      (comment) => comment.qna_id === qna.qna_id
    ), // 매칭되는 데이터 추가
    qnaCategory: categoryData.filter(
      (category) => category.category_id === qna.category_id
    ), // 매칭되는 데이터 추가
    qnaView: qnaLikeListView.filter((view) => view.qna_id === qna.qna_id), // 매칭되는 데이터 추가
    qnaImage: qnaLikeListImage.filter((image) => image.qna_id === qna.qna_id), //
  }));
  return result;
}

export async function BoardFavoriteByUser() {
  const user = await ProfileUser();

  const userId = user?.user_id;

  const { data: boardLikeData, error: qnaLikeError } = await supabase
    .from("board_likes")
    .select("*")
    .eq("user_id", userId);

  if (qnaLikeError) {
    console.error("Error fetching qna_likes:", qnaLikeError.message);
    return [];
  }

  const boardId = boardLikeData.map((board) => board.board_id);

  const { data: boardListData, error: boardListError } = await supabase
    .from("board")
    .select("*")
    .in("board_id", boardId);

  if (boardListError) {
    console.error("Error fetching qna:", boardListError.message);
    return [];
  }

  // 3. qna_comments QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: boardLikeListComment, error: boardListCommentError } =
    await supabase.from("board_comments").select("*").in("board_id", boardId); // qna_id를 기반으로 조회

  if (boardListCommentError) {
    console.error(
      "Error fetching related data from another_table:",
      boardListCommentError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
  }

  // 4. category_id를 기반으로 카테고리 정보를 가져옴
  const categoryId = boardListData.map((board) => board.category_id);

  // console.log("categoryId", categoryId);
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
  const { data: boardLikeListView, error: boardListViewError } = await supabase
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

  // 6. qna_images QnA의 id를 기반으로 추가 정보를 가져옴
  const { data: boardLikeListImage, error: boardListImageError } =
    await supabase.from("board_images").select("*").in("board_id", boardId);

  if (boardListImageError) {
    console.error(
      "Error fetching related data from another_table:",
      boardListImageError.message
    );
    return []; // 추가 데이터가 없더라도 QnA 데이터를 반환
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
