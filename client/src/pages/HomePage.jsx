import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import {Container, Button, Card, Row, Col} from "react-bootstrap";
import UserProfile from "../components/userprofile";
import { gradient, homeGradient } from '../utils/colours';

const HomePage = ({...props}) => {
    const [classes, setClasses] = useState([
        {
            teacher: 'Ms Winy',
            student: [1,2,3],
            subject: "Physics",
            assignment: [1,2,3,4]
        },
        {
            teacher: 'Ms Fris',
            student: [1,2,3],
            subject: "Mathematics",
            assignment: [1,2,3,4]
        },
        {
            teacher: 'Mr Dani',
            student: [1,2,3,4,5,6,7,8],
            subject: "Chemistry",
            assignment: [1,2,3,4]
        },
    ]);
    function onClickCard(queryId) {
        props.history.push("/class/" + queryId)
    }
    
    let idx = 0;
    const classCard = classes.map((c) => {
        idx+=1;
        return (
            <Col>
            <Card style={{ backgroundColor: `${homeGradient[Math.floor(idx % 5)]}`, textAlign: "left"}} key={c.teacher} text="white" onClick={() => onClickCard(c.subject.toLowerCase())}>
                <Card.Body>
                    <h3>{c.subject}</h3>
                  <Card.Text>
                    {c.student.length} students
                  </Card.Text>
                  <p>{c.teacher}</p>
                </Card.Body>
            </Card>
            </Col>
        );
    });

    return (
        <Container>
                <div id="home-profile">
                    <h3 style={{textAlign:"left", marginTop:'4%'}}>Welcome Back!</h3>
                    <UserProfile></UserProfile>
                    <Button style={{float:"right"}}>View Profile</Button>
                </div>
                <div id="home-class" style={{marginBottom:'5%'}}>
                    <h3 style={{textAlign:"left", marginTop:'4%'}}>Classes</h3>
                    <Row>{classCard} </Row>
                </div>
        </Container>
    );
};

export default withRouter(HomePage);