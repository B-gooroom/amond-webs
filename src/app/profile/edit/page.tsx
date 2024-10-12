"use client";

import { User } from "@/app/types/type";
import Dropdown from "@/components/Dropdown/page";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Input from "@/components/Input/page";
import { Spacer } from "@/components/Spacer/page";
import { ProfileUser } from "@/services/profile-user";
import { getAgeGroup } from "@/utils/ageConverter";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Edit() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const userInfo = async () => {
      const user = await ProfileUser();
      if (user) {
        setUserData(user);
      }
    };
    userInfo();
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  // console.log("userData", userData);

  const addPhoto = () => {
    console.log("addPhoto");
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    console.log("handleNicknameChange", e.target.value);
    // setUserNickname(e.target.value);
  };

  const handleAgeSelect = (selectedAge: string) => {
    // setUserAgeGroup(selectedAge);
    console.log("selectedAge", selectedAge);
  };

  const handleRegionSelect = (selectedRegion: string) => {
    // setUserRegion(selectedRegion);
    console.log("selectedRegion", selectedRegion);
  };

  return (
    <div>
      <div className="relative">
        <Header title="프로필 편집" leftItem={"IconLeftArrow"} />
        <span className="absolute text-body2 top-16 right-16">완료</span>
      </div>
      <Spacer className="h-24" />

      <div className="flex justify-center">
        <div
          className="relative"
          onClick={(e) => {
            e.stopPropagation();
            addPhoto();
          }}
        >
          <Image
            src="/images/hadaProfile.png"
            alt="하다프로필이미지"
            width={64}
            height={64}
          />
          <Icon
            icon="IconAddPhoto"
            className="z-10 absolute bottom-0 right-0 cursor-pointer"
          />
        </div>
      </div>
      <Spacer className="h-24" />
      {userData && (
        <>
          <section className="px-16 flex flex-col gap-8">
            <p className="text-body1">
              닉네임<span className="text-body1 text-ad-red">*</span>
            </p>
            <Input
              placeholder="닉네임을 설정해주세요"
              value={userData.nickname}
              onChange={handleNicknameChange}
            />
          </section>
          <Spacer className="h-16" />
          <section className="px-16 flex flex-col gap-8">
            <p className="text-body1">소개</p>
            <textarea
              value={userData.introduce}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={(e) => {
                e.stopPropagation();
                console.log("소개", e.target.value);
                // setUserIntroduce(e.target.value);
              }}
              placeholder="내 관심사나 소개하고 싶은 말을 적어 주세요"
              className="border text-body2 rounded-2xl px-16 py-12 focus:outline-none focus:ring-2 focus:ring-ad-brown-800 resize-none h-[150px]"
            ></textarea>
          </section>
          <Spacer className="h-16" />
          <section className="px-16 flex flex-col gap-8">
            <p className="text-body1">지역</p>
            <Dropdown
              defaultValue={userData.region || "지역을 선택해주세요"}
              items={[
                "서울",
                "경기",
                "인천",
                "강원",
                "충청",
                "경상",
                "전라",
                "제주",
              ]}
              onSelect={handleRegionSelect}
            />
          </section>
          <Spacer className="h-16" />
          <section className="px-16 flex flex-col gap-8">
            <p className="text-body1">출생 연도</p>
            <Dropdown
              defaultValue={
                getAgeGroup(userData.age) || "출생 연도를 선택해주세요"
              }
              items={[
                "10대",
                "20대",
                "30대",
                "40대",
                "50대",
                "60대",
                "70대",
                "80대",
              ]}
              onSelect={handleAgeSelect}
            />
          </section>
        </>
      )}
    </div>
  );
}
