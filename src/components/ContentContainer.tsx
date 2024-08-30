import { ReactNode } from "react";

export default function ContentContainer({
  id,
  className: additionalClass,
  children,
}: {
  id?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      id={id}
      className={
        "bg-main-dark-3 p-2 shadow-main-content-1 transition-main lg:hover:shadow-main-content-2 lg:rounded-xl lg:p-4" +
        (!additionalClass ? "" : " " + additionalClass)
      }
    >
      {children}
    </div>
  );
}
