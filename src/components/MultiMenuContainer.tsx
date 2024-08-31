import { ReactNode, useEffect } from "react";
import ContentContainer from "./ContentContainer";
import { ReactComponent as IconMenu } from "../static/menu.svg";

window.addEventListener("scroll", () => updateHeight());
window.addEventListener("resize", () => {
  const newHeight = window.innerHeight;
  const newWidth = window.innerWidth;

  setTimeout(() => {
    if (newWidth !== lastWidth || newHeight !== lastHeight) {
      lastHeight = window.innerHeight;
      updateHeight();
    }

    if (newWidth !== lastWidth) {
      lastWidth = newWidth;
      updatePosition();
    }
  }, 150);
});

let lastWidth = 0;
let lastHeight = 0;

let mainContainerId = "";
let sideContainerId = "";
let contentCoverId = "";
let expandedOuter = false;

function updateHeight() {
  const header = document.getElementById("header");
  const sideContainer = document.getElementById(sideContainerId);
  const footer = document.getElementById("footer");

  if (!header || !sideContainer || !footer) {
    return;
  }

  let extraMargin = 0;
  if (window.innerWidth >= 1024) {
    extraMargin = 16;
  }

  const { height: headerHeight, top: headerPos } =
    header.getBoundingClientRect();

  let topMargin = headerHeight + headerPos;
  if (topMargin < 0) {
    topMargin = 0;
  }

  topMargin += extraMargin;

  const footerPos = footer.getBoundingClientRect().top;

  let bottomMargin = extraMargin;
  if (footerPos < window.innerHeight) {
    bottomMargin += window.innerHeight - footerPos;
  }

  sideContainer.style.paddingTop = `${topMargin}px`;
  sideContainer.style.paddingBottom = `${bottomMargin}px`;
}

function updatePosition() {
  const mainContainer = document.getElementById(mainContainerId);
  const sideContainer = document.getElementById(sideContainerId);
  const contentCover = document.getElementById(contentCoverId);
  const expandButton = document.getElementById("expand-button");

  if (!mainContainer || !sideContainer || !contentCover || !expandButton) {
    return;
  }

  const offsetWidth = sideContainer.getBoundingClientRect().width;

  if (window.innerWidth >= 768) {
    mainContainer.style.paddingLeft = `${offsetWidth}px`;
    mainContainer.style.transform = "";

    contentCover.style.left = "";
    contentCover.style.backgroundColor = "";
    contentCover.style.display = "";

    expandButton.style.transform = "";
    return;
  }

  mainContainer.style.paddingLeft = "";

  if (expandedOuter) {
    mainContainer.style.transform = `translate(${offsetWidth}px, 0px)`;

    contentCover.style.display = "block";
    contentCover.style.left = `${offsetWidth}px`;
    setTimeout(() => {
      contentCover.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    }, 150);

    expandButton.style.transform = `translate(${offsetWidth}px, 0px)`;
  } else {
    mainContainer.style.transform = "";

    contentCover.style.left = "";
    contentCover.style.backgroundColor = "";
    contentCover.style.display = "";

    expandButton.style.transform = "";
  }

  setTimeout(() => {
    mainContainer.style.transition = "transform 150ms ease-in-out";
  }, 10);
}

export default function MultiMenuContainer({
  id: idPrefix,
  expanded,
  setExpanded,
  sideBarChild,
  mainContentChild,
}: {
  id: string;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  sideBarChild: ReactNode;
  mainContentChild: ReactNode;
}) {
  mainContainerId = idPrefix + "-main-container";
  sideContainerId = idPrefix + "-side-container";
  contentCoverId = idPrefix + "-content-cover";

  useEffect(() => {
    expandedOuter = expanded;
    updatePosition();
    updateHeight();
  }, [expanded]);

  return (
    <div className="flex flex-grow">
      <div id={sideContainerId} className="fixed pe-2 h-dvh top-0 lg:pe-4">
        <ContentContainer
          className="h-full overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          {sideBarChild}
        </ContentContainer>
      </div>

      <div id={mainContainerId} className="flex flex-row flex-grow">
        <ContentContainer className="flex-grow pt-14 z-10 md:pt-2">
          {mainContentChild}
        </ContentContainer>
      </div>

      <div
        id="expand-button"
        className="fixed left-0 -top-full z-20 w-full flex justify-center md:hidden pointer-events-none"
        style={{ transition: "transform 150ms ease-in-out" }}
      >
        <div
          onClick={() => setExpanded(!expanded)}
          className="group/expand-button cursor-pointer pointer-events-auto rounded-xl bg-main-light-2 h-10 w-20 p-0.5 hover:bg-main-light-3 hover:shadow-main-content-1"
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
        className="hidden cursor-pointer bg-transparent fixed left-0 top-0 h-dvh w-full transition-main"
        onClick={() => setExpanded(false)}
      ></div>
    </div>
  );
}
