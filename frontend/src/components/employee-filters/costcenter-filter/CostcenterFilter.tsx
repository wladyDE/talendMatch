import React from 'react';
import { Col, Form } from 'react-bootstrap';

import CustomSelect from '../../custom-select/CustomSelect';
import { Group, useGetGroupsQuery } from '../../../app/services/groups';
import { useDispatch, useSelector } from 'react-redux';
import { changeCostcenterFilter, selectActiveFilters } from '../../../features/activeFilters/activeFiltersSlice';

const Costcenterfilter = () => {
    const { data: groups = [] } = useGetGroupsQuery()
    const activeFilters = useSelector(selectActiveFilters)
    const dispatch = useDispatch()

    const options = [
        { id: "0", displayName : '-' },
        ...groups
    ];

    const changeFilter = (group : Group) => {
        dispatch(changeCostcenterFilter(group))
    }

    return (
        <Col md={3}>
            <Form.Group controlId="filterSelect">
                <Form.Label>Kostenstelle</Form.Label>
                <CustomSelect
                    firstOption={activeFilters.costcenterFilter}
                    options={options}
                    placeholder=''
                    onOptionClick={changeFilter}
                />
            </Form.Group>
        </Col>
    );
};

export default Costcenterfilter;
