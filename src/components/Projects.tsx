import MultiMenuContainer from "./MultiMenuContainer";
import projectData from "../static/projects.json";
import { ReactElement } from "react";
import ProjectData from "../types/ProjectData";

export default function Projects() {
  const projects = projectData as ProjectData[];

  function mapNavigation(): ReactElement[] {
    const elements: ReactElement[] = [];

    projects.forEach((project, index) => {
      elements.push(
        <div key={elements.length}>
          {index + 1}. <a href={"#" + project.name}>{project.name}</a>
        </div>
      );
    });

    return elements;
  }

  function mapProjects(): ReactElement[] {
    const elements: ReactElement[] = [];

    projects.forEach((project, index) => {
      if (index > 0) {
        elements.push(
          <div
            key={elements.length}
            className="w-full h-3 rounded-full bg-main-dark-1 my-8 transition-main group-hover/content-container:shadow-skill-container"
          />
        );
      }

      elements.push(
        <div key={elements.length}>
          <h1
            id={project.name}
            className="text-4xl font-semibold text-center mb-2"
          >
            {project.link ? (
              <a href={project.link}>{project.name}</a>
            ) : (
              project.name
            )}
          </h1>
          <div className="text-lg text-gray-300 text-center">
            {project.start_date} - {project.end_date}
          </div>
          <div className="bg-main-dark-2 rounded-xl p-2 my-2 cursor-default transition-main group-hover/content-container:shadow-skill-container">
            {project.description}
          </div>
          <div>{project.text}</div>
        </div>
      );
    });

    return elements;
  }

  return (
    <MultiMenuContainer
      id="projects"
      sideBarChild={
        <div>
          <div className="text-center font-semibold">Navigation</div>
          {mapNavigation()}
        </div>
      }
      mainContentChild={<div>{mapProjects()}</div>}
    />
  );
}
