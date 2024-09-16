import React from 'react'
import { Col, Row } from 'react-bootstrap'

import Layout from '../components/layout/Layout'
import Filters from '../components/filters/Filters'
import EmployeeList from '../components/employee-list/EmployeeList'

const SuchePage = () => {
    return (
        <Layout>
            <Row className="my-4">
                <Col xs={12} md={4} className="order-1 order-md-2">
                    <Filters />
                </Col>
                <Col xs={12} md={8} className="order-2 order-md-1">
                    <EmployeeList />
                </Col>
            </Row>
        </Layout>
    )
}

export default SuchePage