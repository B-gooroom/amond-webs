"use client";

import classnames from "classnames";
import { useEffect, useState } from "react";
import Icon from "../Icon/page";
// import SvgIcon from "assets/images/icon.svg";

interface HeaderProps {
  title: string;
  rightItems?: string[];
  leftItem?: string;
  center?: boolean;
  className?: string;
}

export default function Header({
  title,
  rightItems,
  leftItem,
  center,
  className,
}: HeaderProps) {
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
        className,
        "flex items-center bg-white w-full sticky top-0 justify-between",
        width < 500 ? "py-16 px-20" : "py-[34px] px-[32px]"
        // center ? "justify-between" : "justify-between" // 추가로 할 작업이 분명히 있을 듯
      )}
    >
      {leftItem && (
        <div>
          <Icon icon={leftItem} size={24} className="fill-ad-black" />
        </div>
      )}
      <div
        className={"text-black text-h3"}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {/* // className={classnames("text-h3", center && "mx-auto")} */}
        {title}
      </div>
      {rightItems ? (
        <div className="flex justify-between gap-8">
          {rightItems.map((item, index) => {
            return (
              <div key={index}>
                <Icon icon={item} size={24} className="fill-ad-black" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-24"></div>
      )}
    </nav>
  );
}
