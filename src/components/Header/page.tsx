"use client";

import classnames from "classnames";
import { useEffect, useState } from "react";
import Icon from "../Icon/page";
// import SvgIcon from "assets/images/icon.svg";

interface HeaderProps {
  title: string;
  items?: string[];
}

export default function Header({ title, items }: HeaderProps) {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const width = typeof window !== "undefined" ? window.innerWidth : 0;
    setWidth(width);

    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // 초기 width 값 설정
    handleResize();

    // 윈도우 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav
      className={classnames(
        "flex items-center justify-start bg-white w-full sticky top-0",
        width < 500 ? "py-16 px-20" : "py-[34px] px-[32px]"
      )}
    >
      <div className="flex items-center justify-between w-full text-black">
        <p
          className="text-h3"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          {title}
        </p>
        {items && (
          <div className="flex justify-between gap-8">
            {items.map((item, index) => {
              return (
                <div key={index}>
                  <Icon icon={item} size={24} className="fill-ad-black" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
