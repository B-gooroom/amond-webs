"use client";
import Label from "@/components/Label/page";

interface SelectBoardProps {
  category: number;
  setCategory: (value: number) => void;
  board: number;
}

const CategoryLabels = [
  // { value: 0, label: "전체" },
  { value: 1, label: "자유" },
  { value: 2, label: "레시피" },
  { value: 3, label: "아몬드마켓" },
  { value: 4, label: "매장/점포" },
  { value: 5, label: "창업" },
];

export default function SelectBoard({
  category,
  setCategory,
  board,
}: SelectBoardProps) {
  const filteredLabels = CategoryLabels.filter((item) => {
    if (board === 0) return item.value <= 3; // board가 0일 때 3번 창업까지
    if (board === 1) return true; // board가 1일 때 모두 보여줌
    return false; // 그 외에는 표시하지 않음
  });

  return (
    <div className="flex gap-8 overflow-auto whitespace-nowrap h-[34px] items-center">
      {filteredLabels.map((item, index) => {
        const { value, label } = item;

        return (
          <div key={index} onClick={() => setCategory(value)}>
            <Label key={index} color={category === value ? "brown" : "gray"}>
              {label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
