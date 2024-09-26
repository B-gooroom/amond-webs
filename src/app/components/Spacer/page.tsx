import React from "react";

// 일반 함수형 컴포넌트
export function Spacer({
  className,
  children,
  role = "presentation",
  ...rest
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div role={role} className={className} {...rest}>
      {children}
    </div>
  );
}
