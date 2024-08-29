import { ReactElement } from "react";
import HeaderData from "../../types/HeaderData";
import HeaderItem from "./HeaderItem";

window.addEventListener("scroll", toggleHeader);

let header: HTMLElement | null = null;
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
    header = document.getElementById("header");
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
          <div
            key={elements.length}
            className="w-0.5 flex-none bg-main-light-3"
          ></div>
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
    <div id="header" className="fixed w-full">
      <div className="peer/header flex flex-row text-main-light-1 text-2xl bg-main-dark-2">
        {mapItems()}
      </div>
      <div className="h-1 bg-main-light-2 transition-main peer-hover/header:shadow-separator" />
    </div>
  );
}
