import React, { useState, useEffect } from 'react'
import { employees } from '../../data'
import EmployeeCard, { type IEmployee } from '../../components/employee-card/EmployeeCard'
import EmployeePagination from '../employee-pagination/EmployeePagination';

interface IEmployeeData {
    employees: IEmployee[],
    totalPage: number;
}

const EmployeeList = () => {
    const [data, setData] = useState<IEmployeeData>({ employees: [], totalPage: 0 })
    const [page, setPage] = useState(1)

    useEffect(() => {
        const startIndex = (page - 1) * 5;
        const endIndex = startIndex + 5;

        setData({
            employees: employees.slice(startIndex, endIndex),
            totalPage: Math.ceil(employees.length / 5),
        });
    }, [page]);

    const handleChangePage = (page : number) => {
        setPage(page)
    }

    return (
        <>
            {data.employees.map((employee, index) => (
                <EmployeeCard
                    key={index}
                    name={employee.name}
                    year={employee.year}
                    email={employee.email}
                    location={employee.location}
                    department={employee.department}
                    position={employee.position}
                    image={employee.image}
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