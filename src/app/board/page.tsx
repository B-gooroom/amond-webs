"use client";
import Header from "@/components/Header/page";
import { Spacer } from "@/components/Spacer/page";
import { BusinessVerified } from "@/services/business-verified";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BoardList from "./list/page";

export default function Board() {
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // 회사 인증 여부 확인
    const companyVerify = async () => {
      const verified = await BusinessVerified();
      setIsVerified(verified);
    };
    companyVerify();
    // 회사 인증 여부에 따라 페이지 렌더링
  }, []);

  // console.log("isVerified", isVerified);

  return (
    <div className="w-full h-full">
      <Header title="소통하다" rightItems={["search", "notification"]} />
      {!isVerified ? (
        <BoardList />
      ) : (
        <section className="px-16 flex-col flex gap-8 items-center justify-center h-[100vh]">
          <Image
            src="/images/ImgHada.png" // public 폴더의 이미지 경로
            alt="board"
            width={200}
            height={200}
            // sizes="(max-width: 300px) 100vw, 300px"
          />
          <Spacer className="h-20" />
          <p className="text-body2 text-ad-gray-500 w-[96px] text-center">
            사업자 인증 후 소통이 가능해요.
          </p>
          <Spacer className="h-16" />
          <div className="text-caption1">
            <span className="border-b text-ad-brown-800 border-ad-brown-800">
              <Link href="/">사업자 인증</Link>
            </span>
            <span> 바로 가기</span>
          </div>
        </section>
      )}
    </div>
  );
}
