import React from 'react';
import { iconsMap, skillsData } from '../../data';
import LevelSelect from '../level-select/LevelSelect';
import { Accordion, Row, Col } from 'react-bootstrap';
import './skillsAccordion.css'

interface SkillSubcategory {
  skill_subcategory_name: string;
  skill_category_id: number;
  skills: string[];
}

interface SkillAccordionProps {
  title: string;
  skills: SkillSubcategory[];
}

const getSoftSkills = (): SkillSubcategory[] => 
  skillsData.skill_subcategories.filter(subcategory => subcategory.skill_category_id === 1);

const getHardSkills = (): SkillSubcategory[] => 
  skillsData.skill_subcategories.filter(subcategory => subcategory.skill_category_id === 2);

const SkillAccordion: React.FC<SkillAccordionProps> = ({ title, skills }) => (
  <Col md={6}>
    <h5 className="text-white">{title}</h5>
    <Accordion>
      {skills.map((subcategory, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
<Accordion.Header>
  {React.cloneElement(iconsMap[subcategory.skill_subcategory_name as keyof typeof iconsMap], { className: 'icon-spacing' })}
  {subcategory.skill_subcategory_name}
</Accordion.Header>

          <Accordion.Body>
            <Row>
              {subcategory.skills.map((skill, skillIndex) => (
                <Col md={6} key={skillIndex} className="mb-2">
                  <label>{skill}</label>
                  <LevelSelect
                    skill={skill}
                    levels={skillsData.levels}
                  />
                </Col>
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </Col>
);

const SkillsAccordion: React.FC = () => {
  const softSkills = getSoftSkills();
  const hardSkills = getHardSkills();

  return (
    <Row>
      <SkillAccordion title="Soft Skills" skills={softSkills} />
      <SkillAccordion title="Hard Skills" skills={hardSkills} />
    </Row>
  );
}

export default SkillsAccordion;
