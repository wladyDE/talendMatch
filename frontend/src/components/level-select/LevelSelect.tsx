import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { type Level } from '../../features/levels/levelsSlice';
import { selectTheme } from '../../features/theme/themeSlice';
import { addFilter, selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import { selectLevels } from '../../features/levels/levelsSlice';
import { getColorForLevel, getSelectedLevel } from './utils';
import './levelSelect.css';
import { selectSkills } from '../../features/skills/skillsSlice';
import { addSkill, selectCurrentUser } from '../../features/currentUser/currentUserSlice';
import { useAddSkillToEmployeeMutation } from '../../app/services/currentUser';

export type LevelType = 'USER' | 'FILTER' | 'ACTIVE_FILTER'

interface SkillLevelSelectorProps {
    skill: string;
    showAll: boolean;
    value: LevelType
}

const LevelSelect: React.FC<SkillLevelSelectorProps> = ({ skill, showAll, value }) => {
    const [hoveredLevel, setHoveredLevel] = useState<number>(0);
    const dispatch = useDispatch();
    const activeFilters = useSelector(selectActiveFilters);
    const skills = useSelector(selectSkills)
    const levels = useSelector(selectLevels)
    const theme = useSelector(selectTheme);
    const currentUser = useSelector(selectCurrentUser)
    const [addSkillToEmployee] = useAddSkillToEmployeeMutation()

    let selectedLevel = getSelectedLevel(value, skill, currentUser, activeFilters, levels);
 
    const addActiveFilter = (levelName: Level["levelName"]) => {
        dispatch(addFilter({ levelName, skill }));
    };

    const addCurrentUserSkill = async (level: Level, skill: string) => {
        const currentSkill = skills.find(s => s.skillName === skill)!;

        try {
            await addSkillToEmployee({
                employeeId: currentUser.employeeId,
                skillId: +currentSkill.skillId,
                level: +level.levelId
            }).unwrap();
            dispatch(addSkill({ skill: currentSkill, level }));
        } catch (error) {
            console.error("Failed to add skill:", error);
        }
    };

    const handleLevelClick = (level: Level) => {
        if (value === 'USER') {
            addCurrentUserSkill(level, skill);
        } else if (value === 'FILTER') {
            addActiveFilter(level.levelName);
        }
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
                            onClick={() => handleLevelClick(level)}
                        />
                    )
                ))}
            </div>
        </>
    );
};

export default LevelSelect;
