import { Board } from "@/app/types/board";
import { QnA } from "@/app/types/type";
import { List } from "@/components/List/page";
import ListWithLike from "@/components/ListWithLike/page";
import { Spacer } from "@/components/Spacer/page";
import {
  BoardListByUser,
  QnaListByUser,
} from "@/services/profile/profile-activity-by-user";
import Image from "next/image";
import { useEffect, useState } from "react";

interface PostListProps {
  selectedTab: number;
}

export default function PostList({ selectedTab }: PostListProps) {
  const [postQna, setPostQna] = useState<QnA[] | null>(null);
  const [postBoard, setPostBoard] = useState<Board[] | null>(null);

  useEffect(() => {
    const fetchPostList = async () => {
      const postList = await QnaListByUser();
      const listData = await BoardListByUser();

      if (postList) {
        setPostQna(postList);
      }
      if (listData) {
        setPostBoard(listData);
      }
    };
    fetchPostList();
  }, []);

  return (
    <div className="px-16">
      {selectedTab === 0 &&
        (postQna?.length ? (
          <>
            {postQna.map((post, index) => {
              const {
                title,
                content,
                qnaCategory,
                qnaComment,
                qnaView,
                qnaImage,
              } = post;

              const imageUrl = qnaImage[0]?.image_url || "";

              return (
                <div key={index}>
                  <Spacer className="h-16" />
                  <List
                    title={title}
                    label={qnaCategory[0]?.category_name}
                    description={content}
                    comments={qnaComment.length}
                    views={qnaView[0]?.view_count}
                    images={imageUrl ? imageUrl : ""}
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            <Spacer className="h-[200px]" />
            <div className="flex flex-col gap-16 items-center justify-center h-[50%]">
              <Image
                src="/images/ImgHada.png"
                alt="하다프로필이미지"
                width={160}
                height={98}
              />
              <div className="text-body2 text-ad-gray-500">
                작성한 글이 없어요
              </div>
            </div>
          </>
        ))}
      {selectedTab === 1 &&
        (postBoard?.length ? (
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
                <div key={index}>
                  <Spacer className="h-16" />
                  <ListWithLike
                    title={title}
                    label={boardCategory[0]?.category_name}
                    description={content}
                    comments={boardLike.length}
                    views={boardView[0]?.view_count}
                    likes={boardLike}
                    user_id={user_id}
                    // images="/images/1.jpg"
                  />
                </div>
              );
            })}
          </>
        ) : (
          <>
            <Spacer className="h-[200px]" />
            <div className="flex flex-col gap-16 items-center justify-center h-[50%]">
              <Image
                src="/images/ImgHada.png"
                alt="하다프로필이미지"
                width={160}
                height={98}
              />
              <div className="text-body2 text-ad-gray-500">
                작성한 글이 없어요
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
