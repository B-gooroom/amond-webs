"use client";
import Header from "@/components/Header/page";
import Label from "@/components/Label/page";
import PostButton from "@/components/PostButton/page";
import { Spacer } from "@/components/Spacer/page";
import Tab from "@/components/Tab/page";
import { ProfileUser } from "@/services/profile-user";
import { getAgeGroup } from "@/utils/ageConverter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "../types/type";
import PostList from "./components/PostList";

export default function Profile() {
  const [userData, setUserData] = useState<User | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const userInfo = async () => {
      const user = await ProfileUser();
      if (user) {
        setUserData(user);
      }
    };
    userInfo();
  }, []);

  // console.log("userData", userData);

  return (
    <div className="w-full h-[100vh]">
      <Header title="소개하다" rightItems={["setting", "notification"]} />
      {userData ? (
        <section className="h-[230px]">
          <div className="h-[96px] p-16 flex gap-16">
            <Image
              src="/images/hadaProfile.png"
              alt="하다프로필이미지"
              width={64}
              height={64}
            />
            <div className="flex flex-col gap-8">
              <p className="text-subtitle2">{userData.nickname}</p>
              <Link
                // TODO: query로 데이터 넘기기 취소하기
                href={{
                  pathname: "/profile/edit",
                  query: {
                    nickname: userData.nickname,
                    introduce: userData.introduce,
                    age: userData.age,
                    region: userData.region,
                  },
                }}
              >
                <Label size="medium" color="black">
                  프로필 편집
                </Label>
              </Link>
            </div>
          </div>
          <div className="px-16 flex flex-col gap-8">
            <p className="text-caption1">
              팔로워 {userData.follower} | 팔로잉 {userData.following}
            </p>
            <p className="text-body2">{userData?.introduce}</p>
            <div className="flex gap-8">
              {userData.age && (
                <Label size="small" color="gray">
                  {getAgeGroup(userData.age)}
                </Label>
              )}
              {userData.region && (
                <Label size="small" color="gray">
                  {userData.region}
                </Label>
              )}
            </div>
          </div>
          <Spacer className="h-24" />
          <p className="px-16 text-body2">나의 활동</p>
        </section>
      ) : (
        <div>Loading...</div>
      )}
      <Tab
        tabs={["전체", "질문하다", "소통하다"]}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {userData ? <PostList /> : <div>고객 정보가 없습니다</div>}
      <PostButton>
        <Link href="/post">+ 글쓰기</Link>
      </PostButton>
    </div>
  );
}
