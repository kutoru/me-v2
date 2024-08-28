import HeaderData from "../../types/HeaderData";

export default function HeaderItem({
  item,
  active,
}: {
  item: HeaderData;
  active: boolean;
}) {
  function redirect(href: string) {
    window.location.href = href;
  }

  return (
    <div
      onClick={() => redirect(item.href)}
      className={"header-item " + (active ? "underline" : "")}
    >
      <span className="media-size-normal">{item.title}</span>
      <span className="media-size-small">{item.title_short}</span>
    </div>
  );
}
