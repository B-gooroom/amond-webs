import classNames from "classnames";

interface BottomSheetProps {
  actions: { label: string; onClick: () => void }[];
  isOpen: boolean;
  onClose: () => void; // 닫기 버튼을 추가하기 위한 콜백
}

// TODO: 버튼 눌리는거랑 바텀시트트 framer motion 추가하기

export function BottomSheet({ actions, isOpen, onClose }: BottomSheetProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-gray-900 bg-opacity-30"
        onClick={onClose} // 바깥 클릭 시 닫힘
      ></div>

      <div
        className={`fixed inset-x-0 bottom-0 bg-white px-16 pt-24 rounded-t-2xl shadow-lg transform transition-transform duration-300 ease-in-out max-w-[500px] m-auto ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{
          height: "148px",
        }}
      >
        <ul>
          {actions.map((action, index) => (
            <li key={index} className="p-10">
              <button
                className={
                  (classNames("w-full text-left text-body1"),
                  action.label === "신고하기" ? "text-ad-red" : "text-ad-black")
                }
                onClick={action.onClick}
              >
                {action.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
