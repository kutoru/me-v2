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
  return (
    <div className="header">
      <div>About me</div>
      <div>Projects</div>
      <div>
        <a href="https://github.com/kutoru">My GitHub profile</a>
      </div>
    </div>
  );
}
