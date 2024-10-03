"use client";

import TabBar from "@/components/TabBar/page";
import { metadata } from "@/utils/metadata";
import Head from "next/head";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNative, setIsNative] = useState<boolean | null>(null);
  const [hideTabBar, setHideTabBar] = useState<boolean>(false); // TabBar 숨기기 상태
  const currentPath = usePathname();

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

  // hideTabBar를 children의 pathname에 따라 설정
  useEffect(() => {
    // 특정 경로에 따라 TabBar 숨기기
    if (currentPath === "/post" || currentPath === "/notification") {
      setHideTabBar(true);
    } else {
      setHideTabBar(false);
    }
  }, [currentPath]); // children이 변경될 때마다 경로 확인
  // console.log("isNative: ", isNative); // 디버깅용 로그

  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.imageUrl} />
        <meta property="og:url" content={metadata.siteUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
      </Head>
      <body style={hideTabBar ? { height: "100vh" } : {}}>
        {children}
        <div className="pb-[99px]">
          {!hideTabBar && isNative === false && <TabBar />}
        </div>
      </body>
    </html>
  );
}
