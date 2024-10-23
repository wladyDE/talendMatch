import { ActiveFilters, SkillFilter } from '../../features/activeFilters/activeFiltersSlice';
import { EmployeeSkill} from '../../features/currentUser/currentUserSlice';
import { type Level } from '../../app/services/levels';
import { ThemeMode } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import { LevelType } from './LevelSelect';
import { Skill } from '../../features/skills/skillsSlice';

export const getColorForLevel = (index: number, theme: ThemeMode, levels: Level[]) : string => {
    const styles = currentStyles(theme);

    const colorStart = styles.level.startColor;
    const colorEnd = styles.level.endColor;
    const ratio = index / (levels.length - 1);
    const mix = (start: number, end: number) => Math.round(start + ratio * (end - start));

    const startRGB = colorStart.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [0, 0, 0];
    const endRGB = colorEnd.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [0, 0, 0];

    const mixedRGB = startRGB.map((start, i) => mix(start, endRGB[i]));

    return `rgb(${mixedRGB.join(',')})`;
};

export const getSelectedLevel = (
    value: LevelType,
    skillId: string,
    activeFilters: SkillFilter[],
    levels: Level[]
): number => {
    if (value.type === 'USER' && 'user' in value && value.user) {
        const userSkill = value.user.employeeSkills.find(
            (employeeSkill: EmployeeSkill) => employeeSkill.skill.skillId === +skillId);
        return userSkill ? levels.findIndex(level => level.levelId === userSkill.level.levelId) + 1 : 0;
    } else {
        const activeFilter = activeFilters.find(filter => filter.skillId === skillId);
        return activeFilter ? levels.findIndex(level => level.levelId === activeFilter.levelId) + 1 : 0;
    }
};

export const isActiveSkill = (
    skill : Skill,
    value : LevelType,
    isNotCurrentUser : boolean,
    activeFilters : ActiveFilters
) : boolean => {
    if(value.type === 'USER' && isNotCurrentUser){
        const activeSkill = activeFilters.skillFilters.find(activeFilter => 
            activeFilter.skillId === skill.skillId.toString() 
        )

        if(activeSkill){
            return !!value.user?.employeeSkills.some(employeeSkill => 
                employeeSkill.skill.skillId.toString() === activeSkill.skillId
                && parseInt(employeeSkill.level.levelId) >= parseInt(activeSkill.levelId))
        }
    }
    return false
}