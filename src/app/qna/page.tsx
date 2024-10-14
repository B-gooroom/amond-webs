"use client";

import type { QnA, QnAPopular } from "@/app/types/type";
import Header from "@/components/Header/page";
import List from "@/components/List/page";
import PostButton from "@/components/PostButton/page";
import { Spacer } from "@/components/Spacer/page";
import { QnaList } from "@/services/qna-list";
import { QnaPopular } from "@/services/qna-popular";
import Link from "next/link";
import { useEffect, useState } from "react";
import Banner from "./components/Banner";
import { Footer } from "./components/Footer";
import Popular from "./components/Popular";

export default function QnA() {
  const [popularQnas, setPopularQnas] = useState<QnAPopular[] | null>(null);
  const [latestQnas, setLatestQnas] = useState<QnA[] | null>(null);

  useEffect(() => {
    const LatestQnaData = async () => {
      const listData = await QnaList();

      if (listData) {
        setLatestQnas(listData);
      }
    };
    const PopularQnaData = async () => {
      const data = await QnaPopular();
      if (data) {
        setPopularQnas(data);
      }
    };

    PopularQnaData();
    LatestQnaData();
  }, []);

  if (!popularQnas || !latestQnas) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="w-full h-full pb-20">
        <Header title="질문하다" rightItems={["search", "notification"]} />
        <section className="px-16 pt-16 flex-col flex gap-16">
          <p className="text-subtitle1">🙋🏻 오늘의 질문</p>
          {popularQnas.map((qna, index) => {
            const { title, qnaComment = [], qnaView = [], qna_id } = qna;

            const commentsCount = qnaComment.length;
            const viewCount = qnaView.length > 0 ? qnaView[0].view_count : 0;

            return (
              <Popular
                key={index}
                id={qna_id}
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
          {latestQnas?.slice(0, 5).map((qna, index) => {
            const {
              qna_id,
              title,
              qnaCategory,
              content,
              qnaComment,
              qnaView,
              qnaImage,
            } = qna;

            // TODO: imageUrl array인지 object인지 확인
            const imageUrl = qnaImage[0]?.image_url || "";

            return (
              <Link href={`/qna/${qna_id}`} key={index}>
                <List
                  title={title}
                  label={qnaCategory[0]?.category_name}
                  description={content}
                  comments={qnaComment.length}
                  views={qnaView[0] ? qnaView[0]?.view_count : 0}
                  images={imageUrl ? imageUrl : ""}
                />
              </Link>
            );
          })}
        </section>
      </div>
      <PostButton>
        <Link href="/post">+ 글쓰기</Link>
      </PostButton>
      <Footer />
    </>
  );
}
