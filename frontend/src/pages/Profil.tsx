import React from 'react'
import { Row, Col } from 'react-bootstrap';

import Layout from '../components/layout/Layout'
import SkillAccordions from '../components/skills-accordion/SkillAccordions';
import EmployeeCard from '../components/employee-card/EmployeeCard';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/theme/themeSlice';
import { centeredFlexBox, styles as currentStyles } from '../styles/styles';
import { selectCurrentUser } from '../features/currentUser/currentUserSlice';
import SkillsCheckBox from '../components/skills-checkbox/SkillsCheckBox';
import { useParams } from 'react-router-dom';
import { selectEmployees } from '../features/employees/employeesSlice';

const ProfilPage = () => {
  const { id } = useParams<{ id: string }>();
  const currentUser = useSelector(selectCurrentUser)
  const employees = useSelector(selectEmployees)
  const theme = useSelector(selectTheme);
  const styles = currentStyles(theme)

  const user = id ? employees.find(employee => employee.employeeId === id)! : currentUser

  console.log(user);
  

  return (
    <Layout>
      <Row className="my-4">
        <EmployeeCard
          user={user}
        />
      </Row>
      <Row>
        <Col>
          <div style={{ ...centeredFlexBox, color: 'gray' }}>
            <h4 className="mt-2 mb-3" style={{ ...styles.h }}>
              Fähigkeiten und deren Level
            </h4>
            {!id && <SkillsCheckBox />}
          </div>
          <SkillAccordions
             type="USER"
             user={user}
          />
        </Col>
      </Row>
    </Layout>
  )
}

export default ProfilPage