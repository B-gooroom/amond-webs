"use client";
import Header from "@/components/Header/page";
import { useRouter } from "next/navigation";

export default function Setting() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // history의 이전 페이지로 이동
  };

  return (
    <div>
      <div onClick={handleBackClick}>
        <Header title="설정" leftItem="IconLeftArrow" />
      </div>
    </div>
  );
}
