import React from 'react'
import { Col, Row } from 'react-bootstrap'

import Layout from '../components/layout/Layout'
import SkillsFilter from '../components/skills-filters/SkillsFilter'
import EmployeeList from '../components/employee-list/EmployeeList'
import ActiveFilters from '../components/active-filters/ActiveFilters'
import EmployeeFilter from '../components/employee-filters/EmployeeFilters'

const SuchePage = () => {
    return (
        <Layout>
            <ActiveFilters />
            <EmployeeFilter />
            <Row className="my-4">
                <Col xs={12} md={4} className="order-1 order-md-2">
                    <SkillsFilter />
                </Col>
                <Col xs={12} md={8} className="order-2 order-md-1">
                    <EmployeeList />
                </Col>
            </Row>
        </Layout>
    )
}

export default SuchePage