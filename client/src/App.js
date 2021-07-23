import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import UserProfile from './components/userprofile';
import NavigationBar from './components/navigationbar';
import './App.css';

import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import LeaderboardPage from './pages/LeaderboardPage';
import Classes from './components/classes';
import ClassroomPage from './pages/ClassroomPage';
import Assignments from './components/assignments';
import HomePage from './pages/HomePage';
import AssignmentCover from './components/assignmentCover';
import Question from './components/question';
import ShopPage from './pages/ShopPage';

const App = () => (
    <div className="App">
        <NavigationBar></NavigationBar>
        <Container
            fluid
            style={{ paddingLeft: 160, paddingRight: 160, height: '100%' }}
        >
            <Switch>
                <Route exact path="/">
                    <Redirect to="login" />
                </Route>
                <Route exact path="/leaderboard" component={LeaderboardPage} />
                <Route path="/login" render={() => <LoginPage />} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/profile" exact component={UserProfile} />
                <Route path="/classes" exact component={Classes} />
                <Route path="/assignments" exact component={Assignments} />
                <Route
                    path="/assignment/:queryId"
                    exact
                    render={(props) => (
                        <AssignmentCover
                            key={props.match.params.queryId}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/assignment/:queryId/question/:queryId"
                    exact
                    render={(props) => (
                        <Question
                            key={props.match.params.queryId}
                        />
                    )}
                />
                <Route
                    path="/class/:queryId"
                    exact
                    render={(props) => (
                        <ClassroomPage key={props.match.params.queryId} />
                    )}
                />
                <Route path="/home" exact component={HomePage} />
                <Route path="/shop" exact component={ShopPage} />
                <Route
                    path="/profile/:queryId"
                    render={(props) => (
                        <UserProfile key={props.match.params.queryId} />
                    )}
                />
            </Switch>
        </Container>
    </div>
);

export default App;
