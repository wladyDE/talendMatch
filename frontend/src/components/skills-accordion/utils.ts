import { ActiveFilters } from "../../features/activeFilters/activeFiltersSlice";
import { IEmployee } from "../../features/currentUser/currentUserSlice";
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
  activeFilters: ActiveFilters,
  user: IEmployee | undefined,
  subcategoryName: string
) => {
  let filterCount = 0

  activeFilters.skillFilters.forEach(activeFilter => {
    console.log(user);
    
    user?.employeeSkills.forEach(employeeSkill => {
      if (employeeSkill.skill.skillSubcategory.skillSubcategoryName === subcategoryName
        && employeeSkill.skill.skillId === parseInt(activeFilter.skillId)
        && parseInt(employeeSkill.level.levelId) >= parseInt(activeFilter.levelId)
      ) {
        if(subcategoryName === 'Backend Entwicklung') {
          console.log(employeeSkill.skill.skillName);
        }
        
        filterCount++
      }
    })
  })

  return filterCount
}


