import React from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';

import { iconsMap, skillsData } from '../../data';
import LevelSelect from '../level-select/LevelSelect';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import './skillsAccordion.css'

export interface SkillSubcategory {
  skill_subcategory_name: string;
  skill_category_id: number;
  skills: string[];
}

export interface SkillAccordionProps {
  title: string;
  skills: SkillSubcategory[];
  size: number;
}

const getSoftSkills = (): SkillSubcategory[] =>
  skillsData.skill_subcategories.filter(subcategory => subcategory.skill_category_id === 1);

const getHardSkills = (): SkillSubcategory[] =>
  skillsData.skill_subcategories.filter(subcategory => subcategory.skill_category_id === 2);

export const SkillAccordion: React.FC<SkillAccordionProps> = ({ title, skills, size }) => {
  const theme = useSelector(selectTheme);
  const styles = currentStyles(theme)

  return (<Col md={size}>
    <h5 style={{color : styles.card.color}}>{title}</h5>
    <Accordion>
      {skills.map((subcategory, index) => (
        <Accordion.Item eventKey={index.toString()} key={index}>
          <Accordion.Header>
            {React.cloneElement(iconsMap[subcategory.skill_subcategory_name as keyof typeof iconsMap], { style : { marginRight : '8px'} })}
            {subcategory.skill_subcategory_name}
          </Accordion.Header>

          <Accordion.Body>
            <Row>
              {subcategory.skills.map((skill, skillIndex) => (
                <Col md={size} key={skillIndex} className="mb-2">
                  <LevelSelect
                    skill={skill}
                    showAll={true}
                  />
                </Col>
              ))}
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  </Col>)
}

const SkillsAccordion: React.FC = () => {
  const softSkills = getSoftSkills();
  const hardSkills = getHardSkills();

  return (
    <Row>
      <SkillAccordion title="Soft Skills" skills={softSkills} size={6} />
      <SkillAccordion title="Hard Skills" skills={hardSkills} size={6} />
    </Row>
  );
}

export default SkillsAccordion;
