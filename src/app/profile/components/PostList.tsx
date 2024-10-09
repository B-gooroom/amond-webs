import { QnA } from "@/app/types/type";
import { ProfileUserPost } from "@/services/\bprofile-user-post";
import { useEffect, useState } from "react";

export default function PostList() {
  const [postAll, setPostAll] = useState<QnA[] | null>(null);

  useEffect(() => {
    const fetchPostList = async () => {
      const postList = await ProfileUserPost();
      setPostAll(postList);
    };
    fetchPostList();
  }, []);

  console.log("postAll", postAll);

  return (
    <div>
      {postAll ? (
        <>
          {postAll.map((post, index) => {
            const { title } = post;
            return (
              <div key={index}>
                <p>{title}</p>
              </div>
            );
          })}
        </>
      ) : (
        <div>작성한 게시물을 확인할 수 있어요.</div>
      )}
    </div>
  );
}
