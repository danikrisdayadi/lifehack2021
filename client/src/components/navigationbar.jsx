import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/AuthActions';
import {
    Navbar,
    Nav,
    Container,
    NavDropdown,
    Button,
    Image
} from 'react-bootstrap';
import Logo from '../assets/logo-white.svg';

const NavigationBar = ({ ...props }) => {
    console.log(props);
    const logoutFunction = () => {
        props.logoutUser();
        props.history.push('/');
    };

    let loginButton;
    if (!props.auth.isAuthenticated) {
        loginButton = (
            <Nav.Link as={Link} to="/">
                Login
            </Nav.Link>
        );
    } else {
        loginButton = <Nav.Link onClick={logoutFunction}>Logout</Nav.Link>;
    }

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
                    <Nav.Link as={Link} to="/assignments">
                        My Assignments
                    </Nav.Link>
                    <Nav.Link as={Link} to="/forum">
                        Forum
                    </Nav.Link>
                    <Nav.Link as={Link} to="/shop">
                        Shop
                    </Nav.Link>
                    <Nav.Link as={Link} to="/profile">
                        My Profile
                    </Nav.Link>
                    {loginButton}
                </Nav>
            </Container>
        </Navbar>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(
    withRouter(NavigationBar)
);
