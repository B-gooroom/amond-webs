interface BottomSheetProps {
  actions: { label: string; onClick: () => void }[];
  isOpen: boolean;
  onClose: () => void; // 닫기 버튼을 추가하기 위한 콜백
}

export function BottomSheet({ actions, isOpen, onClose }: BottomSheetProps) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-gray-900 bg-opacity-50"
        onClick={onClose} // 바깥 클릭 시 닫힘
      ></div>

      <div
        className={`fixed inset-x-0 bottom-0 bg-white p-4 rounded-t-lg shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "148px" }}
      >
        <ul>
          {actions.map((action, index) => (
            <li key={index}>
              <button
                className="w-full text-left p-10 text-body1"
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
