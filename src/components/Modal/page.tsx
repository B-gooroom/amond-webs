import Button from "../Button/page";
import { Spacer } from "../Spacer/page";

interface LogoutModalProps {
  title?: string;
  body?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "single" | "double";
  items?: string[];
}

export function Modal({
  title,
  body,
  isOpen,
  onClose,
  onConfirm,
  type,
  items,
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
            {items?.map((item, index) => (
              <Button
                key={index}
                label={item}
                type={index === 0 ? "normal" : "primary"}
                onClick={index === 0 ? onClose : onConfirm}
              />
            ))}
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
