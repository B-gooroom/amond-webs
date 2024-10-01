import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
}

export default function PostButton({ children }: ButtonProps) {
  return (
    <div
      className={classNames(
        "fixed z-10 bottom-[95px] w-[100px] h-[48px] right-[16px] bg-ad-brown-800 px-2 py-13 text-subtitle2 text-white flex justify-center items-center rounded-full"
      )}
    >
      {children}
    </div>
  );
}
