"use client";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Label from "@/components/Label/page";
import { Spacer } from "@/components/Spacer/page";
import UserInfoDetail from "@/components/UserInfoDetail/page";
import { ImageSignedUrl } from "@/services/image-signed-url";
import { ProfileUser } from "@/services/profile/profile-user";
import { QnaAddBookmark, QnaAddLike, QnaDetail } from "@/services/qna-detail";
import { QnaViewIncrement } from "@/services/qna-view-increment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QnA, QnAImage, User } from "../../types/type";
import Comment from "../components/Comment";

export interface QnaAddLikeProps {
  qna_id: number;
}

export interface QnaAddBookmarkProps {
  qna_id: number;
}

export default function QnaDetailPage() {
  const { id } = useParams();
  const [qnaDetail, setQnaDetail] = useState<QnA[] | null>(null);
  const [userData, setUserData] = useState<User | null>(null);

  const [likesCount, setLikesCount] = useState<number | null>(null); // 좋아요 수 상태 관리
  const [hasLiked, setHasLiked] = useState<boolean>(false); // 좋아요 여부 상태

  const [hasBookmarked, setHasBookmarked] = useState<boolean>(false); // 북마크 여부 상태

  const [signedImageUrls, setSignedImageUrls] = useState<string[]>([]); // 서명된 URL들

  useEffect(() => {
    const postDetail = async () => {
      const userData = await ProfileUser();

      const detailData = await QnaDetail({ id: id as string });
      if (detailData) {
        setQnaDetail(detailData);
        setLikesCount(detailData[0].qnaLike.length);
        setHasLiked(detailData[0].qnaLike.length > 0);
        setHasBookmarked(detailData[0].qnaBookmark.length > 0);

        // 이미지 URL을 서명된 URL로 변환하는 작업
        const imageUrls = await Promise.all(
          detailData[0].qnaImage.map(async (image: QnAImage) => {
            console.log("image", image);

            const signedUrl = await ImageSignedUrl(image.image_url);
            return signedUrl;
          })
        );
        setSignedImageUrls(imageUrls);
      }
      if (userData) {
        setUserData(userData);
      }

      await QnaViewIncrement({ id: id as string });
    };

    postDetail();
  }, [id]);

  if (!qnaDetail) {
    return <p>Loading...</p>;
  }

  const addLike = async ({ qna_id }: QnaAddLikeProps) => {
    const data = await QnaAddLike({ qna_id });
    // console.log(data);
    if (data) {
      setLikesCount((prev) => (hasLiked ? (prev ?? 0) - 1 : (prev ?? 0) + 1));
      setHasLiked((prev) => !prev);
    }
  };

  const addBookmark = async ({ qna_id }: QnaAddBookmarkProps) => {
    // console.log("북마크 추가");
    const data = await QnaAddBookmark({ qna_id });
    // console.log(data);
    if (data) {
      setHasBookmarked((prev) => !prev);
    }
  };

  console.log("qnaDetail", qnaDetail);

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
          user_id,
          qna_id,
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
                isWriter={userData?.user_id === user_id}
              />
              <div className="text-subtitle1">
                <span className="text-ad-brown-800">Q. </span>
                {title}
              </div>
              <p className="text-subtitle2">{content}</p>
            </div>
            {signedImageUrls.length > 0 && (
              <div className="flex gap-16">
                {signedImageUrls.map((signedUrl, index) => {
                  console.log("signedUrl", signedUrl);

                  return (
                    <Image
                      key={index}
                      src={signedUrl || ""}
                      alt="이미지"
                      width={64}
                      height={64}
                    />
                  );
                })}
              </div>
            )}
            <Spacer className="h-16" />
            <div className="pb-[32px] border-b flex gap-16">
              <div onClick={() => addLike({ qna_id })}>
                <Icon
                  icon={hasLiked ? "IconFavoriteActive" : "IconFavorite"}
                  size={24}
                />
                <span className="text-caption1">{likesCount}</span>
              </div>
              <div onClick={() => addBookmark({ qna_id })}>
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
}
