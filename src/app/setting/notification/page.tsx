"use client";
import Header from "@/components/Header/page";
import { Spacer } from "@/components/Spacer/page";
import Toggle from "@/components/Toggle/page";
import { useState } from "react";

export default function Notification() {
  const [qnaReply, setQnaReply] = useState(false);
  const [boardActivity, setBoardActivity] = useState(false);
  const [followingNewPost, setFollowingNewPost] = useState(false);
  const [marketingActivity, setMarketingActivity] = useState(false);

  const toggleQnaReply = () => {
    setQnaReply(!qnaReply);
  };
  const toggleBoardActivity = () => {
    setBoardActivity(!boardActivity);
  };
  const toggleFollowingNewPost = () => {
    setFollowingNewPost(!followingNewPost);
  };
  const toggleMarketingActivity = () => {
    setMarketingActivity(!marketingActivity);
  };

  // TODO: 알림 설정 연결 기능 추가

  return (
    <div>
      <Header title="알림 설정" leftItem="IconLeftArrow" />
      <Spacer className="h-16" />
      <section className="px-16">
        <div className="h-[40px] flex items-center">
          <p className="text-body1">질문하다</p>
        </div>
        <div className="h-[40px] flex items-center justify-between border-b">
          <span className="text-body2">댓글 알림</span>
          <Toggle isOn={qnaReply} handleToggle={toggleQnaReply} />
        </div>
      </section>
      <Spacer className="h-24" />
      <section className="px-16">
        <div className="h-[40px] flex items-center">
          <p className="text-body1">소통하다</p>
        </div>
        <div className="h-[40px] flex items-center justify-between border-b">
          <span className="text-body2">내 활동</span>
          <Toggle isOn={boardActivity} handleToggle={toggleBoardActivity} />
        </div>
        <div className="h-[40px] flex items-center justify-between border-b">
          <span className="text-body2">팔로잉의 새 글</span>
          <Toggle
            isOn={followingNewPost}
            handleToggle={toggleFollowingNewPost}
          />
        </div>
      </section>
      <Spacer className="h-24" />
      <section className="px-16">
        <div className="h-[40px] flex items-center">
          <p className="text-body1">마케팅 알림</p>
        </div>
        <div className="h-[40px] flex items-center justify-between border-b">
          <span className="text-body2">내 활동</span>
          <Toggle
            isOn={marketingActivity}
            handleToggle={toggleMarketingActivity}
          />
        </div>
      </section>
      <Spacer className="h-16" />
      <div className="px-24 flex justify-between text-caption1 text-ad-gray-500">
        <p>마케팅 정보 수신 해제 2024.10.04</p>
        <span className="underline">약관 보기</span>
      </div>
    </div>
  );
}
