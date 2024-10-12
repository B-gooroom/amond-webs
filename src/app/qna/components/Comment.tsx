"use client";
import { QnAChildComment } from "@/app/types/type";
import Icon from "@/components/Icon/page";
import UserInfoDetail from "@/components/UserInfoDetail/page";
import { QnaComment } from "@/services/qna-comment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Comment() {
  const { id } = useParams();
  const [childComment, setChildComment] = useState<QnAChildComment[] | null>(
    null
  );

  useEffect(() => {
    const fetchChildComment = async () => {
      const childData = await QnaComment({ id: id as string });
      if (!childData) return;
      setChildComment(childData);
    };
    fetchChildComment();
  }, []);

  if (!childComment) return <p>Loading...</p>;

  return (
    <>
      <div className="flex flex-col gap-16">
        <p className="text-subtitle1">
          <span className="text-ad-brown-800">A. </span>
          {childComment.length}개의 답변
        </p>
        {childComment.map((comment, index) => {
          const { content, created_at, qnaUser, qnaCommentData } = comment;

          return (
            <div key={index} className="flex flex-col gap-16">
              <UserInfoDetail
                userNickname={qnaUser[0].nickname}
                created_at={created_at}
              />
              <p className="text-subtitle2">{content}</p>
              <div className="pb-[16px] border-b flex gap-16">
                <div>
                  <Icon icon="IconFavorite" size={24} />
                  <span className="text-caption1">{23}</span>
                </div>
                <div>
                  <Icon icon="IconComment" size={24} />
                  <span className="text-caption1">
                    {qnaCommentData.length > 0 && qnaCommentData.length}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
