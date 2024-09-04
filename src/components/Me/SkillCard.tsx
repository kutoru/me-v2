import SkillData from "../../types/SkillData";

export default function SkillCard({ skill }: { skill: SkillData }) {
  return (
    <div className="group/skill bg-main-dark-2 mt-2 rounded-xl px-2 pb-2 pt-1 md:mt-4 transition-main hover:shadow-skill-container">
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
}
