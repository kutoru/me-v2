import { ReactNode, useEffect, useRef, useState } from "react";
import ContentContainer from "./ContentContainer";
import { ReactComponent as IconMenu } from "../static/menu.svg";

function getSidePaddingTop(
  { height: headerHeight, top: headerTop }: DOMRect,
  extraPadding: number
): number {
  let padding = headerHeight + headerTop;
  if (padding < 0) {
    padding = 0;
  }

  padding += extraPadding;

  return padding;
}

function getSidePaddingBottom(
  { top: footerTop }: DOMRect,
  extraPadding: number
): number {
  let padding = extraPadding;
  if (footerTop < window.innerHeight) {
    padding += window.innerHeight - footerTop;
  }

  return padding;
}

export default function MultiMenuContainer({
  headerRect,
  footerRect,
  expanded,
  setExpanded,
  sideBarChild,
  mainContentChild,
}: {
  headerRect?: DOMRect;
  footerRect?: DOMRect;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  sideBarChild: ReactNode;
  mainContentChild: ReactNode;
}) {
  const refSideContainer = useRef<HTMLDivElement>(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [mainContainerTransform, setMainContainerTransform] = useState("");
  const [mainContainerPaddingLeft, setMainContainerPaddingLeft] = useState("");
  const [mainContainerTransition, setMainContainerTransition] = useState("");
  const [contentCoverLeft, setContentCoverLeft] = useState("");
  const [contentCoverBackgroundColor, setContentCoverBackgroundColor] =
    useState("");
  const [contentCoverDisplay, setContentCoverDisplay] = useState("");

  const [sideContainerExtraPadding, setSideContainerExtraPadding] = useState(0);

  function updatePosition() {
    const offsetWidth = refSideContainer.current?.getBoundingClientRect().width;
    if (offsetWidth === undefined) {
      return;
    }

    if (windowSize.width >= 768) {
      setMainContainerTransform("");
      setMainContainerPaddingLeft(`${offsetWidth}px`);

      setContentCoverLeft("");
      setContentCoverBackgroundColor("");
      setContentCoverDisplay("");

      return;
    }

    setMainContainerPaddingLeft("");

    if (expanded) {
      setMainContainerTransform(`translate(${offsetWidth}px)`);

      setContentCoverDisplay("block");
      setContentCoverLeft(`${offsetWidth}px`);
      setTimeout(() => {
        setContentCoverBackgroundColor("rgba(0, 0, 0, 0.4)");
      }, 150);
    } else {
      setMainContainerTransform("");

      setContentCoverLeft("");
      setContentCoverBackgroundColor("");
      setContentCoverDisplay("");
    }

    setTimeout(() => {
      setMainContainerTransition("transform 150ms ease-in-out");
    }, 10);
  }

  useEffect(() => {
    function handleResize() {
      setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updatePosition();

    const newExtraPadding = window.innerWidth >= 1024 ? 16 : 0;
    if (newExtraPadding !== sideContainerExtraPadding) {
      setSideContainerExtraPadding(newExtraPadding);
    }
  }, [windowSize.width, sideContainerExtraPadding, updatePosition]);

  useEffect(() => {
    updatePosition();
  }, [expanded, updatePosition]);

  return (
    <div className="flex flex-grow">
      <div
        ref={refSideContainer}
        className="fixed pe-2 h-dvh top-0 lg:pe-4"
        style={{
          paddingTop: headerRect
            ? `${getSidePaddingTop(headerRect, sideContainerExtraPadding)}px`
            : "",
          paddingBottom: footerRect
            ? `${getSidePaddingBottom(
                footerRect!,
                sideContainerExtraPadding
              )}px`
            : "",
        }}
      >
        <ContentContainer
          className="h-full overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          {sideBarChild}
        </ContentContainer>
      </div>

      <div
        className="flex flex-row flex-grow"
        style={{
          transform: mainContainerTransform,
          paddingLeft: mainContainerPaddingLeft,
          transition: mainContainerTransition,
        }}
      >
        <ContentContainer className="flex-grow pt-14 z-10 md:pt-2">
          {mainContentChild}
        </ContentContainer>
      </div>

      <div
        className="fixed left-0 -top-full z-20 w-full flex justify-center md:hidden pointer-events-none"
        style={{
          transition: "transform 150ms ease-in-out",
          transform: mainContainerTransform,
          top: headerRect
            ? `calc(${headerRect.height}px + 0.5rem + ${headerRect.top}px)`
            : "",
        }}
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
        className="hidden cursor-pointer bg-transparent fixed left-0 top-0 h-dvh w-full transition-main"
        onClick={() => setExpanded(false)}
        style={{
          left: contentCoverLeft,
          backgroundColor: contentCoverBackgroundColor,
          display: contentCoverDisplay,
        }}
      ></div>
    </div>
  );
}
