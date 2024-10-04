import Header from "@/components/Header/page";
import PostButton from "@/components/PostButton/page";
import { Spacer } from "@/components/Spacer/page";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  return (
    <div className="w-full h-full">
      <Header title="" rightItems={["setting", "notification"]} />
      <section className="h-[230px]">
        <div className="h-[96px] p-16 flex gap-16">
          <Image
            src="/images/hadaProfile.png"
            alt="하다프로필이미지"
            width={64}
            height={64}
          />
          <div className="flex flex-col gap-8">
            <p className="text-subtitle2">기본 닉네임</p>
            <button className="bg-ad-black px-16 py-8 text-ad-white rounded-full text-caption1">
              프로필 편집
            </button>
          </div>
        </div>
        <div className="px-16 flex flex-col gap-8">
          <p className="text-caption1">
            팔로워 {0} | 팔로잉 {0}
          </p>
          <p className="text-body2">소개글은 선택, 최대 글자 수는 필수</p>
          <div className="flex gap-8">
            <span className="bg-ad-gray-100 px-8 py-[3px] text-caption2 rounded-2xl">
              20대
            </span>
            <span className="bg-ad-gray-100 px-8 py-[3px] text-caption2 rounded-full">
              서울
            </span>
          </div>
        </div>
        <Spacer className="h-24" />
        <p className="px-16 text-body2">나의 활동</p>
      </section>
      <PostButton>
        <Link href="/post">+ 글쓰기</Link>
      </PostButton>
    </div>
  );
}
