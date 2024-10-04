import Header from "@/components/Header/page";
import { Spacer } from "@/components/Spacer/page";
import Image from "next/image";
import Link from "next/link";

export default function Board() {
  return (
    <div className="w-full h-full">
      <Header title="소통하다" rightItems={["search", "notification"]} />
      <section className="px-16 flex-col flex gap-8 items-center justify-center h-[100vh]">
        <Image
          src="/images/ImgHada.png" // public 폴더의 이미지 경로
          alt="board"
          width={200}
          height={200}
          // sizes="(max-width: 300px) 100vw, 300px"
        />
        <Spacer className="h-20" />
        <p className="text-body2 text-ad-gray-500 w-[120px] text-center">
          사업자 인증이 필요한 페이지입니다.
        </p>
        <Spacer className="h-16" />
        <div className="text-caption1">
          <span className="border-b text-ad-brown-800 border-ad-brown-800">
            <Link href="/">사업자 인증</Link>
          </span>
          <span> 바로 가기</span>
        </div>
      </section>
    </div>
  );
}
