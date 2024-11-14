import React from 'react';
import { Form, Row } from 'react-bootstrap';

import NameFilter from './name-filter/NameFilter';
import Costcenterfilter from './costcenter-filter/CostcenterFilter';
import './employeeFilters.css'

const EmployeeFilter = () => {

    return (
        <Form className="mt-3">
            <Row>
                <NameFilter/>
                <Costcenterfilter/>
            </Row>
        </Form>
    );
};

export default EmployeeFilter;
