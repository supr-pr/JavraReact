import React, {Component} from 'react';
import {Switch, Route, Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import './App.css';
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import EmployeeComponent from "../employee/employee-component";
import HomePage from "../pages/homepage/homepage.component";
import ShopPage from "../pages/shop/shop.component";
import CheckoutPage from "../pages/checkout/checkout.component";
import Header from "../header/header.component";
import SignInAndSignUpPAge from "../pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";

import {setCurrentUser} from "../../redux/user/user.actions";

const HatsPage = props => (
    <div>
        <Link to='/home'>Home</Link>
        <button onClick={() => props.history.push('/')}>Employees</button>
        <Link to={`${props.match.url}/12`}> to 12 Topic</Link>
        <h1>Hatsss: {props.match.params.hatsid}</h1>
    </div>
);

class App extends Component {
    // constructor() {
    //     super();
    //
    //     this.state = {
    //
    //         currentUser: null
    //     }
    // }

    unsubscribeFromAuth = null;

    componentDidMount() {
        const {setCurrentUser} = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapshot => {
                    // this.setState({
                    //     currentUser: {
                    //         id: snapshot.id,
                    //         ...snapshot.data()
                    //     }
                    // })

                    setCurrentUser({
                        id: snapshot.id,
                        ...snapshot.data()
                    })
                });
            } else {
                // this.setState({
                //     currentUser: userAuth
                // })
                setCurrentUser(
                    userAuth
                )
            }
        });
    }


    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }


    render() {

        return (
            <div>
                <Header/>
                {/*<Header currentUser={this.state.currentUser}/>*/}
                <Switch>
                    <Route exact path='/home/' component={EmployeeComponent}/>
                    <Route exact path='/' component={HomePage}/>
                    <Route exact path='/shop/' component={ShopPage}/>
                    <Route exact path='/checkout/' component={CheckoutPage}/>
                    <Route exact path='/signin/'
                           render={() =>
                               this.props.currentUser ? (<Redirect to='/'/>) : (<SignInAndSignUpPAge/>)
                           }/>
                    <Route path='/hats/:hatsid/' component={HatsPage}/>
                </Switch>
            </div>
        )
    }
}

// const mapStateToProps = ({user}) => ({
//     currentUser: user.currentUser
// });

const mapStateToProps = createStructuredSelector ({
        currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
