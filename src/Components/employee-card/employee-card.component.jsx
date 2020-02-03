import React from "react";
import './employee-card.style.css';

export const EmployeeCard = props => <div className='card-container'>
    <img className='employee-image'
         alt={props.employee.Username}
         src={'http://' + props.employee.imgSrc}
         // src={'http://robohash.org/$'+props.employee.id+'?set=set2&size=180x180'}
    />
    <h1> {props.employee['Full Name']}</h1>
    <p> {props.employee['Role Description']}</p>
    {/*<h1> {props.employee['name']}</h1>*/}
    {/*<p> {props.employee['email']}</p>*/}
</div>;
