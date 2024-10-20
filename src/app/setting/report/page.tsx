"use client";
import Header from "@/components/Header/page";
import { Spacer } from "@/components/Spacer/page";
import Image from "next/image";

export default function Report() {
  return (
    <div>
      <Header title="신고하기" leftItem="IconLeftArrow" />
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <Image
          src="/images/ImgHada.png"
          alt="신고하기"
          width={160}
          height={98}
          quality={100}
        />
        <Spacer className="h-16" />
        <p className="text-body2 text-ad-gray-500">차단/신고한 글이 없어요</p>
      </div>
    </div>
  );
}
