import React, {Component} from 'react';
import { BrowserRouter as Router,  Switch, Route, Link } from 'react-router-dom';

import './App.css';
import EmployeeComponent from "../employee/employee-component";
import HomePage from "../pages/homepage/homepage.component";

const HatsPage = props => (
    <div>
        <Link to='/home'>Home</Link>
        <button onClick={ () => props.history.push('/')}>Employees</button>
        <Link to={`${props.match.url}/12`}> to 12 Topic</Link>
        <h1>Hatsss: {props.match.params.hatsid}</h1>
    </div>
);

class App extends Component {
    constructor() {
        super();

        this.state = {
            appName: 'React App'
        }
    }

    render() {

        return (
            <div>
                <Switch>
                    <Route exact path='/' component={EmployeeComponent}/>
                    <Route exact path='/home' component={HomePage}/>
                    <Route path='/hats/:hatsid' component={HatsPage}/>
                </Switch>
            </div>
        )
    }
}

export default App;
