import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { type Level } from '../../app/services/levels';
import { selectTheme } from '../../features/theme/themeSlice';
import { addSkillFilter, removeSkillFilter, selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import { getColorForLevel, getSelectedLevel, isActiveSkill } from './utils';
import { IEmployee, selectCurrentUser } from '../../features/currentUser/currentUserSlice';
import { useAddSkillMutation } from '../../app/services/currentUser';
import { selectSkills } from '../../features/skills/skillsSlice';
import { FaFilter } from 'react-icons/fa';
import { useGetLevelsQuery } from '../../app/services/levels';
import './levelSelect.css';
import { skillFilterStyle } from '../../styles/styles';

export type LevelType = {
    type: 'USER' | 'FILTER' | 'ACTIVE_FILTER',
    user?: IEmployee
}

interface SkillLevelSelectorProps {
    skillId: string;
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

    let selectedLevel = getSelectedLevel(value, skillId, activeFilters.skillFilters, levels);
    const skill = skills.find(skill => skill.skillId === +skillId)!
    const isCurrentUser = value.type === 'USER' && value.user?.employeeId === currentUser.employeeId
    const isNotCurrentUser = value.type === 'USER' && value.user?.employeeId !== currentUser.employeeId
    const activeSkill = isActiveSkill(skill, value, isNotCurrentUser, activeFilters)
    const isActiveFilter = value.type === 'FILTER' && selectedLevel > 0

    const addActiveFilter = (level: Level) => {
        dispatch(addSkillFilter({ levelId: level.levelId, skillId }));
    };

    const addCurrentUserSkill = async (level: Level) => {
        try {
            await addSkillToEmployee({
                skill,
                level
            }).unwrap();
        } catch (error) {
            console.error("Failed to add skill:", error);
        }
    };

    const handleLevelClick = (level: Level) => {
        if (isCurrentUser) {
            addCurrentUserSkill(level);
        } else if (value.type === 'FILTER') {
            addActiveFilter(level);
        }
    };

    return (
        <>
            <label>
                {skill?.skillName}
                {activeSkill ? <FaFilter style={skillFilterStyle} /> : null}
            </label>
            <div className="d-flex align-items-center">
                {levels.map((level, index) => (
                    (showAll || index + 1 <= selectedLevel) && (
                        <div
                            key={index}
                            title={level.levelName}
                            onMouseEnter={isNotCurrentUser || value.type === 'ACTIVE_FILTER' ? undefined : () => setHoveredLevel(index + 1)}
                            onMouseLeave={isNotCurrentUser || value.type === 'ACTIVE_FILTER'  ? undefined : () => setHoveredLevel(0)}
                            className="level"
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
                {isActiveFilter && (
                    <span
                        className="remove-filter"
                        onClick={() => dispatch(removeSkillFilter(skillId))}
                    >
                        ×
                    </span>
                )}
            </div>
        </>
    );
};

export default LevelSelect;
