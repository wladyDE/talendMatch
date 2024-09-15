import React from 'react'
import { Pagination } from 'react-bootstrap'

import './employeePagination.css'

interface IPagination {
    total: number;
    current: number;
    onChangePage: (page : number) => void;
}

const EmployeePagination = ({ total, current, onChangePage }: IPagination) => {    
    let items = []
    if(current > 1) {
        items.push(<Pagination.First key="prev" onClick={() => onChangePage(1)}/>)
    }

    for (let page = 1; page <= total; page++){
        items.push(
            <Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                {page}
            </Pagination.Item>
        )
    }

    if(current < total){
        items.push(<Pagination.Last key="next" onClick={() => onChangePage(total)}/>)
    }

    return (
        <Pagination className="pagination-container">
            {items}
        </Pagination>
    )
}

export default EmployeePagination