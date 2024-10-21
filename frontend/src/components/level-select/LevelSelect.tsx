import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { type Level } from '../../app/services/levels';
import { selectTheme } from '../../features/theme/themeSlice';
import { addSkillFilter, selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import { getColorForLevel, getSelectedLevel } from './utils';
import { addSkill, selectCurrentUser } from '../../features/currentUser/currentUserSlice';
import { useAddSkillMutation } from '../../app/services/currentUser';
import { selectSkills } from '../../features/skills/skillsSlice';
import './levelSelect.css';
import { useGetLevelsQuery } from '../../app/services/levels';

export type LevelType = 'USER' | 'FILTER' | 'ACTIVE_FILTER'

interface SkillLevelSelectorProps {
    skillId : string;
    showAll: boolean;
    value: LevelType
}

const LevelSelect: React.FC<SkillLevelSelectorProps> = ({ skillId, showAll, value }) => {
    const [hoveredLevel, setHoveredLevel] = useState<number>(0);
    const dispatch = useDispatch();
    const activeFilters = useSelector(selectActiveFilters);
    const theme = useSelector(selectTheme);
    const currentUser = useSelector(selectCurrentUser)
    const skills = useSelector(selectSkills)
    const { data: levels = [] } = useGetLevelsQuery();
    const [addSkillToEmployee] = useAddSkillMutation()

    let selectedLevel = getSelectedLevel(value, skillId, currentUser, activeFilters.skillFilters, levels);
    const skill = skills.find(skill => skill.skillId === +skillId)!

    const addActiveFilter = (level : Level) => {
        dispatch(addSkillFilter({ levelId: level.levelId, skillId }));
    };

    const addCurrentUserSkill = async (level: Level) => {        
        try {
            await addSkillToEmployee({
                employeeId: currentUser.employeeId,
                skillId : +skillId,
                level: +level.levelId
            }).unwrap();
            dispatch(addSkill({ skill , level }));
        } catch (error) {
            console.error("Failed to add skill:", error);
        }
    };

    const handleLevelClick = (level: Level) => {
        if (value === 'USER') {
            addCurrentUserSkill(level);
        } else if (value === 'FILTER') {
            addActiveFilter(level);
        }
    };

    return (
        <>
            <label>{skill.skillName}</label>
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
