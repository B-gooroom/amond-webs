"use client";
import { Board } from "@/app/types/board";
import { QnA } from "@/app/types/type";
import Header from "@/components/Header/page";
import List from "@/components/List/page";
import ListWithLike from "@/components/ListWithLike/page";
import { Spacer } from "@/components/Spacer/page";
import Tab from "@/components/Tab/page";
import {
  BoardBookmarkByUser,
  QnaBookmarkByUser,
} from "@/services/setting/setting-bookmark-by-user";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Bookmark() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [qnaBookmarkList, setQnaBookmarkList] = useState<QnA[] | null>(null);
  const [boardBookmarkList, setBoardBookmarkList] = useState<Board[] | null>(
    null
  );

  useEffect(() => {
    const getBookmarkList = async () => {
      const qnaBookmarkList = await QnaBookmarkByUser();
      const boardBookmarkList = await BoardBookmarkByUser();
      if (qnaBookmarkList) {
        setQnaBookmarkList(qnaBookmarkList);
      }
      if (boardBookmarkList) {
        setBoardBookmarkList(boardBookmarkList);
      }
    };
    getBookmarkList();
  }, []);

  // console.log("qnaBookmarkList", qnaBookmarkList);
  // console.log("boardBookmarkList", boardBookmarkList);

  return (
    <div>
      <Header title="북마크" leftItem="IconLeftArrow" />
      <Tab
        tabs={["질문하다", "소통하다"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === 0 &&
        (qnaBookmarkList?.length ? (
          <>
            {qnaBookmarkList.map((qna, index) => {
              const { title, content, qnaCategory, qnaComment, qnaView } = qna;
              return (
                <div key={index} className="px-16">
                  <Spacer className="h-16" />
                  <List
                    title={title}
                    label={qnaCategory[0]?.category_name}
                    description={content}
                    comments={qnaComment.length}
                    views={qnaView[0]?.view_count}
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
                북마크한 글이 없어요
              </div>
            </div>
          </>
        ))}
      {selectedTab === 1 &&
        (boardBookmarkList?.length ? (
          <>
            {boardBookmarkList.map((board, index) => {
              const {
                user_id,
                title,
                content,
                boardCategory,
                boardLike,
                boardView,
              } = board;

              return (
                <div className="px-16" key={index}>
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
                북마크한 글이 없어요
              </div>
            </div>
          </>
        ))}
    </div>
  );
}
