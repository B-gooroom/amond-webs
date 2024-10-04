import Header from "@/components/Header/page";
import PostButton from "@/components/PostButton/page";
import { Spacer } from "@/components/Spacer/page";
import { profileUser } from "@/services/profile-user";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Profile() {
  const supabase = createClient();
  const userData = await profileUser(supabase);

  // console.log("userData", userData);

  return (
    <div className="w-full h-full">
      <Header title="" rightItems={["setting", "notification"]} />
      {userData && (
        <section className="h-[230px]">
          <div className="h-[96px] p-16 flex gap-16">
            <Image
              src="/images/hadaProfile.png"
              alt="하다프로필이미지"
              width={64}
              height={64}
            />
            <div className="flex flex-col gap-8">
              <p className="text-subtitle2">{userData.nickname}</p>
              <button className="bg-ad-black px-16 py-8 text-ad-white rounded-full text-caption1">
                프로필 편집
              </button>
            </div>
          </div>
          <div className="px-16 flex flex-col gap-8">
            <p className="text-caption1">
              팔로워 {userData.follower} | 팔로잉 {userData.following}
            </p>
            <p className="text-body2">{userData.introduce}</p>
            <div className="flex gap-8">
              <span className="bg-ad-gray-100 px-8 py-[3px] text-caption2 rounded-2xl">
                {userData.age}세
              </span>
              <span className="bg-ad-gray-100 px-8 py-[3px] text-caption2 rounded-full">
                {userData.region}
              </span>
            </div>
          </div>
          <Spacer className="h-24" />
          <p className="px-16 text-body2">나의 활동</p>
        </section>
      )}
      <PostButton>
        <Link href="/post">+ 글쓰기</Link>
      </PostButton>
    </div>
  );
}
