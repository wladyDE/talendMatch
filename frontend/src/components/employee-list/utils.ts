import { ActiveFilters } from "../../features/activeFilters/activeFiltersSlice";
import { IUser } from "../../features/currentUser/currentUserSlice";

export const filterEmployees = (employees: IUser[], activeFilters: ActiveFilters) : IUser[] => {
    let filteredEmployees = employees;

    if (activeFilters.nameFilter) {
      filteredEmployees = filteredEmployees.filter(employee =>
        employee.displayName.toLowerCase().includes(activeFilters.nameFilter.toLowerCase())
      );
    }

    if(activeFilters.costcenterFilter.id !== "0"){
      filteredEmployees = filteredEmployees.filter(employee => 
        employee.groups.includes(activeFilters.costcenterFilter)
      )
    }

    if (activeFilters.skillFilters.length > 0) {
      filteredEmployees = filteredEmployees.filter(employee =>
        activeFilters.skillFilters.every(filter =>
          employee.employeeSkills.some(employeeSkill =>
            parseInt(filter.skillId) === employeeSkill.skill.skillId && employeeSkill.level.levelId >= filter.levelId
          )
        )
      );
    }    
    
    return filteredEmployees
}