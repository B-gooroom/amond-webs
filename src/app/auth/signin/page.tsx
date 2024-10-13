"use client";
import Button from "@/components/Button/page";
import Header from "@/components/Header/page";
import Input from "@/components/Input/page";
import { Spacer } from "@/components/Spacer/page";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage("로그인 성공!");
      router.push("/qna");
    }
  };

  const isDisabled = () => {
    if (email.length && password.length) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col justify-center">
      <Header title="" leftItem="IconLeftArrow" />
      <Spacer className="h-[100px]" />
      <div className="flex justify-center">
        <h1 className="hidden">아몬드</h1>
        <Image
          src="/images/AmondLogo.png"
          alt="아몬드로고"
          width={180}
          height={50}
          quality={100}
        />
      </div>
      <Spacer className="h-[100px]" />
      <form className="flex gap-8 flex-col w-full px-16">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일"
          // required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          // required
        />
      </form>
      <Spacer className="h-20" />
      <div className="flex justify-between px-16">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            id="remember"
            name="로그인 상태 유지"
            value="remember"
          />
          <label htmlFor="remember" className="text-caption1">
            로그인 상태 유지
          </label>
        </div>
        <div className="text-caption1">
          <span className="underline">아이디 찾기</span>
          <span className="underline pl-16">비밀번호 찾기</span>
        </div>
      </div>
      {message && <p>{message}</p>}
      <div className="flex flex-col fixed bottom-0 w-full pb-[20px]">
        <Button
          label="로그인"
          type={isDisabled() ? "primary" : "disabled"}
          disabled={!isDisabled()}
          onClick={handleLogin}
        />
        <Button
          label="회원가입"
          type={"normal"}
          className="-mt-20"
          onClick={() => router.push("/auth/signup")}
        />
      </div>
    </div>
  );
}
