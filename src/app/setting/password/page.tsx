"use client";
import Button from "@/components/Button/page";
import Header from "@/components/Header/page";
import Input from "@/components/Input/page";
import { Spacer } from "@/components/Spacer/page";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Password() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage("영문+숫자+특수문자 8~16자로 입력해 주세요");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("비밀번호 정보가 일치 하지 않아요");
      return;
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage("변경 완료 되었습니다!");
      router.push("/setting/account");
    }
  };

  return (
    <div>
      <Header title="비밀번호 변경" leftItem="IconLeftArrow" />
      <div className="px-16">
        <h2 className="text-body2">새 비밀번호</h2>
        <Spacer className="h-8" />
        <div>
          <Input
            type="password"
            placeholder="영문+숫자+특수문자 8~16자리를 입력해 주세요"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <Spacer className="h-24" />
        <h2 className="text-body2">새 비밀번호 확인</h2>
        <Spacer className="h-8" />
        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={errorMessage ? "border border-ad-red" : ""}
          />
        </div>
        {errorMessage && (
          <p className="text-body2 text-ad-red pt-8">{errorMessage}</p>
        )}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
      <div className="flex flex-col px-16 pt-14 pb-[34px] w-full bottom-0 -ml-[1px] fixed max-w-[500px]">
        <Button
          label="변경 완료"
          onClick={handlePasswordChange}
          type="primary"
        />
      </div>
    </div>
  );
}
