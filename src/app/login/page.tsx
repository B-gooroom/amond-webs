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
    <>
      {!userData && (
        <div>
          <p className="h-[100px]">로그인 페이지</p>
          <SignIn />
        </div>
      )}
    </>
  );
}
