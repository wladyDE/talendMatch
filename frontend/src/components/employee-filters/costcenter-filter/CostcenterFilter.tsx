import React from 'react';
import { Col, Form } from 'react-bootstrap';

import CustomSelect from '../../custom-select/CustomSelect';
import { useDispatch, useSelector } from 'react-redux';
import { changeCostcenterFilter, selectActiveFilters } from '../../../features/activeFilters/activeFiltersSlice';
import { IOption } from '../../custom-select/CustomSelect';

const Costcenterfilter = () => {
    const activeFilters = useSelector(selectActiveFilters)
    const dispatch = useDispatch()

    const options : IOption[] = [
        { id: "0", displayName : '-' },
        { id: "1", displayName : 'D&A' },
        { id: "2", displayName : 'cplace' },
        { id: "3", displayName : 'Java' },
    ];

    const changeFilter = (option : IOption) => {
        dispatch(changeCostcenterFilter(option))
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
