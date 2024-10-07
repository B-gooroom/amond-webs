"use client";
import { AuthUser } from "@/services/auth-user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SignIn from "../auth/signin/page";

export default function Login() {
  const router = useRouter();
  const [userData, setUserData] = useState<unknown | null>(null);

  useEffect(() => {
    const userInfo = async () => {
      const user = await AuthUser();
      console.log("user$$$$", user);
      if (user) {
        setUserData(user);
      }
    };
    userInfo();
  }, []);

  console.log("userData", userData);
  if (userData) {
    router.push("/qna");
  }

  return (
    <div className="flex justify-center items-center h-[100vh]">
      {!userData && (
        <div>
          <div className="h-[100px]">로그인 페이지</div>
          <SignIn />
        </div>
      )}
      {/* <div>
        <button onClick={() => router.push("/auth/signup")}>회원가입</button>
        <button onClick={() => router.push("/auth/signin")}>로그인</button>
      </div> */}
    </div>
  );
}
