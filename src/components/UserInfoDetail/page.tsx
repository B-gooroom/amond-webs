import { formatDate } from "@/utils/formateDate";
import Image from "next/image";
import { useState } from "react";
import { BottomSheet } from "../BottomSheet/page";
import Icon from "../Icon/page";
import { Spacer } from "../Spacer/page";

interface UserInfoDetailProps {
  profile_image?: string;
  userNickname: string;
  created_at: Date;
  isWriter: boolean;
}

export default function UserInfoDetail({
  profile_image,
  userNickname,
  created_at,
  isWriter,
}: UserInfoDetailProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    console.log("글 수정하기 클릭");
  };

  const handleDelete = () => {
    console.log("글 삭제하기 클릭");
  };

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };
  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

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
        <div onClick={handleOpenBottomSheet}>
          <Icon icon="IconMore" size={24} />
        </div>
      </div>
      {isOpen &&
        (isWriter ? (
          <BottomSheet
            isOpen={isOpen}
            onClose={handleCloseBottomSheet}
            actions={[
              { label: "글 수정하기", onClick: handleEdit },
              { label: "글 삭제하기", onClick: handleDelete },
            ]}
          />
        ) : (
          <BottomSheet
            isOpen={isOpen}
            onClose={handleCloseBottomSheet}
            actions={[
              { label: "이 사용자의 글 보지 않기", onClick: handleEdit },
              {
                label: "신고하기",
                onClick: () => console.log("신고하기 클릭"),
              },
            ]}
          />
        ))}
    </div>
  );
}
