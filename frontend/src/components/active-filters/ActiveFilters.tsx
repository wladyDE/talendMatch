import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { selectTheme } from '../../features/theme/themeSlice';
import { removeSkillFilter, selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import LevelSelect from '../level-select/LevelSelect';
import { styles as currentStyles } from '../../styles/styles';
import './activeFilter.css'
import { Row } from 'react-bootstrap';


const ActiveFilters = () => {
    const activeFilters = useSelector(selectActiveFilters);
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme);

    if (activeFilters.skillFilters.length === 0) {
        return null;
    }

    console.log(activeFilters);


    return (
        <Row className="my-3">
            <div className="filters-container">
                {activeFilters.skillFilters.map((filter) => {
                    return (
                        <div key={filter.skillId} className="filter-item" style={styles.card}>
                            <LevelSelect
                                skillId={filter.skillId}
                                showAll={false}
                                value='ACTIVE_FILTER'
                            />
                            <span
                                className="remove-filter"
                                onClick={() => dispatch(removeSkillFilter(filter.skillId))}
                            >
                                ×
                            </span>
                        </div>
                    );
                })}
            </div>
        </Row>
    );

}

export default ActiveFilters