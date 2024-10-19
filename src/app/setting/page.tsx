"use client";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import { Modal } from "@/components/Modal/page";
import { supabase } from "@/utils/supabase/client";
import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const settingItems = [
  {
    title: "계정",
    body: "계정 정보, 이메일 인증, 비밀번호 변경, 회원탈퇴",
    path: "/setting/account",
    icon: "IconSettingId",
  },
  {
    title: "사업자 인증",
    body: "사업자 등록증 인증 및 등록",
    path: "/setting/verified",
    icon: "IconSettingBusiness",
  },
  {
    title: "북마크",
    body: "북마크 저장된 게시글",
    path: "/setting/bookmark",
    icon: "IconBookmark",
  },
  {
    title: "좋아요",
    body: "좋아요 저장된 게시글",
    path: "/setting/like",
    icon: "IconFavorite",
  },
  {
    title: "알림 설정",
    body: "메뉴 및 마케팅 알림",
    path: "/setting/notification",
    icon: "IconNotification",
  },
  {
    title: "고객센터",
    body: "고객센터, 자주 묻는 질문",
    path: "/setting/customer-service",
    icon: "IconSettingFAQ",
  },
  {
    title: "공지사항",
    body: "아몬드 공지",
    path: "/setting/announcement",
    icon: "IconSettingAnnounce",
  },
  {
    title: "서비스 이용약관",
    body: "서비스 이용약관",
    path: "/setting/terms-of-service",
    icon: "IconSettingTerms",
  },
  {
    title: "개인정보처리방침",
    body: "개인정보처리방침",
    path: "/setting/privacy-policy",
    icon: "IconSettingPrivacy",
  },
  {
    title: "차단/신고",
    body: "회원 차단, 신고 내역",
    path: "/setting/block-report",
    icon: "IconSettingReport",
  },
  {
    title: "로그아웃",
    body: "계정 로그아웃",
    path: "/setting/logout",
    icon: "IconLogout",
  },
  {
    title: "업데이트",
    body: "현재 버전 정보 0.0.1",
    path: "",
    icon: "IconSettingUpdate",
  },
];

interface linkClickProps {
  title: string;
  e: React.MouseEvent;
}

export default function Setting() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("Error logging out:", error.message);
    } else {
      console.log("Logged out!");
      router.push("/qna");
    }
  };

  const itemLinkClick = ({ title, e }: linkClickProps) => {
    if (title === "로그아웃") {
      e.preventDefault(); // Link의 기본 동작을 막고 로그아웃 처리
      setIsModalOpen(true);
    } else if (title === "업데이트") {
      e.preventDefault(); // 업데이트 클릭 시 아무 동작도 하지 않음
    }
  };

  return (
    <div>
      <Header title="설정" leftItem="IconLeftArrow" />
      <div className="px-16 pt-16">
        {settingItems.map((item, index) => {
          const { title, body, path, icon } = item;
          return (
            <Link
              key={index}
              href={path}
              onClick={(e: React.MouseEvent) => itemLinkClick({ title, e })}
              className={classNames(
                "py-16 text-body1 flex justify-between items-center",
                index === settingItems.length - 1 ? "" : "border-b"
              )}
            >
              <div className="gap-8 flex items-center">
                <Icon icon={icon as string} className="fill-ad-black" />
                <div className="flex flex-col">
                  <span>{title}</span>
                  <span className="text-caption2">{body}</span>
                </div>
              </div>
              {title === "로그아웃" || title === "업데이트" ? (
                ""
              ) : (
                <Icon
                  icon="IconRightArrow"
                  className="fill-ad-gray-500"
                  size={12}
                />
              )}
            </Link>
          );
        })}
      </div>
      <Modal
        body="로그아웃 하시겠어요?"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // 취소 클릭 시 모달 닫기
        onConfirm={handleLogOut} // 로그아웃 클릭 시 로그아웃 처리
      />
    </div>
  );
}
