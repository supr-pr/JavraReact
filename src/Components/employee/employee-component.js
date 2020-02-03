import React, {Component} from "react";
import {EmployeeCardList} from "../employee-card-list/employee-card-list.component";
import {SearchBox} from "../search-box/search-box.component";

import './employee-component.css'
class EmployeeComponent extends Component {
    constructor() {
        super();

        this.state = {EmployeeList: [],SearchField: ''};
    }

    componentDidMount() {
        fetch('http://10.0.1.139:8080/javra-api/rest/javra-apiService/xepst/project/team?queryObj={%22dsProjectMembersQueryString%22:%20{%22ttProjectMembersQueryString%22:%20[{%22xpren%22:%20501}]}}')
            .then(response => response.json())
            .then(users => {
                this.setState({EmployeeList: users.response.dsteammembers.dsteammembers.ttteammembers})
            });
    }

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(users => {
    //             this.setState({EmployeeList: users})
    //         });
    // };

    handleInputChange = (e) =>{
        this.setState({SearchField: e.target.value});
    };

    render() {
        
        const { EmployeeList , SearchField } = this.state;
        // const filteredEmployees = EmployeeList.filter( emp => emp['Full Name'].toLowerCase().includes(SearchField.toLowerCase()));
        const filteredEmployees = EmployeeList.filter( emp => emp['Full Name'].toLowerCase().includes(SearchField.toLowerCase()));

        return (
            <div className='employeeComponentBody'>
                <h1 className='employeeComponentH1'>Search Project Employees</h1>
                <SearchBox
                    placeholder='Search Employees'
                    handleInputChange = {this.handleInputChange}
                />
                {/*<EmployeeCardList EmployeeList={this.state.EmployeeList}/>*/}
                <EmployeeCardList EmployeeList={filteredEmployees}/>
            </div>
        )
    }
}

export default EmployeeComponent;