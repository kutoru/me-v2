import MultiMenuContainer from "./MultiMenuContainer";
import projectData from "../static/projects.json";
import { ReactElement, useEffect, useState } from "react";
import ProjectData from "../types/ProjectData";
import { useLocation } from "react-router-dom";

const projects = projectData as ProjectData[];
projects.forEach((value) => {
  value.text = formatText(value.text, value.skills);
});

function formatText(text: string, skills: string[]): string {
  let textLower = text.toLowerCase();
  const prefix = '<span class="text-main-light-2">';
  const postfix = "</span>";

  skills
    .map((value) => value.toLowerCase())
    .forEach((skill) => {
      let lastIndex = -1;

      while (true) {
        const startIndex = textLower.indexOf(skill, lastIndex + 1);
        if (startIndex === -1) {
          break;
        }

        const endIndex = startIndex + skill.length;

        if (!isFullWord(textLower, startIndex, endIndex)) {
          lastIndex = startIndex;
          continue;
        }

        text =
          text.slice(0, startIndex) +
          prefix +
          text.slice(startIndex, endIndex) +
          postfix +
          text.slice(endIndex);

        textLower =
          textLower.slice(0, startIndex) +
          prefix +
          postfix +
          textLower.slice(startIndex);

        lastIndex = startIndex + prefix.length + postfix.length;
      }
    });

  return text
    .split("\n")
    .map((value) => "&emsp;" + value)
    .join("<br>");
}

function isFullWord(
  text: string,
  startIndex: number,
  endIndex: number
): boolean {
  let startIsValid = false;
  let endIsValid = false;

  const allowedChars = " .,()";

  if (startIndex === 0 || allowedChars.includes(text.charAt(startIndex - 1))) {
    startIsValid = true;
  }

  if (
    endIndex === text.length ||
    allowedChars.includes(text.charAt(endIndex))
  ) {
    endIsValid = true;
  }

  return startIsValid && endIsValid;
}

export default function Projects({
  headerRect,
  footerRect,
}: {
  headerRect?: DOMRect;
  footerRect?: DOMRect;
}) {
  const [navExpanded, setNavExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (location.hash) {
      const headerId = location.hash.slice(1);

      setTimeout(() => {
        navigateToHeader(headerId);
      }, 10);
    }
  }, [location]);

  useEffect(() => {
    function handleScroll() {
      const headers = projects
        .map((value) => {
          const id = encodeURI(value.name);
          const top = document.getElementById(id)?.getBoundingClientRect().top;
          return { id, top };
        })
        .filter((value) => {
          return value.top !== undefined;
        });

      if (headers.length !== projects.length || projects.length === 0) {
        return;
      }

      const closest = headers.sort((a, b) => {
        return Math.abs(a.top!) - Math.abs(b.top!);
      })[0];

      const oldLocation = window.location.toString();
      const newLocation = oldLocation.split("#")[0] + "#" + closest.id;
      if (oldLocation !== newLocation) {
        window.history.replaceState(null, "", newLocation);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          onClick={() => navigateToHeader(encodeURI(project.name))}
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
            id={encodeURI(project.name)}
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
          <div dangerouslySetInnerHTML={{ __html: project.text }} />
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
