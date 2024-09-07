import { ReactElement, useEffect, useState } from "react";
import MultiMenuContainer from "../MultiMenuContainer";
import skillData from "../../static/skills.json";
import meSectionData from "../../static/me-sections.json";
import SkillData from "../../types/SkillData";
import MeSectionData from "../../types/MeSectionData";
import SkillCard from "./SkillCard";
import { useLocation } from "react-router-dom";
import { ReactComponent as IconQuestion } from "../../static/question.svg";

const sections = meSectionData as MeSectionData[];
sections.forEach((value) => {
  value.text = formatText(value.text);
});

function formatText(text: string): string {
  return text
    .split("\n")
    .map((value) => "&emsp;" + value)
    .join("<br>");
}

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
          <div dangerouslySetInnerHTML={{ __html: section.text }} />
        </div>
      );
    });

    return elements;
  }

  function mapSkillInfoItems() {
    const items = [
      { step: 100, text: "know everything about it" },
      { step: 83, text: "very confident in it" },
      { step: 66, text: "pretty good at it" },
      { step: 50, text: "can use it" },
      { step: 33, text: "know it, but not confident" },
      { step: 16, text: "barely heard of it" },
      { step: 0, text: "don't know anything about it" },
    ];

    return items.map((item, index) => {
      return (
        <div key={index}>
          {index !== 0 && <div className="bg-gray-400 w-full h-px my-1" />}
          <span className="text-main-light-2 font-semibold">
            {item.step}%
          </span>{" "}
          - {item.text}
        </div>
      );
    });
  }

  return (
    <MultiMenuContainer
      headerRect={headerRect}
      footerRect={footerRect}
      expanded={skillsExpanded}
      setExpanded={setSkillsExpanded}
      sideBarChild={
        <div>
          <div className="flex gap-2">
            <div className="my-auto text-xl text-center font-semibold md:text-2xl">
              My technical skills
            </div>
            <div className="group/skill-info-btn relative size-7 flex justify-center items-center rounded-full bg-main-dark-2 my-auto md:size-8 transition-main hover:shadow-skill-container">
              <IconQuestion className="fill-main-light-1 size-4 transition-main group-hover/skill-info-btn:fill-gray-400 md:size-5" />
              <div className="invisible z-10 shadow-main-content-2 opacity-0 p-2 text-base absolute bg-[#000000e5] w-40 rounded-md right-0 top-full transition-main md:text-lg md:w-48 group-hover/skill-info-btn:opacity-100 group-hover/skill-info-btn:visible">
                {mapSkillInfoItems()}
              </div>
            </div>
          </div>
          {mapSkills()}
        </div>
      }
      mainContentChild={<div>{mapSections()}</div>}
    />
  );
}
