// "use client";

import Header from "@/components/Header/page";
import List from "@/components/List/page";
import { Spacer } from "@/components/Spacer/page";
import Banner from "./components/Banner";

import PostButton from "@/components/PostButton/page";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { popularQna } from "../../services/popular-qna";
import { Footer } from "./components/Footer";
import Popular from "./components/Popular";

const QNA_LIST = 5;

export default async function QnA() {
  const supabase = createClient();
  const popularQnas = await popularQna(supabase);

  // console.log("popularQnas", popularQnas);

  return (
    <>
      <div className="w-full h-full pb-20">
        <Header title="질문하다" rightItems={["search", "notification"]} />
        <section className="px-16 pt-16 flex-col flex gap-16">
          <p className="text-subtitle1">🙋🏻 오늘의 질문</p>
          {popularQnas.map((note, index) => {
            const { title, qnaComment = [], qnaView = [] } = note;

            const commentsCount = qnaComment.length;
            const viewCount = qnaView.length > 0 ? qnaView[0].view_count : 0;

            return (
              <Popular
                key={index}
                index={index + 1}
                title={title as string}
                comments={(commentsCount as number) || 0}
                views={(viewCount as number) || 0}
              />
            );
          })}
        </section>
        <Spacer className="h-32" />
        <div className="px-16">
          <Banner
            path="/info"
            alt="아몬드 소개 배너"
            imageUrl="/images/HadaInfoBanner.png"
            // imageUrl="https://xtlpqspaohusobjcvsas.supabase.co/storage/v1/object/sign/amond-img/banner/info.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhbW9uZC1pbWcvYmFubmVyL2luZm8uanBnIiwiaWF0IjoxNzI3OTY3MTk4LCJleHAiOjE3NTk1MDMxOTh9.c8p9hGaZMJej4zUMxlbUIMi4H6B1jrA1goQ21pHcdgA&t=2024-10-03T14%3A53%3A18.287Z"
          />
        </div>
        <Spacer className="h-32" />
        <section className="px-16 pt-16 flex-col flex gap-16">
          <div className="text-subtitle1 flex justify-between">
            🔥 새로운 질문
            <Link href="/qna/list" className="text-caption1">
              더 보기
            </Link>
          </div>
          {Array.from({ length: QNA_LIST }).map((_, index) => (
            <List
              key={index}
              title="사업자 등록증 신고할 때 궁금한 점"
              label="자유"
              description="이번에 배민이랑 인스타 광고 돌리는데 비용이 너무 많이 나와서 고민이네요 다른 분들은 어떻게 얼마나 나오시..."
              comments={3}
              views={900}
              images="/images/1.jpg"
            />
          ))}
        </section>
      </div>
      <PostButton>
        <Link href="/post">+ 글쓰기</Link>
      </PostButton>
      <Footer />
    </>
  );
}
