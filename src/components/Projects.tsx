import MultiMenuContainer from "./MultiMenuContainer";

export default function Projects() {
  return (
    <MultiMenuContainer
      id="projects"
      sideBarChild={"Navigation here"}
      mainContentChild={
        <h1 className="text-4xl font-semibold text-center">
          Hello there, these are my projects
        </h1>
      }
    />
  );
}
