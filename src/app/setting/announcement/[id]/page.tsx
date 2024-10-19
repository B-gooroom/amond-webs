"use client";
import { type AnnouncementDetail } from "@/app/types/setting";
import Header from "@/components/Header/page";
import { Spacer } from "@/components/Spacer/page";
import { SettingNoticeDetail } from "@/services/setting-notice";
import { formatDate } from "@/utils/formateDate";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnnouncementDetail() {
  const { id } = useParams();
  const [noticeDetail, setNoticeDetail] = useState<AnnouncementDetail[] | null>(
    null
  );

  useEffect(() => {
    const announcementDetail = async () => {
      const data = await SettingNoticeDetail({ announcement_id: Number(id) });
      if (data) {
        setNoticeDetail(data);
      }
    };
    announcementDetail();
  }, [id]);

  // console.log("noticeDetail", noticeDetail);

  return (
    <>
      <Header title="공지사항" leftItem="IconLeftArrow" />
      <Spacer className="h-16" />
      {noticeDetail?.map((item, index) => {
        const { title, content, created_at } = item;
        return (
          <div key={index} className="px-16">
            <div className="flex gap-16 border-b pb-16">
              <Image
                src="/images/hadaProfile.png"
                alt="하다프로필이미지"
                width={48}
                height={48}
              />
              <div className="flex flex-col gap-8">
                <div className="text-body2">{title}</div>
                <div className="text-caption1 text-ad-gray-500">
                  {formatDate(created_at)}
                </div>
              </div>
            </div>
            <Spacer className="h-16" />
            <div className="text-body2">{content}</div>
          </div>
        );
      })}
    </>
  );
}
