"use client";
import { ImageSignedUrl } from "@/services/image-signed-url";
import Image from "next/image";
import { useEffect, useState } from "react";
import Label from "../Label/page";

interface ListProps {
  label: string;
  title: string;
  description: string;
  comments: number;
  views: number;
  images?: string;
}

export function List({
  label,
  title,
  description,
  comments,
  views,
  images,
}: ListProps) {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (images) {
        const signedUrl = await ImageSignedUrl(images); // 서명된 URL 가져오기
        if (signedUrl) {
          setImageUrl(signedUrl);
        }
      }
    };

    fetchImageUrl();
  }, [images]);

  return (
    <div className="flex-col flex gap-8">
      <Label size="small" color="gray">
        {label}
      </Label>
      <p className="text-body2">{title}</p>
      <div className="flex justify-between w-full border-b pb-12">
        <div className="flex-col flex max-w-full justify-around">
          <span className="text-caption1 overflow-hidden text-ellipsis line-clamp-2 break-words">
            {description}
          </span>
          {/* <Spacer className="h-8" /> */}
          <span className="text-caption1 flex gap-2 text-ad-gray-500">
            답변 {comments} ･ 조회수 {views}
          </span>
        </div>
        <div className="rounded-2xl w-[64px] h-[64px] overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="썸네일 이미지"
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
}
