// components/Dropdown.tsx
import React, { useEffect, useRef, useState } from "react";
import Icon from "../Icon/page";

interface DropdownProps {
  label?: string;
  items: string[]; // 드롭다운 아이템 목록
  onSelect: (item: string) => void; // 선택된 아이템을 상위 컴포넌트로 전달하는 콜백
  defaultValue?: string; // 초기값
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  items,
  onSelect,
  defaultValue,
}) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림/닫힘 상태
  const [selectedItem, setSelectedItem] = useState<string | null>(null); // 선택된 아이템
  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운 외부 클릭 감지를 위한 Ref

  // 드롭다운 외부 클릭 시 닫히도록 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 초기값이 변경되었을 때에도 selectedItem이 업데이트되도록 설정
  useEffect(() => {
    if (defaultValue) {
      setSelectedItem(defaultValue);
    }
  }, [defaultValue]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectItem = (item: string) => {
    setSelectedItem(item); // 선택된 아이템 업데이트
    setIsOpen(false); // 드롭다운 닫기
    onSelect(item); // 상위 컴포넌트로 선택된 아이템 전달
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {label && (
        <label className="block mb-1 text-sm font-semibold">{label}</label>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
        className="w-full text-body2 border px-16 py-10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-ad-brown-800 flex justify-between"
      >
        {selectedItem || items[0]}
        {isOpen ? <Icon icon="IconDropup" /> : <Icon icon="IconDropdown" />}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-white border rounded-2xl text-body2 shadow-lg">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectItem(item);
              }}
              className="cursor-pointer px-16 py-10 hover:bg-blue-100"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
