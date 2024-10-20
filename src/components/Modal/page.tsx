import Button from "../Button/page";
import { Spacer } from "../Spacer/page";

interface LogoutModalProps {
  title?: string;
  body?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "single" | "double";
}

export function Modal({
  title,
  body,
  isOpen,
  onClose,
  onConfirm,
  type,
}: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-2xl p-16 pt-24 min-w-[342px] flex flex-col items-center">
        {title && (
          <>
            <h2 className="text-h3">{title}</h2>
            <Spacer className="h-24" />
          </>
        )}
        {body && (
          <>
            <h2 className="text-subtitle2">{body}</h2>
            <Spacer className="h-24" />
          </>
        )}
        {type === "double" ? (
          <div className="flex justify-between w-full gap-8">
            <Button label="취소" type="normal" onClick={onClose} />
            <Button
              label="로그아웃"
              type="primary"
              onClick={onConfirm}
            ></Button>
          </div>
        ) : (
          <div className="w-full">
            <Button label="로그아웃" type="primary" onClick={onConfirm} />
          </div>
        )}
      </div>
    </div>
  );
}
