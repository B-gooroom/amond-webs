"use client";
import Icon from "@/components/Icon/page";
import { Spacer } from "@/components/Spacer/page";
import Link from "next/link";

const FooterItems = [
  {
    title: "이용약관",
    link: "/setting/terms-of-service",
  },
  {
    title: "개인정보처리방침",
    link: "/setting/privacy-policy",
  },
  {
    title: "고객센터",
    link: "/setting/customer-service",
  },
];

export function Footer() {
  return (
    <div className="h-[220px] bg-ad-gray-50 p-16">
      <p className="text-subtitle1">아몬드</p>
      <Spacer className="h-16" />
      <div className="flex gap-16 text-ad-gray-500 text-caption1">
        {FooterItems.map((item, index) => {
          const { title, link } = item;
          return (
            <Link
              key={index}
              className="flex items-center gap-[2px] justify-center"
              href={link}
            >
              {title}
              <Icon
                icon="IconRightArrow"
                className="fill-ad-gray-500 float-right"
                size={12}
              />
            </Link>
          );
        })}
      </div>
      <Spacer className="h-16" />
      <p className="text-caption2 text-ad-gray-500">
        Copyright ⓒ 2024 아몬드 All Rights Reserved.
      </p>
    </div>
  );
}
