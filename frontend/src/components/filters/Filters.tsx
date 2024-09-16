import React from 'react'
import { skillsData } from '../../data'
import { SkillAccordion } from '../skills-accordion/SkillsAccordion'

const Filters = () => {

  return (
    <div className="filters">
      <SkillAccordion
        title='Mitarbeiter filtern'
        skills={skillsData.skill_subcategories}
        size={12} />
    </div>
  )
}

export default Filters