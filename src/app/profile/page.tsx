import Header from "@/components/Header/page";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="w-full h-full">
      <Header title="" rightItems={["notification", "notification"]} />
      <section className="px-16 flex-col flex gap-8 items-center justify-center h-[100vh]">
        <p>이곳은 프로필입니다.</p>
        <Image
          src="/images/ImgHada.png" // public 폴더의 이미지 경로
          alt="board"
          width={200}
          height={200}
          // sizes="(max-width: 300px) 100vw, 300px"
        />
      </section>
    </div>
  );
}
