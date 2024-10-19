"use client";

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
    // 현재 경로 확인
    const pathname = window.location.pathname;

    if (!loading && !data && !EXCLUDED_ROUTES.includes(pathname)) {
      // console.log("Redirecting to login");
      router.push(`/auth/signin?redirectTo=${encodeURIComponent(pathname)}`);
    }

    // loading이 끝났고, 로그인된 사용자가 없으며 예외 경로가 아닌 경우 리다이렉트 실행
  }, [currentPath, data, loading, router]);

  return (
    // <div className={hideTabBar ? "h-[100vh]" : ""}>
    <div>
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
