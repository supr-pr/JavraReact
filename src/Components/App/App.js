import React, {Component} from 'react';
import './App.css';
import EmployeeComponent from "../employee/employee-component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      appName: 'React App'
    }
  }

  render() {

    return (
        <div className='App'>
          <header className="App-header">
          </header>
          <EmployeeComponent/>
        </div>
    )
  }
}

export default App;
