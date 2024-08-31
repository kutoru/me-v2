import { ReactNode, useEffect, useState } from "react";
import ContentContainer from "./ContentContainer";
import { ReactComponent as IconMenu } from "../static/menu.svg";

window.addEventListener("resize", (_) => {
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    updateSize();
  }
});

let lastWidth = 0;
let lastUpdated = 0;

let mainContainerId = "";
let contentCoverId = "";
let expandedOuter = false;

function updateSize() {
  const now = Date.now();
  if (lastUpdated + 16 > now) {
    return;
  }

  lastUpdated = now;

  const mainCont = document.getElementById(mainContainerId);
  const sectionCont = mainCont?.children[0] as HTMLElement | undefined;
  const sideSection = sectionCont?.children[0] as HTMLElement | undefined;
  const contentCover = document.getElementById(contentCoverId);

  if (!mainCont || !sectionCont || !sideSection || !contentCover) {
    return;
  }

  if (window.innerWidth >= 768) {
    mainCont.style.width = "";
    sectionCont.style.transform = "";
    sectionCont.style.width = "";
    sideSection.style.boxShadow = "";
    contentCover.style.display = "";
    return;
  }

  const screenWidth = document
    .getElementById("header")!
    .getBoundingClientRect().width;
  const offsetWidth = sideSection.getBoundingClientRect().width + 8;
  const resultWidth = screenWidth + offsetWidth;

  mainCont.style.width = `${resultWidth}px`;
  sectionCont.style.width = `${resultWidth}px`;

  if (expandedOuter) {
    const shadowSize = screenWidth - offsetWidth;
    sectionCont.style.transform = `translate(0px, 0px)`;
    sideSection.style.boxShadow = `0 0 ${shadowSize}px ${
      shadowSize / 3
    }px rgba(0, 0, 0, 1)`;

    contentCover.style.left = `${offsetWidth}px`;
    contentCover.style.display = "block";
  } else {
    sectionCont.style.transform = `translate(-${offsetWidth}px, 0px)`;
    sideSection.style.boxShadow = "";
    contentCover.style.display = "";
  }

  setTimeout(() => {
    sectionCont.style.transition = "transform 150ms ease-in-out";
  }, 16);
}

export default function MultiMenuContainer({
  id: idPrefix,
  sideBarChild,
  mainContentChild,
}: {
  id: string;
  sideBarChild: ReactNode;
  mainContentChild: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  mainContainerId = idPrefix + "-container";
  contentCoverId = idPrefix + "-content-cover";

  useEffect(() => {
    expandedOuter = expanded;
    updateSize();
  }, [expanded]);

  return (
    <div id={mainContainerId} className="flex flex-grow">
      <div className="flex flex-row gap-2 flex-grow lg:gap-4">
        <ContentContainer className="flex-shrink-0 pt-14 md:pt-2">
          {sideBarChild}
        </ContentContainer>

        <ContentContainer className="flex-grow pt-14 md:pt-2 -z-10 md:z-0">
          {mainContentChild}
        </ContentContainer>
      </div>

      <div
        id="expand-button"
        className="fixed left-0 -top-full z-20 w-full flex justify-center md:hidden"
      >
        <div
          onClick={() => setExpanded(!expanded)}
          className="group/expand-button cursor-pointer rounded-xl bg-main-light-2 h-10 w-20 p-0.5 hover:bg-main-light-3 hover:shadow-main-content-1"
          style={{
            transition:
              "background-color 150ms ease-in-out, box-shadow 150ms ease-in-out",
          }}
        >
          <IconMenu className="fill-gray-600 size-full transition-main group-hover/expand-button:fill-gray-800" />
        </div>
      </div>

      <div
        id={contentCoverId}
        className="hidden cursor-pointer bg-transparent fixed top-0 size-full"
        onClick={() => setExpanded(false)}
      ></div>
    </div>
  );
}
