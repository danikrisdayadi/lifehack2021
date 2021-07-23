import React from "react";
import { withRouter } from "react-router-dom";
import styled from 'styled-components';
import {Row, Col, Container, Button, ListGroup} from 'react-bootstrap';
import DogProfile from '../assets/hurt.png';

const Style = styled.div`
    text-align: left;

    .img {
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        image-rendering: crisp-edges;
    }

    p {
        margin-bottom: 0;
    }
` 
const ClassroomPage = (props) => {
    const assignmentList = 
        <Row style={{marginLeft: 0}}>
            <Col className="align-self-center">
                <Row >
                    <p>Assignment 1 <span class="badge bg-success" style={{color: "white"}}>Completed</span></p>
                </Row>
            </Col>
            <Col className="align-self-center">
                <Row className="justify-content-end">
                    <p>Friday 20 August 2021</p>
                </Row>
            </Col>
        </Row>
    
    return (
        <Container>
        <Style>
            <h1>{(props.match.params.queryId).charAt(0).toUpperCase() + (props.match.params.queryId).slice(1)}</h1>
            <p>Secondary 3</p>
            <Row style={{marginLeft: 0, marginBottom: 20}}>
                <h3>Your Profile</h3>
                <div className="w-100"></div>
                <Col style={{paddingLeft: 0}} lg="auto">
                    <img src={DogProfile} alt="profile" className="image"/>
                </Col>
                <Col>
                    <Row><p>Leaderboard Position: 24th (top 70%)</p></Row>
                    <Row><p>Completed Assignments: 10</p></Row>
                    <Row><p>Assignments remaining: 3</p></Row>
                </Col>
            </Row>
            <Row style={{marginLeft: 0, marginBottom: 20}}>
                <h3>Assignments Due</h3>
                <div className="w-100"></div>
                <ListGroup style={{width: "100%"}}>
                    <ListGroup.Item>{assignmentList}</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </Row>
            <Row style={{margin: 0}}>
                <h3>Leaderboard</h3>
            </Row>
        </Style>
        </Container>
    );
};

export default withRouter(ClassroomPage);