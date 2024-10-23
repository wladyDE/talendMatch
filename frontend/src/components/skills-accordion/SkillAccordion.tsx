import React from 'react';
import { Accordion, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { skillsIcons } from '../../constants/skillsIcons';
import LevelSelect, { LevelType } from '../level-select/LevelSelect';
import { selectTheme } from '../../features/theme/themeSlice';
import { styles as currentStyles } from '../../styles/styles';
import { Skill } from '../../features/skills/skillsSlice';
import { groupSkillsBySubcategory } from './utils';
import AccordionHeader from './AccordionHeader';
import './skillsAccordion.css';

interface SkillAccordionProps {
  title: string,
  skills: Skill[],
  size: number,
  value: LevelType
}

export const SkillAccordion: React.FC<SkillAccordionProps> = ({ title, skills, size, value }) => {
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
              <AccordionHeader
                icon={icon}
                subcategoryName={subcategoryName}
                value={value}
              />
              <Accordion.Body>
                <Row>
                  {skills.map((skill, skillIndex) => (
                    <Col md={size} key={skillIndex} className="mb-2">
                      <LevelSelect
                        skillId={skill.skillId.toString()}
                        showAll={true}
                        value={value}
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