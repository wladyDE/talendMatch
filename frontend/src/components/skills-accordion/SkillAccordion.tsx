import React from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { skillsIcons } from '../../constants/skillsIcons';
import LevelSelect from '../level-select/LevelSelect';
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import { Skill } from '../../features/skills/skillsSlice';
import { groupSkillsBySubcategory } from './utils';
import './skillsAccordion.css';

export const SkillAccordion: React.FC<{ title: string, skills: Skill[], size: number }> = ({ title, skills, size }) => {
  const theme = useSelector(selectTheme);
  const styles = currentStyles(theme);

  const groupedSkills = groupSkillsBySubcategory(skills);

  return (
    <Col md={size}>
      <h5 style={{ color: styles.card.color }}>{title}</h5>
      <Accordion>
        {Object.entries(groupedSkills).map(([subcategoryName, skills], index) => {
          const icon = skillsIcons[subcategoryName as keyof typeof skillsIcons];

          return (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                {icon ? React.cloneElement(icon, { style: { marginRight: '8px' } }) : null}
                {subcategoryName}
              </Accordion.Header>

              <Accordion.Body>
                <Row>
                  {skills.map((skill, skillIndex) => (
                    <Col md={size} key={skillIndex} className="mb-2">
                      <LevelSelect
                        skill={skill.skillName}
                        showAll={true}
                      />
                    </Col>
                  ))}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Col>
  );
};