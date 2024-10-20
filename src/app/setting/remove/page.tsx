"use client";
import Button from "@/components/Button/page";
import Header from "@/components/Header/page";
import { Spacer } from "@/components/Spacer/page";
import { UserAccountDeactivate } from "@/services/setting-account";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Remove() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRemove = async () => {
    const res = await UserAccountDeactivate({
      setErrorMessage,
      setSuccessMessage,
    });

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error logging out:", error.message);
    } else {
      console.log("Logged out!");
      router.push("/qna");
    }
  };

  return (
    <div>
      <Header title="회원탈퇴" leftItem="IconLeftArrow" />
      <Spacer className="h-[100px]" />
      <section className="flex flex-col items-center">
        <Image
          src="/images/ImgHadaCrying.png"
          alt="회원탈퇴"
          width={160}
          height={180}
          // quality={100}
        />
        <Spacer className="h-16" />
        <p className="text-body2 w-[260px] text-center break-keep">
          이용하시면서 불편하셨던 점을 알려주시면 참고해서 더 좋은 서비스가 될
          수 있도록 할게요 그동안 이용해 주셔서 감사합니다
        </p>
        <Spacer className="h-24" />
        <div className="px-16 w-full">
          <textarea
            className="border text-body2 rounded-2xl px-16 py-12 focus:outline-none focus:ring-2 focus:ring-ad-brown-800 resize-none h-[150px] w-full"
            placeholder="아몬드에 전달하고 싶은 말이 있으시면 적어 주세요"
          />
        </div>
        {errorMessage && (
          <p className="text-ad-red text-body2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-ad-green-light text-body2">{successMessage}</p>
        )}
        <Spacer className="h-[120px]" />
        <div className="px-16 w-full">
          <Button label="탈퇴" type="primary" onClick={handleRemove} />
        </div>
        <Spacer className="h-24" />
        <span className="text-caption1 text-ad-gray-500">조금 더 이용하기</span>
      </section>
    </div>
  );
}
