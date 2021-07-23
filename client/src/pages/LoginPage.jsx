import React from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Container, Button, Image } from 'react-bootstrap';
import Logo from '../assets/Logo.svg';
import GoogleLogo from '../assets/google.svg'
import Illustration from '../assets/undraw-thinking.svg'; 
import styled from 'styled-components';


const Style = styled.div`
    text-align: left;
    padding: 0 4rem;
    padding-bottom: 3.75rem;
`
const LoginPage = () => {
    return (
            <Style style={{height: "100%"}}>
                <Row style={{height: "100%"}}>
                    <Col lg={8} style={{borderRight: "1px solid black",  height: "100%" }}>
                        <Row style={{marginBottom: "20px"}} className="align-items-center">
                            <Col lg="auto">
                                    <Image src={Logo} alt="Logo" style={{height: '6rem'}}/>                                
                            </Col>
                            <Col lg={8} style={{height: "100%"}}>
                                <h1>Welcome to Metis!</h1>
                                <h6 style={{margin:0}}>Motivating students since 2021</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="auto">
                                <Image src={Logo} alt="Logo" style={{height: '6rem', visibility: "hidden"}}/>                                
                            </Col>
                            <Col lg={{span: 8}}>
                                <p>
                                Metis is a gamefied education platform for students to learn, compete, and have fun with each other while still maximising their learning experience. <br /><br />
                                Metis achieves this through engaging students in innovative ways such as awarding badges, leaderboard and coin to customise avatars of students to their liking.
                                Studies have shown how gamification has significantly improved a student's ability to concentrate and maintain focus.
                                </p>
                            </Col>
                        </Row>
                        <br/>
                        <br />
                        <Row className="justify-content-center">
                        <Col lg={10}>
                            <Image
                                    src={Illustration}
                                    alt="Content"
                                    style={{height: '15rem'}}
                                />
                        </Col>
                        </Row>
                    </Col>
                    <Col className="align-self-center">
                        <Row className="justify-content-center">
                            <h3>Start your Journey Here</h3>
                        </Row>
                        <br />
                        <Row className="justify-content-center">
                            <Button variant="outline-dark" style={{padding: "10px 20px"}}>
                                <Image
                                    src={GoogleLogo}
                                    alt="google-login"
                                    height={25}
                                    width={20}
                                    style={{marginRight: 5}}
                                /> {' '}
                            Sign in with Google
                        </Button>
                        </Row>
                    </Col>
                </Row>
            </Style>
    );
};

export default withRouter(LoginPage);