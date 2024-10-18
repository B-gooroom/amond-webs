"use client";
import { AnnouncementData } from "@/app/types/setting";
import Header from "@/components/Header/page";
import { SettingNotice } from "@/services/setting-notice";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Announcement() {
  const [announcementData, setAnnouncementData] = useState<
    AnnouncementData[] | null
  >(null);

  // TODO: 데이터베이스 type 수정 필요

  useEffect(() => {
    const announcements = async () => {
      const data = await SettingNotice();
      if (data) {
        setAnnouncementData(data);
      }
    };
    announcements();
  }, []);

  // console.log("announcementData", announcementData);

  if (!announcementData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header title="공지사항" leftItem="IconLeftArrow" />
      <div className="px-16 pt-16">
        {announcementData.map((item, index) => {
          const { title, content } = item;
          return (
            <div key={index} className="pb-16 border-b text-body2 flex gap-16">
              <Image
                src="/images/hadaProfile.png"
                alt="하다프로필이미지"
                width={48}
                height={48}
              />
              <div className="flex flex-col gap-8">
                <div className="text-body1">{title}</div>
                <div className="text-caption1">{content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
