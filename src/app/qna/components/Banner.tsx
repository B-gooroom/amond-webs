import Image from "next/image";
import Link from "next/link";
interface BannerProps {
  imageUrl: string;
  path: string;
  alt: string;
}

// TODO: 지금 배너 이미지를 스토리지에서 가져오는데 이걸 db에도 매칭하는걸 만들어야하나 고민중

export default function Banner({ imageUrl, path, alt }: BannerProps) {
  return (
    <Link href={path}>
      <div className="rounded-2xl justify-center items-center flex cursor-pointer w-full">
        <Image
          src={imageUrl}
          alt={alt}
          width={343}
          height={120}
          layout="responsive"
          quality={100}
        />
      </div>
    </Link>
  );
}
