"use client";
import { Board } from "@/app/types/board";
import { User } from "@/app/types/type";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Label from "@/components/Label/page";
import { Spacer } from "@/components/Spacer/page";
import UserInfoDetail from "@/components/UserInfoDetail/page";
import { BoardAddLike } from "@/services/board-add-like";
import { BoardDetail } from "@/services/board-detail";
import { BoardViewIncrement } from "@/services/board-view-increment";
import { ProfileUser } from "@/services/profile-user";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface BoardAddLikeProps {
  board_id: number;
  user_id: string;
}

export default function BoardDetailPage() {
  const { id } = useParams();
  const [boardDetail, setBoardDetail] = useState<Board[] | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  const [likesCount, setLikesCount] = useState<number>(0); // 좋아요 수 상태 관리
  const [hasLiked, setHasLiked] = useState<boolean>(false); // 좋아요 여부 상태

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
      }

      await BoardViewIncrement({ id: id as string });
    };

    postDetail();
  }, [id]);

  useEffect(() => {
    if (boardDetail && userData) {
      const liked = boardDetail[0].boardLike.some(
        (board) => board.user_id === userData.user_id
      );
      setHasLiked(liked);
    }
  }, [boardDetail, userData]);

  const addLike = async ({ board_id, user_id }: BoardAddLikeProps) => {
    if (hasLiked) {
      // 이미 좋아요를 눌렀다면 좋아요 취소 (좋아요 수 감소)
      const data = await BoardAddLike({ board_id, user_id });
      if (data) {
        setLikesCount(likesCount - 1);
        setHasLiked(false);
      }
      console.log("좋아요 제거", data);
    } else {
      // 좋아요 추가 (좋아요 수 증가)
      const data = await BoardAddLike({ board_id, user_id });
      if (data) {
        setLikesCount(likesCount + 1);
        setHasLiked(true);
      }
      console.log("좋아요 추가", data);
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
          boardComment,
          boardImage,
          boardLike,
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
              <div onClick={() => addLike({ board_id, user_id })}>
                {/* <Icon icon="IconFavorite" size={24} /> */}
                <Icon
                  icon={hasLiked ? "IconFavoriteActive" : "IconFavorite"}
                  size={24}
                />
                <span className="text-caption1">{likesCount}</span>
              </div>
              <div>
                <Icon icon="IconBookmark" size={24} />
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
