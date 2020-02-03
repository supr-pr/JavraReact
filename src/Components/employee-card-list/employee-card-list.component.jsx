import React from "react";
import './employee-card-list.style.css';
import {EmployeeCard} from "../employee-card/employee-card.component";

export const EmployeeCardList = (props) => (
    <div className='employee-card-list'>
        {props.EmployeeList.map(emp =>
            // <EmployeeCard key={emp.Username} employee={emp}/>
            <EmployeeCard key={emp.id} employee={emp}/>
        )}
    </div>
);
