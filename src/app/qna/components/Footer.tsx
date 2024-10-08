"use client";
import Icon from "@/components/Icon/page";
import { Spacer } from "@/components/Spacer/page";

export function Footer() {
  return (
    <div className="h-[220px] bg-ad-gray-50 p-16">
      <p className="text-subtitle1">아몬드</p>
      <Spacer className="h-16" />
      <div className="flex gap-16 text-ad-gray-500 text-caption1">
        {/* TODO: 링크 추가 */}
        <div className="flex items-center gap-[2px]">
          이용약관
          <Icon
            icon="IconRightArrow"
            className="fill-ad-gray-500 float-right"
          />
        </div>
        <div className="flex items-center gap-[2px]">
          개인정보처리방침
          <Icon
            icon="IconRightArrow"
            className="fill-ad-gray-500 float-right"
          />
        </div>
        <div className="flex items-center gap-[2px]">
          고객센터
          <Icon
            icon="IconRightArrow"
            className="fill-ad-gray-500 float-right"
          />
        </div>
      </div>
      <Spacer className="h-16" />
      <p className="text-caption2 text-ad-gray-500">
        Copyright ⓒ 2024 아몬드 All Rights Reserved.
      </p>
    </div>
  );
}
