import { ReactElement } from "react";
import MultiMenuContainer from "./MultiMenuContainer";
import skillData from "../static/skills.json";
import meSectionData from "../static/me-sections.json";
import SkillData from "../types/SkillData";
import MeSectionData from "../types/MeSectionData";

export default function Me() {
  const skills = skillData as SkillData[];
  const sections = meSectionData as MeSectionData[];

  function mapSkills(): ReactElement[] {
    const elements: ReactElement[] = [];

    skills.forEach((skill) => {
      elements.push(
        <div className="group/skill grid grid-cols-2 w-full bg-main-dark-2 my-2 rounded-xl p-2 transition-main hover:shadow-skill-container">
          <div className="pe-2 text-xl cursor-default transition-main group-hover/skill:drop-shadow-skill">
            {skill.name}
          </div>
          <div className="rounded-lg bg-main-light-3">
            <div
              className="bg-main-light-2 h-full rounded-s-lg transition-main group-hover/skill:shadow-skill-bar"
              style={{ width: `${skill.amount}%` }}
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
          <div className="w-full h-3 rounded-full bg-main-dark-1 my-8 transition-main group-hover/content-container:shadow-skill-container" />
        );
      }

      elements.push(
        <div>
          <h1 className="text-4xl font-semibold text-center mb-4">
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
      id="me"
      sideBarChild={
        <div>
          <div className="text-center font-semibold">My technical skills</div>
          {mapSkills()}
        </div>
      }
      mainContentChild={<div>{mapSections()}</div>}
    />
  );
}
