import React from 'react'
import { Row, Col} from 'react-bootstrap';

import Layout from '../components/layout/Layout'
import SkillsAccordion from '../components/skills-accordion/SkillsAccordion';
import EmployeeCard from '../components/employee-card/EmployeeCard';
import ProfileFoto from '../img/Havryliok_Volodymyr_043_FINAL.jpg'

const ProfilPage = () => {
  return (
    <Layout>
      <Row className="my-4">
        <EmployeeCard
            name = 'Volodymyr Havryliuk'
            year = {1997}
            email = 'volodymyr.havryliuk@quinscape.de'
            location='Dortmund'
            department='D&A'
            position='Teamleiter'
            image={ProfileFoto}
        />
      </Row>
      <Row>
        <Col>
          <h4 className="mt-2 mb-3">Ihre Fähigkeiten und deren Level</h4>
          <SkillsAccordion />
        </Col>
      </Row>
    </Layout>
  )
}

export default ProfilPage