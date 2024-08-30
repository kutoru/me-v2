import { ReactElement, useEffect } from "react";
import HeaderData from "../../types/HeaderData";
import HeaderItem from "./HeaderItem";
import { useLocation } from "react-router-dom";

window.addEventListener("scroll", toggleHeader);

let header: HTMLElement | null = null;
let button: HTMLElement | null = null;

let lastScrollPosition = 0;
let lastTopPosition = 0;
let currentTopValue = 0;

function toggleHeader(_: Event) {
  loadElements();
  if (!header) {
    return;
  }

  let buttonHeight = 0;
  if (button) {
    buttonHeight = button.getBoundingClientRect().height + 16;
  }

  const headerHeight = header.getBoundingClientRect().height;
  const headerScrollOffset = headerHeight + 16 + buttonHeight;

  if (lastScrollPosition - window.scrollY < 0) {
    lastScrollPosition = window.scrollY;
    currentTopValue = lastTopPosition - window.scrollY;
    updatePosition(currentTopValue, headerHeight);
  } else {
    lastScrollPosition = window.scrollY;

    if (currentTopValue < headerScrollOffset * -1) {
      lastTopPosition = window.scrollY - headerScrollOffset;
    }

    currentTopValue = lastTopPosition - window.scrollY;
    if (currentTopValue > 0) {
      lastTopPosition = window.scrollY;
      updatePosition(0, headerHeight);
    } else {
      updatePosition(currentTopValue, headerHeight);
    }
  }
}

function loadElements(forceReload: boolean = false) {
  if (!header || forceReload) {
    header = document.getElementById("header");
  }
  if (!button || forceReload) {
    button = document.getElementById("expand-button");
  }
}

function updatePosition(topValue?: number, headerHeight?: number) {
  updateHeaderPosition(topValue);
  updateButtonPosition(topValue, headerHeight);
}

function updateHeaderPosition(topValue?: number) {
  if (topValue === undefined) {
    topValue = currentTopValue;
  }

  if (header) {
    header.style.top = `${topValue}px`;
  }
}

function updateButtonPosition(topValue?: number, headerHeight?: number) {
  if ((!headerHeight && !header) || !button) {
    return;
  }

  if (topValue === undefined) {
    topValue = currentTopValue;
  }

  if (!headerHeight) {
    headerHeight = header!.getBoundingClientRect().height;
  }

  button.style.top = `calc(${headerHeight}px + 0.5rem + ${topValue}px)`;
}

export default function Header() {
  const location = useLocation();

  useEffect(() => {
    loadElements(true);
    updateButtonPosition(0);
  }, [location]);

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
    <div id="header" className="fixed w-full z-20">
      <div className="peer/header flex flex-row text-main-light-1 text-2xl bg-main-dark-2">
        {mapItems()}
      </div>
      <div className="h-1 bg-main-light-2 transition-main peer-hover/header:shadow-separator" />
    </div>
  );
}
