"use client";

import classnames from "classnames";
import Link from "next/link";
import Icon from "../Icon/page";

interface HeaderProps {
  title: string;
  rightItems?: string[];
  leftItem?: string;
  center?: boolean;
  className?: string;
}

type RouterLinkProps = {
  [key: string]: {
    path: string;
    icon: string;
  };
};

const routerLink: RouterLinkProps = {
  notification: {
    path: "/notification",
    icon: "IconNotification",
  },
  search: {
    path: "/",
    icon: "IconSearch",
  },
  setting: {
    path: "/setting",
    icon: "IconSetting",
  },
  // Add more mappings as needed
};

export default function Header({
  title,
  rightItems,
  leftItem,
  className,
}: HeaderProps) {
  // const [width, setWidth] = useState<number>(0);

  // useEffect(() => {
  //   const width = typeof window !== "undefined" ? window.innerWidth : 0;
  //   setWidth(width);

  //   const handleResize = () => {
  //     setWidth(window.innerWidth);
  //   };

  //   // 초기 width 값 설정
  //   handleResize();

  //   // 윈도우 리사이즈 이벤트 리스너 등록
  //   window.addEventListener("resize", handleResize);

  //   // 컴포넌트 언마운트 시 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <nav
      className={classnames(
        className,
        "flex items-center bg-white w-full sticky top-0 justify-between py-16 px-20"
        // width < 500 ? "py-16 px-20" : "py-[34px] px-[32px]"
        // center ? "justify-between" : "justify-between" // 추가로 할 작업이 분명히 있을 듯
      )}
    >
      {leftItem && (
        <div className="cursor-pointer">
          <Icon icon={leftItem} size={24} className="fill-ad-black" />
        </div>
      )}
      <div
        className={"text-black text-h3"}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        {title}
      </div>
      {rightItems ? (
        <div className="flex justify-between gap-8">
          {rightItems.map((item, index) => {
            const { path, icon } = routerLink[item];
            return (
              // route && (
              <Link key={index} href={path}>
                <Icon icon={icon} size={24} className="fill-ad-black" />
              </Link>
              // )
            );
          })}
        </div>
      ) : (
        <div className="w-24"></div>
      )}
    </nav>
  );
}
