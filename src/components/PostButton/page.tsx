interface ButtonProps {
  children: React.ReactNode;
}

export default function PostButton({ children }: ButtonProps) {
  return (
    <div className="relative cursor-pointer">
      <div className="absolute right-[120px]">
        <div className="fixed z-20 bottom-[95px] w-[100px] h-[48px] bg-ad-brown-800 px-2 py-13 text-subtitle2 text-white flex justify-center items-center rounded-full">
          {children}
        </div>
      </div>
    </div>
  );
}
