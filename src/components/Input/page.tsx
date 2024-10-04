// components/Input.tsx
import React from "react";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  disabled = false,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation(); // 이벤트 전파 방지
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onClick={handleClick}
        className="border text-body2 px-16 py-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ad-brown-800"
      />
    </div>
  );
};

export default Input;
