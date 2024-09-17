import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { selectTheme } from '../../features/theme/themeSlice';
import { removeFilter, selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import LevelSelect from '../level-select/LevelSelect';
import { skillsData } from '../../data';
import { styles as currentStyles } from '../../styles/styles';
import './activeFilter.css'


const ActiveFilters = () => {
    const activeFilters = useSelector(selectActiveFilters);
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme);

    return (
        <div className="filters-container">
            {activeFilters.map((filter) => {
                return (
                    <div key={filter.skill} className="filter-item" style={styles.card}>
                        <LevelSelect
                            skill={filter.skill}
                            levels={skillsData.levels}
                            showAll={false}
                        />
                        <span
                            className="remove-filter"
                            onClick={() => dispatch(removeFilter(filter.skill))}
                        >
                            ×
                        </span>
                    </div>
                );
            })}
        </div>
    );

}

export default ActiveFilters