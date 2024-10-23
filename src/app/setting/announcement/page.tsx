"use client";
import { AnnouncementList } from "@/app/types/setting";
import Header from "@/components/Header/page";
import { SettingNotice } from "@/services/setting-notice";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Announcement() {
  const [announcementData, setAnnouncementData] = useState<
    AnnouncementList[] | null
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
          const { title, created_at, announcement_id } = item;
          return (
            <Link
              href={`/setting/announcement/${announcement_id}`}
              key={index}
              className="pb-16 border-b text-body2 flex gap-16"
            >
              <Image
                src="/images/hadaProfile.png"
                alt="하다프로필이미지"
                width={48}
                height={48}
              />
              <div className="flex flex-col gap-8">
                <div className="text-body1">{title}</div>
                <div className="text-caption1 text-ad-gray-500">
                  {formatDate(created_at)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
