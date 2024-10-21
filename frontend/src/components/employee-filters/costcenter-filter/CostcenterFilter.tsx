import React from 'react';
import { Col, Form } from 'react-bootstrap';

import CustomSelect from '../../custom-select/CustomSelect';

const Costcenterfilter = () => {
    const options = [
        { value: '-', label: '-' },
        { value: 'option1', label: 'D&A' },
        { value: 'option2', label: 'cplace' },
        { value: 'option3', label: 'Java' },
    ];

    return (
        <Col md={3}>
            <Form.Group controlId="filterSelect">
                <Form.Label>Kostenstelle</Form.Label>
                <CustomSelect
                    options={options}
                    placeholder=''
                />
            </Form.Group>
        </Col>
    );
};

export default Costcenterfilter;
