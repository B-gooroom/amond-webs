"use client";
import Button from "@/components/Button/page";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import { Spacer } from "@/components/Spacer/page";
import { useState } from "react";

export default function Report() {
  const [category, setCategory] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleReportChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    setContent(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setCategory(e.target.value);
  };

  const isDisabled = () => {
    if (category.length && content.length) {
      return true;
    }
    return false;
  };

  const handleReportSubmit = () => {
    console.log("신고 제출 클릭");
    // TODO: 신고 제출 post 추가
  };

  return (
    <div>
      <Header title="신고하기" leftItem="IconClose" />
      <Spacer className="h-24" />
      <section className="px-16">
        <p className="text-body1">신고 유형</p>
        <Spacer className="h-8" />
        <select
          className="border rounded-2xl px-16 py-10 w-full"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="1">허위 사실을 기재했어요</option>
          <option value="2">부적절한 사진이에요</option>
          <option value="3">부적절한 내용이에요</option>
          <option value="4">규정을 위반했어요</option>
          <option value="5">아몬드 활동에 적절하지 않아요</option>
          <option value="6">기타</option>
        </select>
        <Spacer className="h-24" />
        <p className="text-body1">신고 내용</p>
        <Spacer className="h-8" />
        <textarea
          className="border text-body2 rounded-2xl px-16 py-12 focus:outline-none focus:ring-2 focus:ring-ad-brown-800 resize-none h-[150px] w-full"
          value={content}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={handleReportChange}
          placeholder="신고 내용을 상세하게 작성해 주시면 더욱 신속하고 정확
한 검토가 가능해요"
        />
      </section>
      <Spacer className="h-20" />
      <div className="flex flex-col gap-12 text-caption1 text-ad-gray-500 px-16">
        <div className="flex items-center gap-4">
          <Icon icon="IconError" className="fill-ad-gray-500" />
          해당 회원이 신고 대상에 해당하는지 다시 한번 확인해 주세요
        </div>
        <div className="flex items-center gap-4">
          <Icon icon="IconError" className="fill-ad-gray-500" />
          신고를 제출하면 아몬드에서 조사를 진행하며 사실 관계 확인을 위해
          신고자에게 객관적 자료를 요청할 수 있어요
        </div>
        <div className="flex items-center gap-4">
          <Icon icon="IconError" className="fill-ad-gray-500" />
          신고를 제출한 회원의 정보는 신고된 회원에게 공개되지 않으나 꼭 필요한
          신고 내용의 일부는 언급될 수 있어요
        </div>
        <div className="flex items-center gap-4">
          <Icon icon="IconError" className="fill-ad-gray-500" />
          신고된 회원은 아몬드 이용약관에 따라 활동 제한 등 불이익을 받을 수
          있으며 쌍방 과실일 경우 신고를 제출한 회원 또한 활동 제한 등의
          불이익을 받을 수 있어요
        </div>
      </div>
      <div className="px-16 pt-14 pb-[34px] w-full bottom-0 -ml-[1px] fixed max-w-[500px]">
        <Button
          label="제출 완료"
          type={isDisabled() ? "primary" : "disabled"}
          disabled={!isDisabled()}
          onClick={handleReportSubmit}
        />
      </div>
    </div>
  );
}
