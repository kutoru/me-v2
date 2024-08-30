import { CSSProperties, ReactNode } from "react";

export default function ContentContainer({
  id: id,
  className: additionalClass,
  style,
  children,
}: {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      id={id}
      className={
        "bg-main-dark-3 p-2 shadow-main-content-1 transition-main lg:hover:shadow-main-content-2 lg:rounded-xl lg:p-4" +
        (!additionalClass ? "" : " " + additionalClass)
      }
      style={style}
    >
      {children}
    </div>
  );
}
