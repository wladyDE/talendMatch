import React from 'react'
import { Row, Col, Image } from 'react-bootstrap';

import Layout from '../components/layout/Layout'
import ProfileFoto from '../img/Havryliok_Volodymyr_043_FINAL.jpg'
import ProfileCard from '../components/profile-card/ProfileCard';
import SkillsAccordion from '../components/skills-accordion/SkillsAccordion';

const Profil = () => {
  return (
    <Layout>
      <Row className="my-4">
        <Col md={4} className="text-center">
          <Image src={ProfileFoto} style={{ borderRadius: '20px' }} fluid />
        </Col>
        <Col md={8}>
          <ProfileCard />
        </Col>
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

export default Profil