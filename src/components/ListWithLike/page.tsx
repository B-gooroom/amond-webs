import { BoardLike } from "@/app/types/board";
import Image from "next/image";
import Icon from "../Icon/page";
import Label from "../Label/page";
import { Spacer } from "../Spacer/page";

interface ListProps {
  label: string;
  title: string;
  description: string;
  comments: number;
  views: number;
  images?: string;
  likes: BoardLike[];
  user_id: string;
}

export default function ListWithLike({
  label,
  title,
  description,
  comments,
  views,
  images,
  likes,
  user_id,
}: ListProps) {
  return (
    <div className="flex-col flex gap-8">
      <Label size="small" color="gray">
        {label}
      </Label>
      <p className="text-body2">{title}</p>
      <div className="flex gap-16 w-full border-b pb-12">
        <div className="flex-col flex max-w-full">
          <span className="text-caption1 overflow-hidden text-ellipsis line-clamp-2 break-words">
            {description}
          </span>
          <Spacer className="h-8" />
          <span className="text-caption1 flex gap-2 text-ad-gray-500">
            조회수 {views}
          </span>
        </div>
        <div className="flex flex-col justify-end">
          {images && (
            <div className="rounded-2xl overflow-hidden w-[64px] h-[64px] flex-shrink-0 border">
              <Image
                src={images}
                alt="썸네일 이미지"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
          )}
          <Spacer className="h-8" />
          <div className="flex gap-8 justify-end">
            <div className="flex gap-[2px] items-center">
              {likes[0].user_id === user_id ? (
                <Icon icon="IconFavoriteActiveSmall" size={12} />
              ) : (
                <Icon icon="IconFavoriteSmall" size={12} />
              )}
              <span className="text-caption1 text-ad-gray-500">
                {likes.length}
              </span>
            </div>
            <div className="flex gap-[2px] items-center">
              <Icon icon="IconCommentSmall" size={12} />
              <span className="text-caption1 text-ad-gray-500">{comments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}