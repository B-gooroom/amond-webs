"use client";
import { Terms } from "@/app/types/setting";
import Header from "@/components/Header/page";
import { Spacer } from "@/components/Spacer/page";
import { TermsOfServiceData } from "@/services/setting/setting-policy";
import { formatContent } from "@/utils/formatContent";
import { useEffect, useState } from "react";

export default function TermsOfService() {
  const [termsData, setTermsData] = useState<Terms[] | null>(null);

  useEffect(() => {
    const termsData = async () => {
      const data = await TermsOfServiceData();

      if (data) {
        setTermsData(data);
      }
    };
    termsData();
  }, []);

  // console.log("termsData", termsData);

  return (
    <div>
      <Header title="이용약관" leftItem="IconLeftArrow" />
      <Spacer className="h-16" />
      <p className="text-body1 px-16">아몬드 회원 이용약관</p>
      {termsData?.map((term, index) => {
        const { title, content } = term;
        return (
          <div key={index} className="px-16">
            <Spacer className="h-16" />
            <h2 className="text-body2">{title}</h2>
            <Spacer className="h-8" />
            <p className="text-caption1">{formatContent(content)}</p>
          </div>
        );
      })}
      <Spacer className="h-8" />
      <div className="px-16">
        <p className="text-body2">부칙</p>
        <p className="text-caption1">
          이 약관은 2024년 11월 01일부터 적용됩니다.
        </p>
      </div>
    </div>
  );
}
