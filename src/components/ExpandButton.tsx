import { ReactComponent as IconMenu } from "../static/menu.svg";
export default function ExpandButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      id="expand-button"
      className="fixed left-0 -top-full z-20 w-full flex justify-center md:hidden"
    >
      <div
        onClick={onClick}
        className="group/expand-button cursor-pointer rounded-xl bg-main-light-2 h-10 w-24 p-0.5 hover:bg-main-light-3 hover:shadow-main-content-1"
        style={{
          transition:
            "background-color 150ms ease-in-out, box-shadow 150ms ease-in-out",
        }}
      >
        <IconMenu className="fill-gray-600 size-full transition-main group-hover/expand-button:fill-gray-800" />
      </div>
    </div>
  );
}
