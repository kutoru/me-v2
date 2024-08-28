import "./Footer.css";
import { ReactComponent as IconGitHub } from "./github.svg";
import { ReactComponent as IconMail } from "./mail.svg";

export default function Footer() {
  return (
    <div className="footer">
      <div className="separator-big" />
      <div className="footer-item-icon">
        <a href="https://github.com/kutoru/me-v2">
          <IconGitHub className="icon" />
        </a>
      </div>
      <div className="footer-item-icon">
        <a href="mailto:kutoru.work@gmail.com">
          <IconMail className="icon" />
        </a>
      </div>
      <div className="footer-item-text">Hosted via GitHub Pages</div>
    </div>
  );
}
