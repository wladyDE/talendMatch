import React from 'react';
import { Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectSkills } from '../../features/skills/skillsSlice';
import { SkillAccordion } from './SkillAccordion';

const SkillAccordions: React.FC = () => {
  const skills = useSelector(selectSkills);
  const softSkills = skills.filter(skill => skill.skillSubcategory.skillCategory.skillCategoryId === 1);
  const hardSkills = skills.filter(skill => skill.skillSubcategory.skillCategory.skillCategoryId === 2);

  return (
    <Row>
      <SkillAccordion
        title="Soft Skills"
        skills={softSkills}
        size={6}
        value='USER'
      />
      <SkillAccordion
        title="Hard Skills"
        skills={hardSkills}
        size={6}
        value='USER' />
    </Row>
  );
};

export default SkillAccordions;
