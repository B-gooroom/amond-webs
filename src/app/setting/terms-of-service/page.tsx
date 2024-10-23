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
            <Spacer className="h-8" />
            <h2 className="text-body2">{title}</h2>
            <Spacer className="h-4" />
            <p className="text-caption1">{formatContent(content)}</p>
          </div>
        );
      })}
    </div>
  );
}
