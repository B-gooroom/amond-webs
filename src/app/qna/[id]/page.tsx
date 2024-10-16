"use client";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Label from "@/components/Label/page";
import { Spacer } from "@/components/Spacer/page";
import UserInfoDetail from "@/components/UserInfoDetail/page";
import { QnaDetail } from "@/services/qna-detail";
import { QnaViewIncrement } from "@/services/qna-view-increment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QnA } from "../../types/type";
import Comment from "../components/Comment";

const QnaDetailPage = () => {
  const { id } = useParams();
  const [qnaDetail, setQnaDetail] = useState<QnA[] | null>(null);

  useEffect(() => {
    const postDetail = async () => {
      const detailData = await QnaDetail({ id: id as string });
      if (detailData) {
        setQnaDetail(detailData);
      }

      await QnaViewIncrement({ id: id as string });
    };

    postDetail();
  }, [id]);

  if (!qnaDetail) {
    return <p>Loading...</p>;
  }

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
        } = qna;
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
              <div>
                <Icon icon="IconFavorite" size={24} />
                <span className="text-caption1">{23}</span>
              </div>
              {/* <div>
                <Icon icon="IconComment" size={24} />
                <span className="text-caption1">{qnaComment.length}</span>
              </div> */}
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
