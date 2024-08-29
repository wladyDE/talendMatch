import React from 'react'
import { Col, Row } from 'react-bootstrap'

import Layout from '../components/layout/Layout'
import { employees } from '../data'
import EmployeeCard from '../components/employee-card/EmployeeCard'
import Filters from '../components/filters/Filters'

const Suche = () => {
    return (
        <Layout>
            <Row  className="my-4">
                <Col md={8}>
                    {employees.map((employee, index) => (
                        <EmployeeCard
                            key={index}
                            name={employee.name}
                            year={employee.year}
                            email={employee.email}
                            location={employee.location}
                            department={employee.department}
                            position={employee.position}
                            image={employee.image}
                        />
                    ))}
                </Col>
                <Col md={4}>
                    <Filters />
                </Col>
            </Row>
        </Layout>
    )
}

export default Suche