import HeaderData from "../../types/HeaderData";
import { useNavigate } from "react-router-dom";

export default function HeaderItem({
  item,
  active,
}: {
  item: HeaderData;
  active: boolean;
}) {
  const navigatePath = useNavigate();

  function navigate(href: string) {
    if (href.startsWith("http")) {
      window.location.href = href;
    } else {
      navigatePath(href);
    }
  }

  return (
    <div
      onClick={() => navigate(item.href)}
      className={
        "group/header-item flex-1 text-center p-2 select-none cursor-pointer z-10 transition-main hover:bg-main-dark-3 hover:shadow-header-item " +
        (active ? "underline" : "")
      }
    >
      <span className="hidden lg:block transition-main group-hover/header-item:drop-shadow-header-item">
        {item.title}
      </span>
      <span className="lg:hidden transtiion-main group-hover/header-item:drop-shadow-header-item">
        {item.title_short}
      </span>
    </div>
  );
}
