import { Board } from "@/app/types/board";
import { QnA } from "@/app/types/type";
import List from "@/components/List/page";
import ListWithLike from "@/components/ListWithLike/page";
import { BoardListData } from "@/services/board-list";
import { QnaList } from "@/services/qna-list";
import { useEffect, useState } from "react";

interface PostListProps {
  selectedTab: number;
}

export default function PostList({ selectedTab }: PostListProps) {
  // const [postAll, setPostAll] = useState<QnA[] | null>(null);
  const [postQna, setPostQna] = useState<QnA[] | null>(null);
  const [postBoard, setPostBoard] = useState<Board[] | null>(null);

  useEffect(() => {
    const fetchPostList = async () => {
      const postList = await QnaList();
      const listData = await BoardListData();

      if (postList) {
        setPostQna(postList);
      }
      if (listData) {
        setPostBoard(listData);
      }
    };
    fetchPostList();
  }, []);

  // console.log("selectedTab", selectedTab);
  // TODO: selectedTab에 따라 다른 게시물을 보여줄 수 있도록 구현하기

  return (
    <div className="p-16">
      {selectedTab === 0 && postQna ? (
        // 질문하다
        <>
          {postQna.map((post, index) => {
            const { title, content, qnaCategory, qnaComment, qnaView } = post;

            return (
              <List
                key={index}
                title={title}
                label={qnaCategory[0]?.category_name}
                description={content}
                comments={qnaComment.length}
                views={qnaView[0]?.view_count}
                images="/images/1.jpg"
              />
            );
          })}
        </>
      ) : selectedTab === 1 && postBoard ? (
        // 소통하다
        <>
          {postBoard.map((post, index) => {
            const {
              user_id,
              title,
              content,
              boardCategory,
              boardLike,
              boardView,
            } = post;

            return (
              <ListWithLike
                key={index}
                title={title}
                label={boardCategory[0]?.category_name}
                description={content}
                comments={boardLike.length}
                views={boardView[0]?.view_count}
                likes={boardLike}
                user_id={user_id}
                // images="/images/1.jpg"
              />
            );
          })}
        </>
      ) : (
        <div>작성한 게시물을 확인할 수 있어요.</div>
        // 전체
      )}
    </div>
  );
}
