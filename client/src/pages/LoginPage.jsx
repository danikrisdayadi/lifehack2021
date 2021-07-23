import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Container, Button, Image } from 'react-bootstrap';
import Logo from '../assets/Logo.svg';
import Illustration from '../assets/undraw-thinking.svg'; 
import styled from 'styled-components';


const Style = styled.div`
    text-align: left;
    padding: 0 4rem;
    padding-bottom: 3.75rem;
`
const LoginPage = () => {
    return (
            <Style>
                <Row>
                    <Col lg={8} style={{borderRight: "1px solid black",  height: "500px" }}>
                        <Row style={{marginBottom: "10vh"}}>
                            <Col lg="auto">
                                <Image src={Logo} alt="Logo" style={{height: '6rem'}}/>
                            </Col>
                            <Col>
                                <h1>Welcome to Metis!</h1>
                                <p>Metis is a gamefied education platform for students to learn, compete, and have fun with each other while still maximising their learning </p>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Image
                                    src={Illustration}
                                    alt="Content"
                                    style={{height: '15rem'}}
                                />
                        </Row>
                    </Col>
                    <Col className="align-self-center">
                        <Row className="justify-content-center">
                            <h1>Login to your account</h1>
                        </Row>
                        <Row className="justify-content-center">
                            <Button>Login with Google</Button>
                        </Row>
                    </Col>
                </Row>
            </Style>
    );
};

export default withRouter(LoginPage);