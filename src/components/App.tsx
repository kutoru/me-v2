import { ReactElement, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import PageType from "../types/PageType";
import Me from "./Me";
import Projects from "./Projects";
import ErrorPage from "./ErrorPage";

export default function App({ pageType }: { pageType: PageType }) {
  const [headerRect, updateHeaderRect] = useState<DOMRect>();
  const [footerRect, updateFooterRect] = useState<DOMRect>();

  function getCurrentPage(): ReactElement {
    switch (pageType) {
      case PageType.Me:
        return <Me headerRect={headerRect} footerRect={footerRect} />;
      case PageType.Projects:
        return <Projects headerRect={headerRect} footerRect={footerRect} />;
      case PageType.Error:
        return <ErrorPage />;
      default:
        return <ErrorPage customMessage="Not Found" />;
    }
  }

  return (
    <div className="flex flex-col min-h-dvh bg-main-dark-1 font-main">
      <Header headerRect={headerRect} updateHeaderRect={updateHeaderRect} />
      <div
        style={{
          marginTop: headerRect
            ? `calc(${headerRect.height}px + var(--top-body-spacing))`
            : "",
        }}
        className="flex-grow flex text-main-light-1 text-lg w-full lg:w-content-lg lg:mx-auto lg:mb-4 xl:w-content-xl md:text-2xl"
      >
        {getCurrentPage()}
      </div>
      <Footer updateFooterRect={updateFooterRect} />
    </div>
  );
}
