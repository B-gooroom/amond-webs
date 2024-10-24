"use client";

import Button from "@/components/Button/page";
import Header from "@/components/Header/page";
import Icon from "@/components/Icon/page";
import Input from "@/components/Input/page";
import { Spacer } from "@/components/Spacer/page";
import { PostBoard } from "@/services/post-board";
import { PostQna } from "@/services/post-qna";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SelectBoard from "./components/SelectBoard";
import SelectCategory from "./components/SelectCategory";

export default function Post() {
  const router = useRouter();
  const [board, setBoard] = useState<number>(0);
  const [category, setCategory] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [photos, setPhotos] = useState<File[]>([]);

  const handleBackClick = () => {
    router.back(); // history의 이전 페이지로 이동
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.value.length > 20) return;
    // console.log("title changed", e.target.value);
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();
    // console.log("content changed", e.target.value);
    setContent(e.target.value);
  };

  const isDisabled = () => {
    if (title.length && content.length) {
      return true;
    }
    return false;
  };

  const handlePost = async () => {
    // console.log("게시글확인 :", title, content, board, category);

    /** 게시글 INSERT */
    if (board === 0) {
      const { postId, error } = await PostQna({
        title,
        content,
        category,
        photos,
      });
      if (error) {
        console.error("Error:", error);
        alert("게시글 작성에 실패했습니다.");
      } else if (postId) {
        router.push(`/qna/${postId}`);
      }
    }
    if (board === 1) {
      // TODO: 사업자 인증 확인하는 로직 추가
      const { postId, error } = await PostBoard({ title, content, category });
      if (error) {
        console.error("Error:", error);
        alert("게시글 작성에 실패했습니다.");
      } else if (postId) {
        router.push(`/board/${postId}`);
      }
    }
  };

  // 이미지 추가 함수
  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > 10) {
      alert("최대 10장까지 업로드 가능합니다.");
      return;
    }
    setPhotos((prevPhotos) => [...prevPhotos, ...files]);
  };

  return (
    <>
      <div onClick={handleBackClick}>
        <Header title="글쓰기" leftItem={"IconClose"} />
      </div>
      <Spacer className="h-16" />
      <section className="flex flex-col gap-16 px-16">
        <div>
          <p className="text-body1">게시판</p>
          <Spacer className="h-8" />
          <SelectBoard board={board} setBoard={setBoard} />
        </div>
        <div>
          <p className="text-body1">카테고리</p>
          <Spacer className="h-8" />
          <SelectCategory
            category={category}
            setCategory={setCategory}
            board={board}
          />
        </div>
        <div>
          <p className="text-body1">제목</p>
          <Spacer className="h-8" />
          <Input
            placeholder="20자 이내로 제목을 작성해 주세요"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <p className="text-body1">내용</p>
          <Spacer className="h-8" />
          <textarea
            className="border text-body2 rounded-2xl px-16 py-12 focus:outline-none focus:ring-2 focus:ring-ad-brown-800 resize-none h-[150px] w-full"
            value={content}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={handleContentChange}
            placeholder="게시판/카테고리에 알맞은 내용을 작성해 주세요"
          />
        </div>
        <p className="text-caption1">
          <span className="underline text-ad-brown-800">글쓰기 가이드</span>를
          확인해주세요
        </p>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          onChange={handleAddPhoto}
        />
        <label htmlFor="fileInput" className="flex gap-8">
          <div className="border rounded-2xl w-[64px] h-[64px] flex flex-col items-center justify-center">
            <Icon icon="IconAddPhotoStroke" />
            <span className="text-caption1 text-ad-gray-500">
              {photos.length} /10
            </span>
          </div>
          {photos.map((photo, index) => (
            <div
              key={index}
              className="rounded-2xl w-[64px] h-[64px] overflow-hidden"
            >
              <Image
                src={URL.createObjectURL(photo)}
                alt="photo"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </label>
      </section>
      <div className="fixed bottom-0 w-full px-16 pt-14 pb-[34px] -ml-[1px] max-w-[500px]">
        <Button
          label="작성 완료"
          type={isDisabled() ? "primary" : "disabled"}
          disabled={!isDisabled()}
          onClick={handlePost}
        />
      </div>
    </>
  );
}
