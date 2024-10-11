import { formatDate } from "@/utils/formateDate";
import Image from "next/image";
import Icon from "../Icon/page";
import { Spacer } from "../Spacer/page";

interface UserInfoDetailProps {
  profile_image?: string;
  userNickname: string;
  created_at: Date;
}

export default function UserInfoDetail({
  profile_image,
  userNickname,
  created_at,
}: UserInfoDetailProps) {
  return (
    <div className="flex gap-16">
      {profile_image ? (
        <Image
          src={profile_image}
          alt="하다프로필이미지"
          width={48}
          height={48}
        />
      ) : (
        <Image
          src="/images/hadaProfile.png"
          alt="하다프로필이미지"
          width={48}
          height={48}
        />
      )}
      <div className="flex justify-between w-full">
        <div>
          <p className="text-body1">{userNickname}</p>
          <Spacer className="h-8" />
          <p className="text-caption1 text-ad-gray-500">
            {formatDate(created_at)}
          </p>
        </div>
        <Icon icon="IconMore" size={24} />
      </div>
    </div>
  );
}
