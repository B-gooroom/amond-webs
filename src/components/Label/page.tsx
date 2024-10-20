import classnames from "classnames";

interface LabelProps {
  children: string;
  size?: "small" | "medium";
  color?: "brown" | "gray" | "black";
}

export default function Label({ children, size, color }: LabelProps) {
  const isDarkBackground = color === "brown" || color === "black";

  return size === "small" ? (
    <div
      className={classnames(
        "text-caption2 rounded-2xl px-8 py-4 w-fit",
        color === "brown"
          ? "bg-ad-brown-800"
          : color === "gray"
          ? "bg-ad-gray-100"
          : color === "black"
          ? "bg-ad-black"
          : "border",
        isDarkBackground ? "text-white" : "text-black"
      )}
    >
      {children}
    </div>
  ) : (
    <div
      className={classnames(
        "text-caption1 rounded-2xl px-16 py-8 w-fit",
        color === "brown"
          ? "bg-ad-brown-800"
          : color === "gray"
          ? "bg-ad-gray-100"
          : color === "black"
          ? "bg-ad-black"
          : "border",
        isDarkBackground ? "text-white" : "text-black"
      )}
    >
      {children}
    </div>
  );
}
