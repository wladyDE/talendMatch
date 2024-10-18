import { Skill } from "../../features/skills/skillsSlice";

export const groupSkillsBySubcategory = (skills: Skill[]) => {
  return skills.reduce((acc, skill) => {
    const subcategory = skill.skillSubcategory.skillSubcategoryName;
    if (!acc[subcategory]) {
      acc[subcategory] = [];
    }
    acc[subcategory].push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });
};
