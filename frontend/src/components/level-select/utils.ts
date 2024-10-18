import { ActiveFilter } from '../../features/activeFilters/activeFiltersSlice';
import { IUser } from '../../features/currentUser/currentUserSlice';
import { Level } from '../../features/levels/levelsSlice';
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
    skill: string,
    currentUser: IUser,
    activeFilters: ActiveFilter[],
    levels: Level[]
): number => {
    if (value === 'USER') {
        const userSkill = currentUser.employeeSkills.find((filter: any) => filter.skill.skillName === skill);
        return userSkill ? levels.findIndex(level => level.levelName === userSkill.level.levelName) + 1 : 0;
    } else {
        const activeFilter = activeFilters.find(filter => filter.skill === skill);
        return activeFilter ? levels.findIndex(level => level.levelName === activeFilter.levelName) + 1 : 0;
    }
};