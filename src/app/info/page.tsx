"use client";
import Header from "@/components/Header/page";
import Label from "@/components/Label/page";
import { Spacer } from "@/components/Spacer/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Info() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // history의 이전 페이지로 이동
  };

  return (
    <div className="-mb-[99px]">
      <div onClick={handleBackClick}>
        <Header title="" leftItem="IconLeftArrow" />
      </div>
      <div className="flex flex-col items-center">
        <Spacer className="h-[24px]" />
        <p className="text-subtitle2 text-ad-black">
          모두의 카페 커뮤니티 서비스
        </p>
        <p className="text-h1 text-ad-black">아몬드</p>
        <Spacer className="h-[60px]" />
        <Image
          src="/images/HadaInfoTitle.png"
          width={300}
          height={300}
          alt="소개하다타이틀이미지"
        />
        <Spacer className="h-[60px]" />
        <span className="px-16 w-[343px] break-keep text-center">
          아몬드는 실제로 카페를 창업하고 운영하며 어디에도 물어볼 곳이 없어
          답답했던 상황이나 카페와 관련한 다양한 정보를 많은 사람들과 공유하고
          싶다는 생각을 바탕으로 시작했어요
        </span>
        <Spacer className="h-[60px]" />
        <Label color="brown">하나,</Label>
        <Spacer className="h-16" />
        <p className="text-h3">궁금한 건 무엇이든 물어보는 하다!</p>
        <Spacer className="h-16" />
        <span className="px-16 w-[343px] break-keep text-center">
          창업 과정에서 겪은 수많은 고민과 궁금증, 질문하다 메뉴에서 쉽고
          간편하게 해결하세요!
        </span>
        <Spacer className="h-[60px]" />
        <Image
          src="/images/HadaInfoMenu.png"
          width={256}
          height={125}
          alt="소개하다메뉴이미지"
        />
        <Spacer className="h-[60px]" />
        <Label color="brown">둘,</Label>
        <Spacer className="h-16" />
        <p className="text-h3">함께 나누고 소통하는 하다!</p>
        <Spacer className="h-16" />
        <span className="px-16 w-[260px] break-keep text-center">
          카페 운영 중 느낀 고민, 성공 경험, 그리고 신선한 아이디어까지!
        </span>
        <Spacer className="h-16" />
        <span className="px-16 w-[300px] break-keep text-center">
          서로의 경험을 나누며 실수와 성공에서 배운 점들을 공유하고
          창업자들끼리의 다양한 네트워크 형성을 지원해요
        </span>
        <Spacer className="h-[60px]" />
        <Image
          src="/images/HadaInfoBoard.png"
          width={297}
          height={159}
          alt="소개하다커뮤니티이미지"
        />
        <Spacer className="h-[60px]" />
        <Label color="brown">셋,</Label>
        <Spacer className="h-16" />
        <p className="text-h3">카페에 관한 정보를 쉽게 경험 하다!</p>
        <Spacer className="h-16" />
        <span className="px-16 w-[280px] break-keep text-center">
          비슷한 목표를 가진 카페 예비 창업자와 창업자 모두가 새로운 메뉴
          개발부터
        </span>
        <span className="px-16 w-[250px] break-keep text-center">
          마케팅 전략까지 함께 협력하며 더욱 큰 성장을 이뤄낼 수 있어요!
        </span>
        <Spacer className="h-[60px]" />
        <Image
          src="/images/HadaInfoCheer.png"
          width={375}
          height={210}
          alt="소개하다커뮤니티이미지"
          className="w-full"
        />
      </div>
    </div>
  );
}
