"use client";
import Input from "@/components/Input/page";
import { supabase } from "@/utils/supabase/client";
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

  return (
    <div className="h-[100vh] flex flex-col justify-center px-16">
      <h1>로그인</h1>
      <form onSubmit={handleLogin} className="flex gap-8">
        {/* <label>Email:</label> */}
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // required
        />
        {/* <label>Password:</label> */}
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}

      <div className="pt-[100px]">
        <p className="text-body2">아직 회원이 아니신가요?</p>
        <button
          onClick={() => router.push("/auth/signup")}
          className="text-caption1 underline"
        >
          회원가입 하러 가기
        </button>
      </div>
    </div>
  );
}
