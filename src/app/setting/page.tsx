"use client";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Link from "next/link";
import { useRouter } from "next/navigation";

const settingItems = [
  { title: "계정", path: "/setting/account" },
  { title: "북마크", path: "/setting/bookmark" },
  { title: "좋아요", path: "/setting/like" },
  { title: "알림 설정", path: "/setting/notification" },
  { title: "고객센터", path: "/setting/customer-service" },
  { title: "공지사항", path: "/setting/notice" },
  { title: "서비스 이용약관", path: "/setting/terms-of-service" },
  { title: "개인정보처리방침", path: "/setting/privacy-policy" },
  { title: "차단/신고", path: "/setting/block-report" },
  { title: "로그아웃", path: "/setting/logout" },
];

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
      <div className="px-16 pt-16">
        {settingItems.map((item, index) => {
          console.log(item);
          const { title, path } = item;
          return (
            <Link key={index} href={path}>
              <p className="py-10 border-b text-body2 text-ad-black">
                {title}
                <Icon
                  icon="IconRightArrow"
                  className="fill-ad-gray-500 float-right"
                />
              </p>
            </Link>
          );
        })}
      </div>
      <p className="text-body2 text-ad-gray-500 px-16 pt-10">현재 버전 0.0.1</p>
    </div>
  );
}
