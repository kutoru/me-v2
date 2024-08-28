import "./Header.css";
import { ReactElement } from "react";
import HeaderData from "../../types/HeaderData";
import HeaderItem from "./HeaderItem";

window.addEventListener("scroll", toggleHeader);

let header: ElementCSSInlineStyle | undefined = undefined;
let lastScrollPosition = 0;
let lastTopPosition = 0;
let currentTopValue = 0;
const headerScrollOffset = 100;

function toggleHeader(e: Event) {
  loadHeader();
  if (!header) {
    return;
  }

  if (lastScrollPosition - window.scrollY < 0) {
    lastScrollPosition = window.scrollY;
    currentTopValue = lastTopPosition - window.scrollY;
    header.style.top = `${currentTopValue}px`;
  } else {
    lastScrollPosition = window.scrollY;

    if (currentTopValue < headerScrollOffset * -1) {
      lastTopPosition = window.scrollY - headerScrollOffset;
    }

    currentTopValue = lastTopPosition - window.scrollY;
    if (currentTopValue > 0) {
      lastTopPosition = window.scrollY;
      header.style.top = "0px";
    } else {
      header.style.top = `${currentTopValue}px`;
    }
  }
}

function loadHeader() {
  if (!header) {
    header = document.getElementsByClassName(
      "header"
    )[0] as unknown as ElementCSSInlineStyle;
  }
}

export default function Header() {
  const items: HeaderData[] = [
    {
      title: "About Me",
      title_short: "Me",
      href: "/",
    },
    {
      title: "My Projects",
      title_short: "Projects",
      href: "/projects",
    },
    {
      title: "My GitHub Profile",
      title_short: "GitHub",
      href: "https://github.com/kutoru",
    },
  ];

  const currentPath = window.location.pathname;

  function mapItems(): ReactElement[] {
    const elements: ReactElement[] = [];

    items.forEach((item, index) => {
      if (index !== 0) {
        elements.push(
          <div key={elements.length} className="header-item-separator"></div>
        );
      }

      elements.push(
        <HeaderItem
          key={elements.length}
          item={item}
          active={item.href === currentPath}
        />
      );
    });

    return elements;
  }

  return (
    <div className="header">
      <div className="header-item-container">{mapItems()}</div>
      <div className="separator-big" />
    </div>
  );
}
