import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface TooltipProps {
  text: string;
  tooltipText: string;
}

export default function Tooltip({ text, tooltipText }: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e: MouseEvent) => {
    if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen(!isOpen)} className="text-ad-black">
        {text}
      </button>

      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full right-0 mb-8 w-64 bg-ad-gray-100 text-caption2 text-sm py-10 px-16 rounded-2xl"
        >
          <Image
            src="/images/TooltipPolygon.png"
            width={16}
            height={16}
            alt="tooltip"
            className="absolute bottom-[-8px] right-16"
          />
          {tooltipText}
        </div>
      )}
    </div>
  );
}
