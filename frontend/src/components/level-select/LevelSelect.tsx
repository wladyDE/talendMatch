import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import { addFilter, selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import { type Level } from '../../features/activeFilters/activeFiltersSlice';
import './levelSelect.css';

interface SkillLevelSelectorProps {
    skill: string;
    levels: string[];
    showAll: boolean;
}

const LevelSelect: React.FC<SkillLevelSelectorProps> = ({ skill, levels, showAll }) => {
    const [hoveredLevel, setHoveredLevel] = useState<number>(0);
    const theme = useSelector(selectTheme);
    const activeFilters = useSelector(selectActiveFilters);
    const styles = currentStyles(theme);
    const dispatch = useDispatch();

    const activeFilter = activeFilters.find(filter => filter.skill === skill);
    const selectedLevel = activeFilter ? levels.indexOf(activeFilter.level) + 1 : 0;

    const handleClick = (level: Level, index: number) => {
        dispatch(addFilter({ level, skill }));
    };

    const getColorForLevel = (index: number) => {
        const colorStart = styles.level.startColor;
        const colorEnd = styles.level.endColor;
        const ratio = index / (levels.length - 1);
        const mix = (start: number, end: number) => Math.round(start + ratio * (end - start));

        const startRGB = colorStart.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [0, 0, 0];
        const endRGB = colorEnd.match(/\w\w/g)?.map((x) => parseInt(x, 16)) || [0, 0, 0];

        const mixedRGB = startRGB.map((start, i) => mix(start, endRGB[i]));

        return `rgb(${mixedRGB.join(',')})`;
    };

    return (
        <>
            <label>{skill}</label>
            <div className="d-flex align-items-center">
                {levels.map((level, index) => (
                    (showAll || index + 1 <= selectedLevel) && (
                        <div
                            key={index}
                            title={level}
                            onMouseEnter={() => setHoveredLevel(index + 1)}
                            onMouseLeave={() => setHoveredLevel(0)}
                            className='level'
                            style={{
                                backgroundColor:
                                    index + 1 <= (hoveredLevel || selectedLevel)
                                        ? getColorForLevel(index)
                                        : '#e9ecef',
                            }}
                            onClick={() => handleClick(level as Level, index)}
                        />
                    )
                ))}
            </div>
        </>
    );
};

export default LevelSelect;
