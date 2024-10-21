interface ToggleProps {
  isOn: boolean;
  handleToggle: () => void;
}

export default function Toggle({ isOn, handleToggle }: ToggleProps) {
  return (
    <div
      className={`w-[40px] h-6 flex items-center rounded-full p-[2px] cursor-pointer ${
        isOn ? "bg-ad-brown-800" : "bg-gray-300"
      }`}
      onClick={handleToggle}
    >
      <div
        className={`bg-white w-[20px] h-[20px] rounded-full shadow-md transform duration-300 ease-in-out ${
          isOn ? "translate-x-[16px]" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
}
