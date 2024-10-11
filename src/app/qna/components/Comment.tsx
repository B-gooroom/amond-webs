"use client";
import { QnAChildComment } from "@/app/types/type";
import Icon from "@/components/Icon/page";
import UserInfoDetail from "@/components/UserInfoDetail/page";
import { QnaComment } from "@/services/qna-comment";
import { useEffect, useState } from "react";

interface CommentProps {
  qna_id: number;
  user_id: string;
  created_at: Date;
  content: string;
  parent_comment_id: number;
}

export default function Comment({
  qna_id,
  user_id,
  created_at,
  content,
  parent_comment_id,
}: CommentProps) {
  const [childComment, setChildComment] = useState<QnAChildComment[] | null>(
    null
  );

  useEffect(() => {
    const fetchChildComment = async () => {
      const childData = await QnaComment({ user_id, parent_comment_id });
      setChildComment(childData);
    };
    fetchChildComment();

    // const postDetail = async () => {
    //   const detailData = await QnaDetail({ id: qna_id });
    //   if (detailData) {
    //     setChildComment(detailData);
    //   }
    // };
    // postDetail();
  }, []);

  // console.log("childComment", childComment);

  return (
    <>
      <UserInfoDetail
        userNickname={childComment ? "fkfk" : user_id}
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
            {childComment && childComment.length}
          </span>
        </div>
      </div>
    </>
  );
}
