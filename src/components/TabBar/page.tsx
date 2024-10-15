"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "../Icon/page";

interface TabProps {
  path: string;
  label: string;
  activeIcon: string;
  inactiveIcon: string;
}

const tabs = [
  {
    path: "/qna",
    label: "질문하다",
    activeIcon: "IconQnAActive",
    inactiveIcon: "IconQnA",
  },
  {
    path: "/board",
    label: "소통하다",
    activeIcon: "IconBoardActive",
    inactiveIcon: "IconBoard",
  },
  {
    path: "/profile",
    label: "소개하다",
    activeIcon: "IconProfileActive",
    inactiveIcon: "IconProfile",
  },
];

export default function TabBar() {
  // const router = useRouter();
  const currentPath = usePathname();

  const renderTab = ({ path, label, activeIcon, inactiveIcon }: TabProps) => (
    <Link key={path} className="flex flex-col items-center" href={path}>
      <Icon icon={currentPath === path ? activeIcon : inactiveIcon} />
      <p
        className={classNames(
          "text-caption1",
          currentPath === path ? "text-ad-gray-800" : "text-ad-gray-500"
        )}
      >
        {label}
      </p>
    </Link>
  );

  return (
    <div className="tab">
      <nav className="flex justify-around gap-20 px-16 py-8">
        {tabs.map(renderTab)}
      </nav>
    </div>
  );
}
