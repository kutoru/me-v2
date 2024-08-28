import HeaderData from "../../types/HeaderData";
import { Link } from "react-router-dom";

export default function HeaderItem({
  item,
  active,
}: {
  item: HeaderData;
  active: boolean;
}) {
  return (
    <Link
      to={item.href}
      className={"header-item " + (active ? "underline" : "")}
    >
      <span className="media-size-normal">{item.title}</span>
      <span className="media-size-small">{item.title_short}</span>
    </Link>
  );
}
