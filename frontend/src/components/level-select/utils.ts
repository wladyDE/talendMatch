import { SkillFilter } from '../../features/activeFilters/activeFiltersSlice';
import { EmployeeSkill, IUser } from '../../features/currentUser/currentUserSlice';
import { type Level } from '../../app/services/levels';
import { ThemeMode } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';

export const getColorForLevel = (index: number, theme: ThemeMode, levels: Level[]) => {
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
    value: string,
    skillId: string,
    currentUser: IUser,
    activeFilters: SkillFilter[],
    levels: Level[]
): number => {
    if (value === 'USER') {
        const userSkill = currentUser.employeeSkills.find(
            (employeeSkill: EmployeeSkill) => employeeSkill.skill.skillId === +skillId);
        return userSkill ? levels.findIndex(level => level.levelId === userSkill.level.levelId) + 1 : 0;
    } else {
        const activeFilter = activeFilters.find(filter => filter.skillId === skillId);
        return activeFilter ? levels.findIndex(level => level.levelId === activeFilter.levelId) + 1 : 0;
    }
};