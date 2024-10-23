import React from 'react'
import { useSelector } from 'react-redux'
import { selectSkills } from '../../features/skills/skillsSlice'
import { SkillAccordion } from '../skills-accordion/SkillAccordion'

const SkillsFilter = () => {
  const skills = useSelector(selectSkills)

  return (
    <div className="filters">
      <SkillAccordion
        title='Mitarbeiter filtern'
        skills={skills}
        size={12}
        value={{ type: 'FILTER' }}
      />
    </div>
  )
}

export default SkillsFilter