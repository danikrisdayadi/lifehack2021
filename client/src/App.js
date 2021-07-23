import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import LeaderBoard from './components/leaderboard';
import Assignment from './components/assignment';
import UserProfile from './components/userprofile';
import NavigationBar from './components/navigationbar';
import './App.css';

import jwtDecode from 'jwt-decode';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Classrooms from './components/classrooms';
import Assignments from './components/assignments';

import { Provider } from 'react-redux';
import store from './redux/store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './redux/actions/AuthActions';

import { loadUserProfile } from './redux/actions/UserProfileActions';

axios.defaults.baseURL =
    process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);

    // Decode token and get user info and exp
    const decoded = jwtDecode(token);

    // Check for expired token in milliseconds
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        logoutUser();
    } else {
        // Set user and isAuthenticated
        store.dispatch(setCurrentUser(decoded));
        loadUserProfile(decoded.username)(store.dispatch);
    }
}

const App = () => (
    <div className="App">
        <Provider store={store}>
            <NavigationBar></NavigationBar>
            <Container fluid style={{ paddingLeft: 160, paddingRight: 160 }}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="login" />
                    </Route>
                    <Route
                        exact
                        path="/leaderboard"
                        component={LeaderboardPage}
                    />
                    <Route path="/login" render={() => <LoginPage />} />
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/profile" exact component={UserProfile} />
                    <Route path="/classes" exact component={Classrooms} />
                    <Route path="/assignments" exact component={Assignments} />
                    <Route
                        path="/profile/:queryId"
                        render={(props) => (
                            <UserProfile key={props.match.params.queryId} />
                        )}
                    />
                </Switch>
            </Container>
        </Provider>
    </div>
);

export default App;
