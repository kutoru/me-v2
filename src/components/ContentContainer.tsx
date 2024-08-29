import { ReactNode } from "react";

export default function ContentContainer({
  children,
  className: additionalClass,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "bg-main-dark-3 p-2 shadow-main-content-1 transition-main lg:hover:shadow-main-content-2 lg:rounded-xl lg:p-4" +
        (!additionalClass ? "" : " " + additionalClass)
      }
    >
      {children}
    </div>
  );
}
