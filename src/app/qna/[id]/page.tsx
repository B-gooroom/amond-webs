"use client";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Label from "@/components/Label/page";
import { Spacer } from "@/components/Spacer/page";
import UserInfoDetail from "@/components/UserInfoDetail/page";
import { ProfileUser } from "@/services/profile-user";
import { QnaAddLike, QnaDetail } from "@/services/qna-detail";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QnA, User } from "../../types/type";
import Comment from "../components/Comment";

export interface QnaAddLikeProps {
  qna_id: number;
  user_id: string;
}

const QnaDetailPage = () => {
  const { id } = useParams();
  const [qnaDetail, setQnaDetail] = useState<QnA[] | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  const [likesCount, setLikesCount] = useState<number>(0); // 좋아요 수 상태 관리
  const [hasLiked, setHasLiked] = useState<boolean>(false); // 좋아요 여부 상태

  useEffect(() => {
    const postDetail = async () => {
      const userData = await ProfileUser();

      const detailData = await QnaDetail({ id: id as string });
      if (detailData) {
        setQnaDetail(detailData);
      }
      if (userData) {
        setUserData(userData);
      }

      // await QnaViewIncrement({ id: id as string });
    };

    postDetail();
  }, [id]);

  if (!qnaDetail) {
    return <p>Loading...</p>;
  }

  console.log("userData", userData);

  const addLike = async ({ qna_id, user_id }: QnaAddLikeProps) => {
    // const data = await BoardAddLike({ board_id, user_id });
    // console.log("좋아요 추가", data);
    // setLikesCount((prev) => prev + 1);
    if (hasLiked) {
      // 이미 좋아요를 눌렀다면 좋아요 취소 (좋아요 수 감소)
      setLikesCount((prev) => prev - 1);
      setHasLiked(false); // 좋아요 비활성화
      // 좋아요 삭제 로직 (delete)
      // await BoardRemoveLike({ board_id, user_id });
    } else {
      // 좋아요 추가 (좋아요 수 증가)
      setLikesCount((prev) => prev + 1);
      setHasLiked(true); // 좋아요 활성화
      const data = await QnaAddLike({ qna_id, user_id });
      console.log("좋아요 추가", data);
    }
  };

  return (
    <>
      <Header title="" leftItem="IconLeftArrow" />
      <Spacer className="h-16" />
      {qnaDetail.map((qna, index) => {
        const {
          title,
          content,
          qnaCategory,
          qnaUser,
          created_at,
          qnaComment,
          qnaImage,
          qnaLike,
          user_id,
          qna_id,
        } = qna;

        // console.log("qnaDetail", qnaLike);

        return (
          <div key={index} className="px-16">
            <Label size="medium" color="gray">
              {`${qnaCategory[0].category_name}`}
            </Label>
            <Spacer className="h-16" />
            <div className="flex flex-col gap-16">
              <UserInfoDetail
                // profile_image={qnaUser[0].profile_image}
                userNickname={qnaUser[0].nickname}
                created_at={created_at}
                isWriter={userData?.user_id === user_id}
              />
              <div className="text-subtitle1">
                <span className="text-ad-brown-800">Q. </span>
                {title}
              </div>
              <p className="text-subtitle2">{content}</p>
            </div>
            {qnaImage && (
              <div className="flex gap-16">
                {qnaImage.map((image, index) => (
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
              <div onClick={() => addLike({ qna_id, user_id })}>
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
            {qnaComment ? (
              <Comment />
            ) : (
              <div>아직 답변이 없습니다. 첫 번째 답변을 남겨주세요!</div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default QnaDetailPage;
