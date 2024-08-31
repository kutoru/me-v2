import { ReactComponent as IconGitHub } from "../static/github.svg";
import { ReactComponent as IconMail } from "../static/mail.svg";

export default function Footer() {
  return (
    <div className="group/footer text-center bg-main-dark-2 z-20 transition-main hover:shadow-footer">
      <div className="h-1 bg-main-light-2 transition-main group-hover/footer:shadow-separator" />
      <div className="mt-2 inline-block">
        <a href="https://github.com/kutoru/me-v2">
          <IconGitHub className="cursor-pointer size-12 fill-gray-300 transition-main hover:fill-gray-500 md:size-14" />
        </a>
      </div>
      <div className="mt-2 ms-2 inline-block">
        <a href="mailto:kutoru.work@gmail.com">
          <IconMail className="cursor-pointer size-12 fill-gray-300 transition-main hover:fill-gray-500 md:size-14" />
        </a>
      </div>
      <div className="text-base text-gray-300 mx-2 mb-2 md:text-xl">
        Hosted via GitHub Pages
      </div>
    </div>
  );
}
