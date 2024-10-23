import { ActiveFilters } from "../../features/activeFilters/activeFiltersSlice";
import { IUser } from "../../features/currentUser/currentUserSlice";
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

export const getFilterCount = (
  activeFilters : ActiveFilters,
  user : IUser | undefined,
  subcategoryName : string 
) => {
  let filterCount = 0

  activeFilters.skillFilters.forEach(activeFilter => {
    user?.employeeSkills.forEach(employeeSkill => {
      if (employeeSkill.skill.skillSubcategory.skillSubcategoryName === subcategoryName
        && employeeSkill.skill.skillId === parseInt(activeFilter.skillId)
        && parseInt(employeeSkill.level.levelId) >= parseInt(activeFilter.levelId)
      ) {
        filterCount++
      }
    })
  })

  return filterCount
}


