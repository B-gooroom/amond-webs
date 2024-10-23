"use client";
import { PrivacyPolicy } from "@/app/types/setting";
import Header from "@/components/Header/page";
import { Spacer } from "@/components/Spacer/page";
import { PrivacyPolicyData } from "@/services/setting/setting-policy";
import { formatContent } from "@/utils/formatContent";
import { useEffect, useState } from "react";

export default function PrivacyPlicy() {
  const [privacyData, setPrivacyData] = useState<PrivacyPolicy[] | null>(null);

  useEffect(() => {
    const privacyPolicyData = async () => {
      const data = await PrivacyPolicyData();

      if (data) {
        setPrivacyData(data);
      }
    };
    privacyPolicyData();
  }, []);

  // console.log("privacyData", privacyData);

  return (
    <div>
      <Header title="개인정보처리방침" leftItem="IconLeftArrow" />
      <Spacer className="h-16" />
      <p className="text-body1 px-16">
        아몬드의 개인정보처리방침은 다음과 같은 내용을 담고 있습니다.
      </p>
      {privacyData?.map((privacy, index) => {
        const { title, content } = privacy;
        return (
          <div key={index} className="px-16">
            <Spacer className="h-16" />
            <h2 className="text-body2">{title}</h2>
            <Spacer className="h-8" />
            <p className="text-caption1">{formatContent(content)}</p>
          </div>
        );
      })}
      <Spacer className="h-24" />
      <div className="px-16">
        <p className="text-body2">부칙</p>
        <Spacer className="h-8" />
        <p className="text-caption1">
          - 해당 개인정보처리방침은 2024.11.01부터 적용됩니다.
        </p>
        <p className="text-caption1">
          - 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른
          변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 1주일
          전부터 공지사항을 통해 게시하거나 그에 상응하는 방식으로 개별 통지를
          갈음할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
