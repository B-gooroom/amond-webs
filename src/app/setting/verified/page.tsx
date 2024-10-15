"use client";
import Header from "@/components/Header/page";
import Input from "@/components/Input/page";
import { BusinessVerified } from "@/services/business-verified";
import { BusinessVerifiedCheck } from "@/services/business-verified-check";
import { useEffect, useState } from "react";

interface BusinessVerifiedPorps {
  companyNumber: string;
}

export default function Verified() {
  const [isVerified, setIsVerified] = useState(false);
  const [companyNumber, setCompanyNumber] = useState("");

  useEffect(() => {
    // 회사 인증 여부 확인
    const companyVerify = async () => {
      const verified = await BusinessVerifiedCheck();
      console.log("verified", verified);
      if (verified) {
        setIsVerified(true);
      }
    };
    companyVerify();
    // 회사 인증 여부에 따라 페이지 렌더링
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("companyNumber", companyNumber);
    verifyBusiness({ companyNumber });
  };

  const verifyBusiness = async ({ companyNumber }: BusinessVerifiedPorps) => {
    // 진위확인 api 사용할 때는 아래 데이터 형식으로 보내야 함
    // const businessesData = [
    //   {
    //     b_no: companyNumber,
    //     start_dt: startDate,
    //     p_nm: name,
    //     p_nm2: name,
    //     b_nm: "키키베리",
    //     corp_no: "0000000000000",
    //     b_sector: "음식업점",
    //     b_type: "카페",
    //   },
    // ];

    try {
      const response = await fetch("/api/businessVerification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ b_no: companyNumber }),
        // body: JSON.stringify({
        //   business: businessesData,
        // }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Verification Success:", data);

        const verifiedUpdate = await BusinessVerified();
        if (verifiedUpdate) {
          setIsVerified(true);
        }
      } else {
        console.error("Verification Failed:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Header title="사업자 인증" />
      {isVerified ? (
        <div className="px-16">
          <p>인증이 완료되었습니다.</p>
        </div>
      ) : (
        <div className="px-16">
          <form onSubmit={handleSignUp} className="flex flex-col gap-8">
            <Input
              label="사업자 등록번호"
              placeholder="사업자 등록번호를 입력해주세요."
              value={companyNumber}
              // onChange={handleVerify}
              onChange={(e) => setCompanyNumber(e.target.value)}
            />
            {/* <Input
              label="개업일자"
              placeholder="개업일자를 입력해주세요."
              value={startDate}
              // onChange={handleVerify}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <Input
              label="대표자명"
              placeholder="대표자명을 입력해주세요."
              value={name}
              // onChange={handleVerify}
              onChange={(e) => setNmae(e.target.value)}
            /> */}
            <button type="submit">인증</button>
          </form>
        </div>
      )}
    </div>
  );
}
