import Link from "next/link";

interface PopularProps {
  index: number;
  id: number;
  title: string;
  comments: number;
  views: number;
}

export default function Popular({
  index,
  id,
  title,
  comments,
  views,
}: PopularProps) {
  return (
    <Link
      href={`/qna/${id}`}
      className="flex gap-14 border px-16 py-24 rounded-2xl"
    >
      <div className="text-subtitle1">{index}</div>
      <div className="flex-col gap-8 flex">
        <p className="text-body2">{title}</p>
        <p className="text-caption1 text-ad-gray-500">
          답변 {comments} ･ 조회수 {views}
        </p>
      </div>
    </Link>
  );
}
