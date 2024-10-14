"use client";
import { Board } from "@/app/types/board";
import Label from "@/components/Label/page";
import ListWithLike from "@/components/ListWithLike/page";
import PostButton from "@/components/PostButton/page";
import { Spacer } from "@/components/Spacer/page";
import { BoardListData } from "@/services/board-list";
import Link from "next/link";
import { useEffect, useState } from "react";

const CategoryLabels = [
  { value: 0, label: "전체" },
  { value: 1, label: "인기" },
  { value: 2, label: "자유" },
  { value: 3, label: "레시피" },
  { value: 4, label: "창업" },
  { value: 5, label: "아몬드마켓" },
  { value: 6, label: "매장/점포" },
];

export default function BoardList() {
  const [boardListData, setBoardListData] = useState<Board[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const boardList = async () => {
      const listData = await BoardListData();

      if (listData) {
        setBoardListData(listData);
      }
    };
    boardList();
  }, []);

  console.log("boardListData", boardListData);

  if (!boardListData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div>
        <div className="flex gap-8 overflow-auto whitespace-nowrap h-[36px] items-center px-16 no-scroll">
          {CategoryLabels.map((item, index) => {
            const { value, label } = item;

            return (
              <div key={index} onClick={() => setSelectedCategory(value)}>
                <Label
                  key={index}
                  color={selectedCategory === value ? "brown" : undefined}
                >
                  {label}
                </Label>
              </div>
            );
          })}
        </div>
        <Spacer className="h-8" />
        <div className="px-16">
          {boardListData.map((list, index) => {
            const {
              title,
              content,
              boardCategory,
              boardComment,
              boardView,
              boardLike,
            } = list;

            // console.log("list", list);

            return (
              <div key={index}>
                <Spacer className="h-16" />
                <ListWithLike
                  label={boardCategory[0]?.category_name}
                  title={title}
                  description={content}
                  comments={boardComment.length}
                  views={boardView[0] ? boardView[0].view_count : 0}
                  likes={boardLike.length}
                />
              </div>
            );
          })}
        </div>
      </div>
      <PostButton>
        <Link href="/post">+ 글쓰기</Link>
      </PostButton>
    </>
  );
}
