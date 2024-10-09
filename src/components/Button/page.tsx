import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "primary" | "normal" | "accent" | "disabled";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  type = "normal",
  disabled = false,
}) => {
  const baseStyles = "w-full px-16 py-14 h-[80px] fixed bottom-0 max-w-[500px]";

  const typeStyles = {
    primary: "bg-ad-brown-800 text-ad-white",
    normal: "bg-ad-white border text-ad-black",
    accent: "border-ad-red text-ad-red",
    disabled: "bg-ad-gray-300 text-ad-white cursor-not-allowed",
  };

  return (
    <button
      className={`${baseStyles}`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <div
        className={`${typeStyles[type]} h-full flex justify-center items-center rounded-full text-button`}
      >
        {label}
      </div>
    </button>
  );
};

export default Button;
