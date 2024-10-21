"use client";
import { Board } from "@/app/types/board";
import { User } from "@/app/types/type";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Label from "@/components/Label/page";
import { Spacer } from "@/components/Spacer/page";
import UserInfoDetail from "@/components/UserInfoDetail/page";
import {
  BoardAddBookmark,
  BoardAddLike,
  BoardDetail,
} from "@/services/board-detail";
import { BoardViewIncrement } from "@/services/board-view-increment";
import { ProfileUser } from "@/services/profile/profile-user";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface BoardAddLikeProps {
  board_id: number;
}

export interface BoardAddBookmarkProps {
  board_id: number;
}

export default function BoardDetailPage() {
  const { id } = useParams();
  const [boardDetail, setBoardDetail] = useState<Board[] | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  const [likesCount, setLikesCount] = useState<number>(0); // 좋아요 수 상태 관리
  const [hasLiked, setHasLiked] = useState<boolean>(false); // 좋아요 여부 상태

  const [hasBookmarked, setHasBookmarked] = useState<boolean>(false); // 북마크 여부 상태

  useEffect(() => {
    const postDetail = async () => {
      const userData = await ProfileUser();
      if (userData) {
        setUserData(userData);
      }

      const detailData = await BoardDetail({ id: id as string });
      if (detailData) {
        setBoardDetail(detailData);
        setLikesCount(detailData[0].boardLike.length); // 좋아요 수 초기 설정
        setHasLiked(detailData[0].boardLike.length > 0);
        setHasBookmarked(detailData[0].boardBookmark.length > 0);
      }

      await BoardViewIncrement({ id: id as string });
    };

    postDetail();
  }, [id]);

  const addLike = async ({ board_id }: BoardAddLikeProps) => {
    const data = await BoardAddLike({ board_id });

    if (data) {
      setLikesCount((prev) => (hasLiked ? prev - 1 : prev + 1));
      setHasLiked((prev) => !prev);
    }
  };

  const addBookmark = async ({ board_id }: BoardAddBookmarkProps) => {
    // console.log("북마크 추가");
    const data = await BoardAddBookmark({ board_id });
    // console.log(data);
    if (data) {
      setHasBookmarked((prev) => !prev);
    }
  };

  if (!boardDetail) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header title="" leftItem="IconLeftArrow" />
      <Spacer className="h-16" />
      {boardDetail.map((qna, index) => {
        const {
          title,
          content,
          boardCategory,
          created_at,
          boardUser,
          // boardComment,
          boardImage,
          // boardLike,
          user_id,
          board_id,
        } = qna;

        return (
          <div key={index} className="px-16">
            <Label size="medium" color="gray">
              {`${boardCategory[0].category_name}`}
            </Label>
            <Spacer className="h-16" />
            <div className="flex flex-col gap-16">
              <UserInfoDetail
                // profile_image={qnaUser[0].profile_image}
                userNickname={boardUser[0].nickname}
                created_at={created_at}
                isWriter={userData?.user_id === user_id}
              />
              <div className="text-subtitle1">
                <span className="text-ad-brown-800">Q. </span>
                {title}
              </div>
              <p className="text-subtitle2">{content}</p>
            </div>
            {boardImage && (
              <div className="flex gap-16">
                {boardImage.map((image, index) => (
                  <Image
                    key={index}
                    src={image.image_url}
                    alt="하다프로필이미지"
                    width={48}
                    height={48}
                  />
                ))}
              </div>
            )}
            <Spacer className="h-16" />
            <div className="pb-[32px] border-b flex gap-16">
              <div onClick={() => addLike({ board_id })}>
                {/* <Icon icon="IconFavorite" size={24} /> */}
                <Icon
                  icon={hasLiked ? "IconFavoriteActive" : "IconFavorite"}
                  size={24}
                />
                <span className="text-caption1">{likesCount}</span>
              </div>
              <div onClick={() => addBookmark({ board_id })}>
                <Icon
                  icon={hasBookmarked ? "IconBookmarkActive" : "IconBookmark"}
                  size={24}
                />
              </div>
              <div>
                <Icon icon="IconShare" size={24} />
                {/* TODO: 공유하기 기능 추가 */}
              </div>
            </div>
            <Spacer className="h-32" />
            {/* {boardComment ? (
              <Comment />
            ) : (
              <div>아직 답변이 없습니다. 첫 번째 답변을 남겨주세요!</div>
            )} */}
          </div>
        );
      })}
    </>
  );
}
