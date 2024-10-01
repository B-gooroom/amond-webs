// "use client";

import Header from "@/components/Header/page";
import List from "@/components/List/page";
import { Spacer } from "@/components/Spacer/page";
import Banner from "../qna/components/Banner";

import PostButton from "@/components/PostButton/page";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { popularQna } from "../../services/popular-qna";
import Popular from "../qna/components/Popular";

const QNA_LIST = 5;

export default async function QnA() {
  const supabase = createClient();
  const popularQnas = await popularQna(supabase);

  // console.log("popularQnas", popularQnas);

  return (
    <div className="w-full h-full">
      <Header title="질문하다" items={["IconSearch", "IconNotification"]} />
      <section className="px-16 pt-16 flex-col flex gap-16">
        <p className="text-subtitle1">🙋🏻 오늘의 질문</p>
        {popularQnas.map((note, index) => {
          const { title, comments, views } = note;
          return (
            <Popular
              key={index}
              index={index + 1}
              title={title as string}
              comments={(comments as number) || 0}
              views={(views as number) || 0}
            />
          );
        })}
      </section>
      <Spacer className="h-32" />
      <div className="px-16">
        <Banner />
      </div>
      <Spacer className="h-32" />
      <section className="px-16 pt-16 flex-col flex gap-16">
        <p className="text-subtitle1">🔥 새로운 질문</p>
        {Array.from({ length: QNA_LIST }).map((_, index) => (
          <List
            key={index}
            title="사업자 등록증 신고할 때 궁금한 점"
            label="자유"
            description="이번에 배민이랑 인스타 광고 돌리는데 비용이 너무 많이 나와서 고민이네요 다른 분들은 어떻게 얼마나 나오시..."
            comments={3}
            views={900}
            imageUrl="/images/1.jpg"
          />
        ))}
      </section>
      <PostButton>
        <Link href="/post">+ 글쓰기</Link>
      </PostButton>
    </div>
  );
}
