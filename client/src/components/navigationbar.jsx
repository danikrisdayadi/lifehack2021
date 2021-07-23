import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from '../assets/logo-white.svg';

class NavigationBar extends Component {
    render() {
        return (
            <Navbar bg="info" variant="dark" style={{ marginBottom: '60px' }}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt=""
                            src={Logo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={Link} to="/home">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/classes">
                            My Classes
                        </Nav.Link>
                        <Nav.Link as={Link} to="/assignments">
                            My Assignments
                        </Nav.Link>
                        <Nav.Link as={Link} to="/profile">
                            My Profile
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        );
    }
}

export default NavigationBar;
