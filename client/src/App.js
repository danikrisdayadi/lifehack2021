import React, { useState } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import LeaderBoard from './components/leaderboard';
import Assignment from './components/assignment';
import UserProfile from './components/userprofile';

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

const App = () => (
    <div className="App">
        <Container className="p-3">
            {/* <Alert variant="success">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>
                    Aww yeah, you successfully read this important alert
                    message. This example text is going to run a bit longer so
                    that you can see how spacing within an alert works with this
                    kind of content.
                </p>
                <hr />
                <p className="mb-0">
                    Whenever you need to, be sure to use margin utilities to
                    keep things nice and tidy.
                </p>
            </Alert>
            <Jumbotron>
                <h1 className="header">Welcome To React-Bootstrap</h1>
                <ExampleToast>
                    We now have Toasts
                    <span role="img" aria-label="tada">
                        🍻
                    </span>
                </ExampleToast>
            </Jumbotron>
            <LeaderBoard></LeaderBoard> */}
            <Assignment></Assignment>
            <UserProfile></UserProfile>
        </Container>
    </div>
);

export default App;
