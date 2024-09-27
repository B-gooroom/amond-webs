import Label from "../Label/page";

interface ListProps {
  label: string;
  title: string;
  description: string;
  comments: number;
  views: number;
  imageUrl?: string;
}

export default function List({
  label,
  title,
  description,
  comments,
  views,
  imageUrl,
}: ListProps) {
  return (
    <div className="flex-col flex gap-8">
      <Label size="small" color="gray">
        {label}
      </Label>
      <p className="text-body2">{title}</p>
      <div className="flex gap-16 w-full border-b pb-12">
        <div className="flex-col flex">
          <span className="text-caption1 flex-grow">{description}</span>
          <span className="text-caption1 flex gap-2 text-ad-gray-500">
            답변 {comments} ･ 조회수 {views}
          </span>
        </div>
        {imageUrl && (
          <div className="border rounded-2xl overflow-hidden w-[64px] h-[64px] flex-shrink-0">
            {/* <Image
              src={imageUrl}
              alt="썸네일 이미지"
              width={64}
              height={64}
              className="object-cover"
            /> */}
          </div>
        )}
      </div>
    </div>
  );
}
