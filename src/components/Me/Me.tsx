import { ReactElement, useEffect, useState } from "react";
import MultiMenuContainer from "../MultiMenuContainer";
import skillData from "../../static/skills.json";
import meSectionData from "../../static/me-sections.json";
import SkillData from "../../types/SkillData";
import MeSectionData from "../../types/MeSectionData";
import SkillCard from "./SkillCard";
import { useLocation } from "react-router-dom";

export default function Me({
  headerRect,
  footerRect,
}: {
  headerRect?: DOMRect;
  footerRect?: DOMRect;
}) {
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  const location = useLocation();

  const skills = skillData as SkillData[];
  const sections = meSectionData as MeSectionData[];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location]);

  function mapSkills(): ReactElement[] {
    const elements: ReactElement[] = [];

    skills
      .sort((a, b) => b.proficiency - a.proficiency)
      .forEach((skill) => {
        elements.push(<SkillCard key={elements.length} skill={skill} />);
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
