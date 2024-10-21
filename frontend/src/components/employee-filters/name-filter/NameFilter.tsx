import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import { selectTheme } from '../../../features/theme/themeSlice';
import { styles as currentStyles } from '../../../styles/styles';
import { changeNameFilter, selectActiveFilters } from '../../../features/activeFilters/activeFiltersSlice';

const NameFilter = () => {
    const theme = useSelector(selectTheme);
    const styles = currentStyles(theme);
    const nameFilter = useSelector(selectActiveFilters)
    const dispatch = useDispatch()

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeNameFilter(event.target.value));
    };

    return (
        <Col md={3}>
            <Form.Group controlId="filterName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={nameFilter.nameFilter}
                    onChange={handleNameChange}
                    style={styles.card}
                    className='custom-focus-outline'
                />
            </Form.Group>
        </Col>
    )
}

export default NameFilter