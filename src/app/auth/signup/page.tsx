"use client";
import Input from "@/components/Input/page";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      // options: {
      //   emailRedirectTo: "http://localhost:3000/auth/signin", // 이메일 인증 완료 후 리다이렉션할 페이지
      // },
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
      return null;
    }
    if (data && data.user) {
      const user = data.user;

      // 2. users 테이블에 사용자 정보 저장
      const { data: userData, error: userError } = await supabase
        .from("users")
        .insert({
          auth_id: user.id, // auth.users의 id와 동일하게 설정
          email: user?.email, // 사용자의 이메일
          phonenum: "", // 사용자의 전화번호
          password: password, // 사용자의 비밀번호
        });

      if (userError) {
        console.error("Error inserting into users table:", userError.message);
        return null;
      }
      setMessage("회원가입이 완료되었습니다!");
      router.push("/qna");
      return userData;
    }
  };

  return (
    <div className="flex flex-col gap-12 justify-center h-[100vh] px-16">
      <h1>회원가입</h1>
      <form onSubmit={handleSignUp} className="flex gap-8">
        <div className="flex flex-col gap-8">
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
        </div>
        <button
          type="submit"
          className="border bg-ad-green-dark text-ad-white px-16 rounded-2xl"
        >
          회원가입
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
