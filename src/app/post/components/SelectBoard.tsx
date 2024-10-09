"use client";
import Label from "@/components/Label/page";

interface SelectBoardProps {
  board: number;
  setBoard: (value: number) => void;
}

const BoardLabels = [
  { value: 0, label: "질문하다" },
  { value: 1, label: "소통하다" },
];

export default function SelectBoard({ board, setBoard }: SelectBoardProps) {
  return (
    <div className="flex gap-8">
      {BoardLabels.map((item, index) => {
        const { value, label } = item;

        return (
          <div key={index} onClick={() => setBoard(value)}>
            <Label key={index} color={board === value ? "black" : "gray"}>
              {label}
            </Label>
          </div>
        );
      })}
    </div>
  );
}
