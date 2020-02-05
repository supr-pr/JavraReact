import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import './App.css';
import EmployeeComponent from "../employee/employee-component";
import HomePage from "../pages/homepage/homepage.component";
import ShopPage from "../pages/shop/shop.component";
import Header from "../header/header.component";
import SignInAndSignUpPAge from "../pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

const HatsPage = props => (
    <div>
        <Link to='/home'>Home</Link>
        <button onClick={() => props.history.push('/')}>Employees</button>
        <Link to={`${props.match.url}/12`}> to 12 Topic</Link>
        <h1>Hatsss: {props.match.params.hatsid}</h1>
    </div>
);

class App extends Component {
    constructor() {
        super();

        this.state = {

            currentUser: null
        }
    }

    unsubscribeFromAuth = null;

    componentDidMount() {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    this.setState({
                        currentUser: {
                            id: snapshot.id,
                            ...snapshot.data()
                        }
                    })
                });
            }
            else {
                this.setState({
                    currentUser: userAuth
                })
            }
        });
    }


    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }


    render() {

        return (
            <div>
                <Header currentUser={this.state.currentUser}/>
                <Switch>
                    <Route exact path='/home/' component={EmployeeComponent}/>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop/' component={ShopPage}/>
                    <Route exact path='/signin/' component={SignInAndSignUpPAge}/>
                    {/*<Route path='/hats/:hatsid/' component={HatsPage}/>*/}
                </Switch>
            </div>
        )
    }
}

export default App;
