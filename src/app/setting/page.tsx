"use client";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const settingItems = [
  { title: "계정", path: "/setting/account" },
  { title: "사업자 인증", path: "/setting/verified" },
  { title: "북마크", path: "/setting/bookmark" },
  { title: "좋아요", path: "/setting/like" },
  { title: "알림 설정", path: "/setting/notification" },
  { title: "고객센터", path: "/setting/customer-service" },
  { title: "공지사항", path: "/setting/announcement" },
  { title: "서비스 이용약관", path: "/setting/terms-of-service" },
  { title: "개인정보처리방침", path: "/setting/privacy-policy" },
  { title: "차단/신고", path: "/setting/block-report" },
  { title: "로그아웃", path: "/setting/logout" },
];

export default function Setting() {
  const router = useRouter();

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error logging out:", error.message);
    } else {
      console.log("Logged out!");
      router.push("/qna");
      // TODO: 페이지 이동 후 세션을 다시 확인하여 상태 업데이트 reload문제 해결
    }
  };

  return (
    <div>
      <Header title="설정" leftItem="IconLeftArrow" />
      <div className="px-16 pt-16">
        {settingItems.map((item, index) => {
          const { title, path } = item;
          return (
            <Link key={index} href={path}>
              <div className="py-10 border-b text-body2">
                {title}
                <Icon
                  icon="IconRightArrow"
                  className="fill-ad-gray-500 float-right"
                />
              </div>
            </Link>
          );
        })}
      </div>
      <p className="text-body2 text-ad-gray-500 px-16 pt-10">현재 버전 0.0.1</p>
      <div className="pt-10 px-16">
        <button
          onClick={() => {
            // handleAuth();
            handleLogOut();
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}
