import React, { Component } from "react";
import {Link, withRouter, RouteComponentProps} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Logo from '../logos/logo-white.svg'; 
class NavigationBar extends Component {
  state = {

  };
  render() {
    return (
      <Navbar bg="info" variant="dark">
        <Container>
        <Navbar.Brand href="#home">
        <img
          alt=""
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
      Mettis
      </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to='/leaderboard'>My Classes</Nav.Link>
          <Nav.Link href="#assignments">My Assignments</Nav.Link>
          <Nav.Link href="#profile">My Profile</Nav.Link>
          <Nav.Link href="#profile">Log Out</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    )}
};


export default NavigationBar;
