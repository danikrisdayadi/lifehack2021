import React from "react";
import { withRouter, Link } from "react-router-dom";
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

    const assignmentArray = [
        {
            title: "Homework",
            status: "Completed",
            dueDate: "Friday 20 August 2021"
        },
        {
            title: "Homework2",
            status: "Incomplete",
            dueDate: "Friday 27 August 2021"
        },
        {
            title: "Week 3 Quiz",
            status: "Completed",
            dueDate: "Saturday 4 September 2021"
        }
    ]
    const assignmentList = (details) => {
        return (
            <Row style={{marginLeft: 0}}>
            <Col className="align-self-center">
                <Row >
                    <p>{details.title} {details.status === "Completed" ? 
                        <span className="badge bg-success" style={{color: "white"}}>Completed</span> : 
                        <span className="badge bg-danger" style={{color: "white"}}>Incomplete</span>}
                    </p>
                </Row>
            </Col>
            <Col className="align-self-center">
                <Row className="justify-content-end">
                    <p>{details.dueDate}</p>
                </Row>
            </Col>
        </Row>
        )
    } 
        
    
    return (
        <Container>
        <Style>
            <h1>{(props.match.params.queryId).charAt(0).toUpperCase() + (props.match.params.queryId).slice(1)}</h1>
            <p>Secondary 3</p>
            <br />
            
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
            <br />
            <Row style={{marginLeft: 0, marginBottom: 20}}>
                <h3>Assignments Due</h3>
                <div className="w-100"></div>
                <ListGroup style={{width: "100%"}}>
                    <ListGroup.Item>{assignmentList(assignmentArray[0])}</ListGroup.Item>
                    <ListGroup.Item>{assignmentList(assignmentArray[1])}</ListGroup.Item>
                    <ListGroup.Item>{assignmentList(assignmentArray[2])}</ListGroup.Item>
                </ListGroup>
            </Row>
            <br />
            <Row style={{margin: 0}}>
                <h3>Leaderboard</h3>
                <div className="w-100"></div>
                <Button variant="primary" as={Link} to="/leaderboard">Full Leaderboard</Button>
            </Row>
        </Style>
        </Container>
    );
};

export default withRouter(ClassroomPage);