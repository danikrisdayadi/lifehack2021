import React, { Component } from "react";
import {Navbar, Nav, Container} from 'react-bootstrap';
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
          <Nav.Link href="#classes">My Classes</Nav.Link>
          <Nav.Link href="#assignments">My Assignments</Nav.Link>
          <Nav.Link href="#profile">My Profile</Nav.Link>
          <Nav.Link href="#profile">Log Out</Nav.Link>
        </Nav>
        </Container>
    </Navbar>
    )}
};


export default NavigationBar;
