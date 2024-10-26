import React from 'react'
import { FaFilter } from 'react-icons/fa';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../features/currentUser/currentUserSlice';

import { LevelType } from '../level-select/LevelSelect';
import { selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import { selectEmployees } from '../../features/employees/employeesSlice';
import { getFilterCount } from './utils';

interface AccordionHeaderProps {
  icon: JSX.Element,
  subcategoryName: string,
  value: LevelType
}

const AccordionHeader: React.FC<AccordionHeaderProps> = ({ icon, subcategoryName, value }) => {
  const currentUser = useSelector(selectCurrentUser)
  const activeFilters = useSelector(selectActiveFilters)
  const employees = useSelector(selectEmployees)

  const ActiveFilters = () => {
    const isNotCurrentUser = value.type === 'USER' && value.user?.employeeId !== currentUser.employeeId

    if (isNotCurrentUser && activeFilters.skillFilters.length > 0) {
      const user = employees.find(employee => employee.employeeId === value.user?.employeeId)
      const filterCount = getFilterCount(activeFilters, user, subcategoryName)      

      if (filterCount) {
        return (
          <>
            {React.cloneElement(
              <FaFilter />,
              { style: { marginLeft: '8', fontSize: '12px' } }
            )}
            ({filterCount})
          </>
        )
      }
    }
    return null
  }


  return (
    <Accordion.Header>
      {icon ? React.cloneElement(icon, { style: { marginRight: '8px' } }) : null}
      {subcategoryName}
      <ActiveFilters />
    </Accordion.Header>
  )
}

export default AccordionHeader