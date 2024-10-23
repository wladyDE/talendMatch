import React, { useState, useEffect } from 'react'
import EmployeeCard from '../../components/employee-card/EmployeeCard'
import EmployeePagination from '../employee-pagination/EmployeePagination';
import { IUser } from '../../features/currentUser/currentUserSlice';
import { useSelector } from 'react-redux';
import { selectEmployees } from '../../features/employees/employeesSlice';
import { selectActiveFilters } from '../../features/activeFilters/activeFiltersSlice';
import { useNavigate } from "react-router-dom";
import { filterEmployees } from './utils';
import { Paths } from '../../constants/paths';

interface IEmployeeListData {
    currentPageEmployees: IUser[],
    totalPage: number
}

const EmployeeList = () => {
    const employees = useSelector(selectEmployees)
    const activeFilters = useSelector(selectActiveFilters);
    const [data, setData] = useState<IEmployeeListData>({ currentPageEmployees: [], totalPage: 0 })
    const [page, setPage] = useState(1)
    const navigate = useNavigate();
    const employeeNumber = 10

    useEffect(() => {
        const startIndex = (page - 1) * employeeNumber;
        const endIndex = startIndex + employeeNumber;

        const filteredEmployees = filterEmployees(employees, activeFilters)

        setData({
            currentPageEmployees: filteredEmployees.slice(startIndex, endIndex),
            totalPage: Math.ceil(filteredEmployees.length / employeeNumber),
        });
    }, [page, employees, activeFilters]);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    const handleCardClick = (employeeId: string) => {
        navigate(`${Paths.profile}/${employeeId}`);
    };

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