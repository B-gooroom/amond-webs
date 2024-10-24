"use client";

import { Modal } from "@/components/Modal/page";
import TabBar from "@/components/TabBar/page";
import { EXCLUDED_ROUTES } from "@/constants/excludedRoutes";
import {
  HIDE_TABBAR_REGEX,
  HIDE_TABBAR_ROUTES,
} from "@/constants/tabBarRoutes";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./globals.css";

// RootLayout 컴포넌트 전체를 AuthProvider로 감싸는 방식
function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const [isNative, setIsNative] = useState<boolean | null>(null);
  const [hideTabBar, setHideTabBar] = useState<boolean>(false); // TabBar 숨기기 상태
  const { data, loading } = useAuth(); // 이제 useAuth를 사용 가능
  const router = useRouter();

  const [modalConfirm, setModalConfirm] = useState<boolean>(false);
  const [redirectAfterModal, setRedirectAfterModal] = useState<boolean>(false); // 리다이

  /** native 방식 */
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === "native") {
        setIsNative(true);
      }
    };

    // 사용자 에이전트 검사
    const userAgent = window.navigator.userAgent;
    if (
      /android/i.test(userAgent) ||
      /iPad|iPhone|iPod/.test(userAgent) ||
      /windows phone/i.test(userAgent) ||
      /web/i.test(window.navigator.userAgent)
    ) {
      setIsNative(false); // 네이티브가 아님
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    // 경로가 HIDE_TABBAR_ROUTES에 포함되어 있는지 확인
    const shouldHideTabBar = HIDE_TABBAR_ROUTES.includes(currentPath);

    // 정규식으로 경로 패턴이 일치하는지 확인
    const matchesRegex = HIDE_TABBAR_REGEX.some((regex) =>
      regex.test(currentPath)
    );

    if (shouldHideTabBar || matchesRegex) {
      setHideTabBar(true);
    } else {
      setHideTabBar(false);
    }
  }, [currentPath]);

  useEffect(() => {
    const pathname = window.location.pathname;

    if (!loading && !data && !EXCLUDED_ROUTES.includes(pathname)) {
      // 로그인되지 않은 경우에만 모달을 보여줌
      setModalConfirm(true);
    }
  }, [data, loading, currentPath]);

  const handleModalConfirm = () => {
    setModalConfirm(false); // 모달을 닫음
    // setRedirectAfterModal(true); // 리다이렉트 준비 상태로 변경
    router.push(`/auth/signin?redirectTo=${encodeURIComponent(currentPath)}`);
  };

  return (
    // <div className={hideTabBar ? "h-[100vh]" : ""}>
    <div>
      {modalConfirm && (
        <Modal
          body="반가워요! 로그인 후 다양한 서비스를 이용해 보세요"
          isOpen={true}
          onClose={() => setModalConfirm(false)} // 모달 닫기
          type="double"
          items={["회원가입", "로그인"]}
          onConfirm={handleModalConfirm} // 모달 확인 버튼 클릭 시
        />
      )}
      {children}
      <div className="pb-[79px]">
        {!hideTabBar && isNative === false && <TabBar />}
      </div>
    </div>
  );
}

// RootLayout 전체를 AuthProvider로 감쌈
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ProtectedLayout>{children}</ProtectedLayout>{" "}
          {/* AuthProvider 내부에서 보호된 레이아웃 사용 */}
        </AuthProvider>
      </body>
    </html>
  );
}
