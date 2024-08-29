import { ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer";

document.addEventListener("DOMContentLoaded", (_) => changeTopMargin(false));
window.addEventListener("resize", (_) => changeTopMargin(false));

let header: HTMLElement | null = null;
let content: HTMLElement | null = null;
let lastHeight = 0;

function changeTopMargin(force: boolean) {
  if (!header || force) {
    header = document.getElementById("header");
  }
  if (!header) {
    return;
  }

  const height = header.getBoundingClientRect().height;
  if (height === lastHeight && !force) {
    return;
  }

  if (!content || force) {
    content = document.getElementById("content");
  }
  if (!content) {
    return;
  }

  lastHeight = height;
  content.style.marginTop = `calc(${height}px + var(--top-body-spacing))`;
}

export default function App({ content }: { content: ReactElement }) {
  const location = useLocation();

  useEffect(() => {
    changeTopMargin(true);
  }, [location]);

  return (
    <div className="flex flex-col min-h-dvh bg-main-dark-1 font-main">
      <Header />
      <div
        id="content"
        className="flex-grow flex text-main-light-1 text-2xl w-full lg:w-content-lg lg:mx-auto lg:mb-4 xl:w-content-xl"
      >
        {content}
      </div>
      <Footer />
    </div>
  );
}
