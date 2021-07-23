import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import LeaderBoard from './components/leaderboard';
import Assignment from './components/assignment';
import UserProfile from './components/userprofile';
import NavigationBar from './components/navigationbar'
import './App.css';

import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Classes from './components/classes';
import ClassroomPage from './pages/ClassroomPage';
import Assignments from './components/assignments';
const App = () => (
    
    <div className="App">
        <NavigationBar></NavigationBar>
        <Container fluid style={{paddingLeft: 160, paddingRight: 160}}>
            <Switch>
                <Route exact path="/">
                    <Redirect to="login" />
                </Route>
                <Route
                    exact
                    path="/leaderboard"
                    component={LeaderboardPage}
                />
                <Route
                    path="/login"
                    render={() => (
                        <LoginPage />
                    )}
                />
                <Route
                    path="/dashboard"
                    component={DashboardPage}
                />
                <Route
                    path="/profile"
                    exact
                    component={UserProfile}
                />
                <Route
                    path="/classes"
                    exact
                    component={Classes}
                />
                <Route
                    path="/assignments"
                    exact
                    component={Assignments}
                />
                <Route
                    path="/class/:queryId"
                    exact
                    render={(props) => (
                        <ClassroomPage
                            key={props.match.params.queryId}
                        />
                    )}
                />
                <Route
                    path="/profile/:queryId"
                    render={(props) => (
                        <UserProfile
                            key={props.match.params.queryId}
                        />
                    )}
                />
            </Switch>
        </Container>
    </div>
);

export default App;
