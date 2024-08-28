import { ReactElement, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

document.addEventListener("DOMContentLoaded", (_) => changeTopMargin(false));
window.addEventListener("resize", (_) => changeTopMargin(false));

let header: Element | undefined = undefined;
let content: ElementCSSInlineStyle | undefined = undefined;
let lastHeight = 0;

function changeTopMargin(force: boolean) {
  if (!header || force) {
    header = document.getElementsByClassName("header")[0];
  }
  if (!header) {
    return;
  }

  const height = header.getBoundingClientRect().height;
  if (height === lastHeight && !force) {
    return;
  }

  if (!content || force) {
    content = document.getElementsByClassName(
      "content"
    )[0] as unknown as ElementCSSInlineStyle;
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
    <div className="app">
      <Header />
      <div className="content">{content}</div>
      <Footer />
    </div>
  );
}
