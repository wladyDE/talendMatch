import React from 'react'
import { Col, Row } from 'react-bootstrap'

import Layout from '../components/layout/Layout'
import Filters from '../components/filters/Filters'
import EmployeeList from '../components/employee-list/EmployeeList'

const SuchePage = () => {
    return (
        <Layout>
            <Row className="my-4">
                <Col md={8}>
                    <EmployeeList />
                </Col>
                <Col md={4}>
                    <Filters />
                </Col>
            </Row>
        </Layout>
    )
}

export default SuchePage