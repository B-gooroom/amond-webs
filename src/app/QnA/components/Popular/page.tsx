interface PopularProps {
  index: number;
  title: string;
  comments: number;
  views: number;
}

function Popular({ index, title, comments, views }: PopularProps) {
  return (
    <div className="flex gap-14 border px-16 py-24 rounded-2xl">
      <div className="text-subtitle1">{index}</div>
      <div className="flex-col gap-8 flex">
        {/* <p className="text-body2">사업자 등록증 신고할 때 궁금한 점</p> */}
        <p className="text-body2">{title}</p>
        <p className="text-caption1 text-ad-gray-500">
          답변 {comments} ･ 조회수 {views}
        </p>
      </div>
    </div>
  );
}

export default Popular;
