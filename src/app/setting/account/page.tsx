"use client";
import { User } from "@/app/types/type";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Input from "@/components/Input/page";
import Label from "@/components/Label/page";
import { Spacer } from "@/components/Spacer/page";
import { ProfileUser } from "@/services/profile-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Account() {
  const router = useRouter();
  const [userData, setUserData] = useState<User | null>(null);
  const [phoneParts, setPhoneParts] = useState({
    first: "010",
    second: "0000",
    third: "0000",
  });
  const [emailParts, setEmailParts] = useState({
    id: "",
    domain: "직접입력",
  });

  useEffect(() => {
    const userInfo = async () => {
      const user = await ProfileUser();
      if (user) {
        setUserData(user);
        if (user.phonenum) {
          const phoneSplit = user.phonenum.split("-");
          if (phoneSplit.length === 3) {
            setPhoneParts({
              first: phoneSplit[0] || "010",
              second: phoneSplit[1] || "0000",
              third: phoneSplit[2] || "0000",
            });
          }
        }
      }
    };
    userInfo();
  }, []);

  // console.log("userData", userData);

  const handlePhoneFirstChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPhoneParts({ ...phoneParts, first: event.target.value });
  };

  const handleEmailDomainChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setEmailParts({ ...emailParts, domain: event.target.value });
  };

  if (!userData) {
    <div>...Loading</div>;
  }

  return (
    <div>
      <Header title="계정" leftItem="IconLeftArrow" />
      <section className="px-16 flex flex-col gap-8">
        <Spacer className="h-24" />
        <div className="flex justify-between">
          <span className="text-body1">이메일 아이디</span>
          <span className="text-caption2 flex gap-[2px] items-center">
            <Icon icon="IconHelp" size={12} /> 아이디 변경 안내
          </span>
        </div>
        <div className="text-ad-gray-500">
          <Input placeholder="dd" value={userData?.email as string} disabled />
        </div>
      </section>
      <Spacer className="h-16" />
      <div className="flex justify-between px-16 items-center">
        <span className="text-body2 flex gap-[2px] items-center">
          <Icon icon="IconError" className="fill-ad-black" /> 이메일 인증이
          필요해요
        </span>
        <Label size="medium" color="black">
          인증 메일 전송
        </Label>
      </div>
      <Spacer className="h-24" />
      <section className="px-16 flex flex-col gap-8">
        <p className="text-body1">전화번호</p>
        <div className="flex gap-4 justify-between">
          <div className="relative flex-1">
            <select
              value={phoneParts.first}
              onChange={handlePhoneFirstChange}
              className="border appearance-none rounded-2xl px-16 py-10 w-full"
            >
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="016">016</option>
              <option value="017">017</option>
              <option value="018">018</option>
              <option value="019">019</option>
            </select>
            <div className="absolute top-12 right-16 flex items-center pointer-events-none">
              <Icon icon="IconDropdown" className="fill-ad-black" size={16} />
            </div>
          </div>
          <div className="flex-1">
            <Input
              value={phoneParts.second}
              placeholder="0000"
              className="w-full"
              onChange={() => {}}
            />
          </div>
          <div className="flex-1">
            <Input
              value={phoneParts.third}
              placeholder="0000"
              className="w-full"
              onChange={() => {}}
            />
          </div>
        </div>
      </section>
      <Spacer className="h-24" />
      <section className="px-16 flex flex-col gap-8">
        <p className="text-body1">이메일</p>
        <div className="flex gap-4 justify-between items-center">
          <div className="flex-1">
            <Input
              value={userData?.email?.split("@")[0] as string}
              placeholder="email"
              className="w-full"
              onChange={() => {}}
            />
          </div>
          @
          <div className="flex-1">
            <Input
              value={
                userData?.email
                  ? userData?.email?.split("@")[1]
                  : emailParts.domain
              }
              placeholder="domain"
              className="w-full"
              onChange={() => {}}
            />
          </div>
          <div className="relative w-full flex-1 flex">
            <select
              value={
                userData?.email
                  ? userData?.email?.split("@")[1]
                  : emailParts.domain
              }
              onChange={handleEmailDomainChange}
              className="border appearance-none rounded-2xl px-16 py-10 flex-1 w-full"
            >
              <option value="직접입력">직접입력</option>
              <option value="gmail.com">gmail.com</option>
              <option value="naver.com">naver.com</option>
              <option value="daum.net">daum.net</option>
              <option value="kakao.com">kakao.com</option>
            </select>
            <div className="absolute top-12 right-16 flex items-center pointer-events-none">
              <Icon icon="IconDropdown" className="fill-ad-black" size={16} />
            </div>
          </div>
        </div>
      </section>
      <Spacer className="h-16" />
      <div className="px-16 flex justify-between">
        <span
          className="text-caption1 text-ad-gray-500 underline cursor-pointer"
          onClick={() => router.push("/setting/password")}
        >
          비밀번호 변경
        </span>
        <span
          className="text-caption1 text-ad-gray-500 underline cursor-pointer"
          onClick={() => router.push("/setting/remove")}
        >
          회원 탈퇴
        </span>
      </div>
    </div>
  );
}
