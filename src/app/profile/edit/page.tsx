"use client";

import Dropdown from "@/components/Dropdown/page";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Input from "@/components/Input/page";
import { Spacer } from "@/components/Spacer/page";
import { getAgeGroup } from "@/utils/ageConverter";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edit() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userNickname, setUserNickname] = useState("");
  const [userAgeGroup, setUserAgeGroup] = useState("");
  const [userRegion, setUserRegion] = useState("");
  const [userIntroduce, setUserIntroduce] = useState("");

  useEffect(() => {
    const nickname = searchParams.get("nickname") || "";
    const age = searchParams.get("age") || "";
    const region = searchParams.get("region") || "";
    const introduce = searchParams.get("introduce") || "";

    const getUserData = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log("data", data);
    };

    getUserData();

    setUserNickname(nickname);
    setUserAgeGroup(getAgeGroup(parseInt(age)));
    setUserRegion(region);
    setUserIntroduce(introduce);
  }, [searchParams]);

  const handleBackClick = () => {
    router.back();
  };

  const addPhoto = () => {
    console.log("addPhoto");
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setUserNickname(e.target.value);
  };

  const handleAgeSelect = (selectedAge: string) => {
    setUserAgeGroup(selectedAge);
  };

  const handleRegionSelect = (selectedRegion: string) => {
    setUserRegion(selectedRegion);
  };

  const handleLogOut = async () => {
    console.log("handleLogOut");
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
    } else {
      router.push("/");
    }
  };

  return (
    <div>
      <div onClick={handleBackClick} className="relative">
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
      <section className="px-16 flex flex-col gap-8">
        <p className="text-body1">
          닉네임<span className="text-body1 text-ad-red">*</span>
        </p>
        <Input
          placeholder="닉네임을 설정해주세요"
          value={userNickname}
          onChange={handleNicknameChange}
        />
      </section>
      <Spacer className="h-16" />
      <section className="px-16 flex flex-col gap-8">
        <p className="text-body1">소개</p>
        <textarea
          value={userIntroduce}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            e.stopPropagation();
            setUserIntroduce(e.target.value);
          }}
          placeholder="내 관심사나 소개하고 싶은 말을 적어 주세요"
          className="border text-body2 rounded-2xl px-16 py-12 focus:outline-none focus:ring-2 focus:ring-ad-brown-800 resize-none h-[150px]"
        ></textarea>
      </section>
      <Spacer className="h-16" />
      <section className="px-16 flex flex-col gap-8">
        <p className="text-body1">지역</p>
        <Dropdown
          defaultValue={userRegion}
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
          defaultValue={userAgeGroup}
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
      <div>
        로그아웃
        <button
          onClick={() => {
            handleLogOut();
          }}
        >
          click
        </button>
      </div>
    </div>
  );
}
