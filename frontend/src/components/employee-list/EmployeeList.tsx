import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

import EmployeeCard from '../../components/employee-card/EmployeeCard'
import EmployeePagination from '../employee-pagination/EmployeePagination';
import { IEmployee } from '../../features/currentUser/currentUserSlice';
import { selectEmployees } from '../../features/employees/employeesSlice';
import { selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import { filterEmployees } from './utils';
import { Paths } from '../../constants/paths';

interface IEmployeeListData {
    currentPageEmployees: IEmployee[],
    totalPage: number
}

const EmployeeList = () => {
    const employees = useSelector(selectEmployees)
    const activeFilters = useSelector(selectActiveFilters);
    const [data, setData] = useState<IEmployeeListData>({ currentPageEmployees: [], totalPage: 0 })
    const [page, setPage] = useState(1)
    const [filteredEmployees, setFilteredEmployees] = useState<IEmployee[]>([]);
    const navigate = useNavigate();
    const employeeNumber = 10


    useEffect(() => {
        const filtered = filterEmployees(employees, activeFilters);
        setFilteredEmployees(filtered);

        const startIndex = (page - 1) * employeeNumber;
        const endIndex = startIndex + employeeNumber;

        setData({
            currentPageEmployees: filtered.slice(startIndex, endIndex),
            totalPage: Math.ceil(filtered.length / employeeNumber),
        });
    }, [page, employees, activeFilters]);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleCardClick = (employeeId: string) => {
        navigate(`${Paths.profile}/${employeeId}`);
    };

    if (filteredEmployees.length === 0) {
        return <p>Es gibt momentan keine Mitarbeiter, die Ihren Suchkriterien entsprechen</p>
    }

    return (
        <>
            {data.currentPageEmployees.map((employee, index) => (
                <EmployeeCard
                    style={{ cursor: 'pointer' }}
                    key={index}
                    user={employee}
                    onClick={() => handleCardClick(employee.employeeId)}
                />
            ))}
            {data.totalPage > 1 && (
                <EmployeePagination
                    total={data.totalPage}
                    current={page}
                    onChangePage={handleChangePage}
                />
            )}
        </>
    )
}

export default EmployeeList