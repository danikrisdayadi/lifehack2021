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
import NavigationBar from './components/navigationbar';

import './App.css';

const ExampleToast = ({ children }) => {
    const [show, toggleShow] = useState(true);

    return (
        <>
            {!show && (
                <Button onClick={() => toggleShow(true)}>Show Toast</Button>
            )}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">React Bootstrap</strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </>
    );
};

const App = () => {
    return (
        <div className="App">
            <NavigationBar />
            <Switch>
                {/* <Route exact path="/" component={HomePage} /> */}
                <Route exact path="/leaderboard" component={LeaderBoard} />
            </Switch>
        </div>
    );
};

export default App;
