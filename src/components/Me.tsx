import { ReactElement, useState } from "react";
import MultiMenuContainer from "./MultiMenuContainer";
import skillData from "../static/skills.json";
import meSectionData from "../static/me-sections.json";
import SkillData from "../types/SkillData";
import MeSectionData from "../types/MeSectionData";

export default function Me({
  headerRect,
  footerRect,
}: {
  headerRect?: DOMRect;
  footerRect?: DOMRect;
}) {
  const [skillsExpanded, setSkillsExpanded] = useState(false);

  const skills = skillData as SkillData[];
  const sections = meSectionData as MeSectionData[];

  function mapSkills(): ReactElement[] {
    const elements: ReactElement[] = [];

    skills.forEach((skill) => {
      elements.push(
        <div
          key={elements.length}
          className="group/skill bg-main-dark-2 mt-2 rounded-xl px-2 pb-2 pt-1 md:mt-4 transition-main hover:shadow-skill-container"
        >
          <div className="text-center text-lg cursor-default md:text-xl transition-main group-hover/skill:drop-shadow-skill">
            {skill.name}
          </div>
          <div className="rounded-lg bg-main-light-3 h-2 mt-2 md:h-3">
            <div
              className="bg-main-light-2 h-full rounded-s-lg transition-main group-hover/skill:shadow-skill-bar"
              style={{ width: `${skill.proficiency}%` }}
            ></div>
          </div>
        </div>
      );
    });

    return elements;
  }

  function mapSections(): ReactElement[] {
    const elements: ReactElement[] = [];

    sections.forEach((section, index) => {
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
          <h1 className="text-2xl font-semibold text-center mb-2 md:mb-4 md:text-4xl">
            {section.title}
          </h1>
          {section.text}
        </div>
      );
    });

    return elements;
  }

  return (
    <MultiMenuContainer
      headerRect={headerRect}
      footerRect={footerRect}
      expanded={skillsExpanded}
      setExpanded={setSkillsExpanded}
      sideBarChild={
        <div>
          <div className="text-xl text-center font-semibold md:text-2xl">
            My technical skills
          </div>
          {mapSkills()}
        </div>
      }
      mainContentChild={<div>{mapSections()}</div>}
    />
  );
}
