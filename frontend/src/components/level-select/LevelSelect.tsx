import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { type Level } from '../../features/level/levelSlice';
import { selectTheme } from '../../features/theme/themeSlice';
import { addFilter, selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import { selectLevels } from '../../features/level/levelSlice';
import { getColorForLevel } from './levelColor';
import './levelSelect.css';

interface SkillLevelSelectorProps {
    skill: string;
    showAll: boolean;
}

const LevelSelect: React.FC<SkillLevelSelectorProps> = ({ skill, showAll }) => {
    const [hoveredLevel, setHoveredLevel] = useState<number>(0);
    const activeFilters = useSelector(selectActiveFilters);
    const dispatch = useDispatch();
    const levels = useSelector(selectLevels)
    const theme = useSelector(selectTheme);

    const activeFilter = activeFilters.find(filter => filter.skill === skill);
    const selectedLevel = activeFilter
        ? levels.findIndex(level => level.levelName === activeFilter.levelName) + 1
        : 0;

    const handleClick = (levelName: Level["levelName"]) => {
        dispatch(addFilter({ levelName, skill }));
    };

    return (
        <>
            <label>{skill}</label>
            <div className="d-flex align-items-center">
                {levels.map((level, index) => (
                    (showAll || index + 1 <= selectedLevel) && (
                        <div
                            key={index}
                            title={level.levelName}
                            onMouseEnter={() => setHoveredLevel(index + 1)}
                            onMouseLeave={() => setHoveredLevel(0)}
                            className='level'
                            style={{
                                backgroundColor:
                                    index + 1 <= (hoveredLevel || selectedLevel)
                                        ? getColorForLevel(index, theme, levels)
                                        : '#e9ecef',
                            }}
                            onClick={() => handleClick(level.levelName)}
                        />
                    )
                ))}
            </div>
        </>
    );
};

export default LevelSelect;
