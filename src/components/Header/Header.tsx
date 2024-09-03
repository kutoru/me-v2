import { ReactElement, useEffect, useRef, useState } from "react";
import HeaderData from "../../types/HeaderData";
import HeaderItem from "./HeaderItem";

export default function Header({
  headerRect,
  updateHeaderRect,
}: {
  headerRect?: DOMRect;
  updateHeaderRect: (rect?: DOMRect) => void;
}) {
  const refHeader = useRef<HTMLDivElement>(null);
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

  type PositionInfo = {
    top: number;
    lastScroll: number;
    lastTop: number;
  };

  const [positionInfo, setPositionInfo] = useState<PositionInfo>({
    top: 0,
    lastScroll: 0,
    lastTop: 0,
  });

  useEffect(() => {
    function handleScroll() {
      setPositionInfo(getHeaderPosition());
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [getHeaderPosition]);

  useEffect(() => {
    function handleResize() {
      const newRect = refHeader.current?.getBoundingClientRect();
      if (newRect?.height !== headerRect?.height) {
        updateHeaderRect(newRect);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [headerRect, updateHeaderRect]);

  useEffect(() => {
    updateHeaderRect(refHeader.current?.getBoundingClientRect());
  }, [positionInfo.top, updateHeaderRect]);

  function getHeaderPosition(): PositionInfo {
    const scrollPosition = window.scrollY;
    const headerScrollOffset = 128;

    let headerTopPosition = positionInfo.top;
    let lastScrollPosition = positionInfo.lastScroll;
    let lastTopPosition = positionInfo.lastTop;

    if (lastScrollPosition - scrollPosition < 0) {
      if (
        lastTopPosition - scrollPosition > headerScrollOffset * -1 ||
        headerTopPosition > headerScrollOffset * -1
      ) {
        headerTopPosition = lastTopPosition - scrollPosition;
      }
    } else {
      if (headerTopPosition < headerScrollOffset * -1) {
        lastTopPosition = scrollPosition - headerScrollOffset;
      }

      if (lastTopPosition - scrollPosition > 0) {
        lastTopPosition = scrollPosition;
        headerTopPosition = 0;
      } else {
        headerTopPosition = lastTopPosition - scrollPosition;
      }
    }

    return {
      lastScroll: scrollPosition,
      lastTop: lastTopPosition,
      top: headerTopPosition,
    };
  }

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
          active={item.href === window.location.pathname}
        />
      );
    });

    return elements;
  }

  return (
    <div
      ref={refHeader}
      className="fixed w-full z-20"
      style={{
        top: `${positionInfo.top}px`,
      }}
    >
      <div className="peer/header flex flex-row text-main-light-1 text-2xl bg-main-dark-2">
        {mapItems()}
      </div>
      <div className="h-1 bg-main-light-2 transition-main peer-hover/header:shadow-separator" />
    </div>
  );
}
