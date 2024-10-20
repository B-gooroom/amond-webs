import classNames from "classnames";
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // 이벤트 타입 확장
  type?: "primary" | "normal" | "accent" | "disabled";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "normal",
  disabled = false,
  className,
}) => {
  // 기본 스타일
  const baseStyles = "w-full h-[52px] max-w-[466px]";

  // 타입별 스타일
  const typeStyles = {
    primary: "bg-ad-brown-800 text-ad-white",
    normal: "bg-ad-white border text-ad-black",
    accent: "border-ad-red text-ad-red",
    disabled: "bg-ad-gray-300 text-ad-white cursor-not-allowed",
  };

  return (
    <button
      className={classNames(baseStyles, className)} // baseStyles와 className 병합
      onClick={!disabled ? onClick : undefined} // disabled 상태 처리
      disabled={disabled}
    >
      <div
        className={classNames(
          typeStyles[type], // 타입에 따른 스타일 적용
          "h-full flex justify-center items-center rounded-full text-button"
        )}
      >
        {label}
      </div>
    </button>
  );
};

export default Button;
