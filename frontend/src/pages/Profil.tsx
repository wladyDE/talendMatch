import React from 'react'
import { Row, Col } from 'react-bootstrap';

import Layout from '../components/layout/Layout'
import SkillsAccordion from '../components/skills-accordion/SkillsAccordion';
import EmployeeCard from '../components/employee-card/EmployeeCard';
import { useSelector } from 'react-redux';
import { selectTheme } from '../features/theme/themeSlice';
import { styles as currentStyles } from '../styles/styles';
import { selectCurrentUser } from '../features/currentUser/currentUserSlice';

const ProfilPage = () => {
  const theme = useSelector(selectTheme);
  const currentUser = useSelector(selectCurrentUser)
  const styles = currentStyles(theme)

  console.log(currentUser);

  return (
    <Layout>
      <Row className="my-4">
        <EmployeeCard
          currentUser={currentUser}
        />
      </Row>
      <Row>
        <Col>
          <h4 className="mt-2 mb-3" style={styles.h}>Ihre Fähigkeiten und deren Level</h4>
          <SkillsAccordion />
        </Col>
      </Row>
    </Layout>
  )
}

export default ProfilPage