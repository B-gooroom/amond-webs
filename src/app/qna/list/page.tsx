"use client";
import { QnA } from "@/app/types/type";
import Header from "@/components/Header/page";
import Label from "@/components/Label/page";
import List from "@/components/List/page";
import { Spacer } from "@/components/Spacer/page";
import { QnaList } from "@/services/qna-list";
import { useEffect, useState } from "react";

const CategoryLabels = [
  { value: 0, label: "전체" },
  { value: 1, label: "인기" },
  { value: 2, label: "자유" },
  { value: 3, label: "레시피" },
  { value: 4, label: "창업" },
];

export default function QnAList() {
  const [listData, setListData] = useState<QnA[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const qnaList = async () => {
      const listData = await QnaList();

      if (listData) {
        setListData(listData);
      }
    };
    qnaList();
  }, []);

  return (
    <div>
      <Header title="질문하다" leftItem="IconLeftArrow" />
      <Spacer className="h-16" />
      <div className="flex gap-8 overflow-auto whitespace-nowrap h-[34px] items-center px-16">
        {CategoryLabels.map((item, index) => {
          const { value, label } = item;

          return (
            <div key={index} onClick={() => setSelectedCategory(value)}>
              <Label
                key={index}
                color={selectedCategory === value ? "brown" : "gray"}
              >
                {label}
              </Label>
            </div>
          );
        })}
      </div>
      <Spacer className="h-24" />
      <div className="px-16">
        {listData?.map((list, index) => {
          const { title, qnaCategory, content, qnaComment, qnaView, qnaImage } =
            list;

          // TODO: imageUrl array인지 object인지 확인
          const imageUrl = qnaImage.image_url || "";
          console.log("qnaImage", qnaImage);
          return (
            <List
              key={index}
              title={title}
              label={qnaCategory[0].category_name}
              description={content}
              comments={qnaComment.length}
              views={qnaView.length}
              images={imageUrl ? imageUrl : ""}
            />
          );
        })}
      </div>
    </div>
  );
}