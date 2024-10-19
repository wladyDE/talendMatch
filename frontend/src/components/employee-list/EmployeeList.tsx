import React, { useState, useEffect } from 'react'
import EmployeeCard from '../../components/employee-card/EmployeeCard'
import EmployeePagination from '../employee-pagination/EmployeePagination';
import { IUser } from '../../features/currentUser/currentUserSlice';
import { useSelector } from 'react-redux';
import { selectEmployees } from '../../features/employees/employeesSlice';

interface IEmployeeListData {
    currentPageEmployees : IUser[],
    totalPage : number
}

const EmployeeList = () => {
    const employees = useSelector(selectEmployees)
    const [data, setData] = useState<IEmployeeListData>({ currentPageEmployees: [], totalPage: 0 })
    const [page, setPage] = useState(1)
    const employeeNumber = 10

    useEffect(() => {
        const startIndex = (page - 1) * employeeNumber;
        const endIndex = startIndex + employeeNumber;

        setData({
            currentPageEmployees: employees.employees.slice(startIndex, endIndex),
            totalPage: Math.ceil(employees.employees.length / employeeNumber),
        });
    }, [page, employees.employees]);

    const handleChangePage = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <>
            {data.currentPageEmployees.map((employee, index) => (
                <EmployeeCard
                    key={index}
                    user={employee}
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