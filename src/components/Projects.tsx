import MultiMenuContainer from "./MultiMenuContainer";
import projectData from "../static/projects.json";
import { ReactElement, useState } from "react";
import ProjectData from "../types/ProjectData";

export default function Projects({
  headerRect,
  footerRect,
}: {
  headerRect?: DOMRect;
  footerRect?: DOMRect;
}) {
  const [navExpanded, setNavExpanded] = useState(false);
  const projects = projectData as ProjectData[];

  function mapNavigation(): ReactElement[] {
    const elements: ReactElement[] = [];

    projects.forEach((project, index) => {
      if (index !== 0) {
        elements.push(
          <div key={elements.length} className="bg-main-dark-1 h-0.5" />
        );
      }

      elements.push(
        <div
          key={elements.length}
          onClick={() => navigateToHeader(project.name)}
          className="cursor-pointer p-2 transition-main hover:text-gray-400 hover:bg-main-dark-1 first:rounded-t-lg last:rounded-b-lg"
        >
          {index + 1}. {project.name}
        </div>
      );
    });

    return elements;
  }

  function navigateToHeader(headerId: string) {
    const header = document.getElementById(headerId);
    if (!header) {
      return;
    }

    setNavExpanded(false);

    const headerTop = header.getBoundingClientRect().top;
    const headerPos = headerTop + window.scrollY;
    const directionIsUp = headerTop < 0;

    let offset = 16;
    if (directionIsUp) {
      offset += headerRect!.height;
      if (window.innerWidth < 768) {
        offset += 44;
      }
    }

    window.scrollTo({ top: headerPos - offset, behavior: "smooth" });
  }

  function mapProjects(): ReactElement[] {
    const elements: ReactElement[] = [];

    projects.forEach((project, index) => {
      if (index > 0) {
        elements.push(
          <div
            key={elements.length}
            className="w-full h-3 rounded-full bg-main-dark-1 my-6 md:my-8 transition-main group-hover/content-container:shadow-skill-container"
          />
        );
      }

      elements.push(
        <div key={elements.length}>
          <h1
            id={project.name}
            className="text-3xl font-semibold text-center mb-2 md:text-4xl"
          >
            {project.link ? (
              <a href={project.link}>{project.name}</a>
            ) : (
              project.name
            )}
          </h1>
          <div className="text-base text-gray-300 text-center cursor-default md:text-lg">
            {project.start_date} - {project.end_date}
          </div>
          <div className="mb-2 flex justify-center flex-wrap">
            {mapProjectSkills(project.skills)}
          </div>
          <div className="bg-main-dark-2 rounded-xl p-2 mb-2 cursor-default transition-main group-hover/content-container:shadow-skill-container">
            {project.description}
          </div>
          <div>{project.text}</div>
        </div>
      );
    });

    return elements;
  }

  function mapProjectSkills(skills: string[]): ReactElement[] {
    const elements: ReactElement[] = [];

    skills.forEach((skill) => {
      elements.push(
        <div
          key={elements.length}
          className="py-1 px-2 me-2 mt-2 rounded-xl bg-main-dark-2 text-base cursor-default last:me-0 md:text-lg transition-main hover:shadow-skill-container"
        >
          {skill}
        </div>
      );
    });

    return elements;
  }

  return (
    <MultiMenuContainer
      headerRect={headerRect}
      footerRect={footerRect}
      expanded={navExpanded}
      setExpanded={setNavExpanded}
      sideBarChild={
        <div>
          <div className="text-xl text-center font-semibold md:text-2xl">
            Navigation
          </div>
          <div className="rounded-lg bg-main-dark-2 mt-2 md:mt-4 transition-main hover:shadow-main-content-1">
            {mapNavigation()}
          </div>
        </div>
      }
      mainContentChild={<div>{mapProjects()}</div>}
    />
  );
}
