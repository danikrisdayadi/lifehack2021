import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import {Container, Button, Card, CardGroup} from "react-bootstrap";
import UserProfile from "../components/userprofile";
import {Link } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';

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
            subject: "Maths",
            assignment: [1,2,3,4]
        },
        {
            teacher: 'Mr Dani',
            student: [1,2,3,4,5,6,7,8],
            subject: "Chemistry",
            assignment: [1,2,3,4]
        },
    ]);
    function onClickCard() {
        console.log("HOW")
        props.history.push("/classes")
    }
    const COLOR = [
        'primary',
        'success',
        'danger',
        'secondary',
        'warning',
        'info',
        'light',
        'dark',
    ]
    let idx = 0;
    const classCard = classes.map((c) => {
        idx+=1;
        return (
            <Card style={{ width: '1rem' }} key={c.teacher} bg={COLOR[idx]} text={COLOR[idx] === 'light' ? 'dark' : 'white'} onClick={() => onClickCard()}>
                <Card.Header>{c.teacher}</Card.Header>
                <Card.Body>
                  <Card.Title>{c.subject} </Card.Title>
                  <Card.Text>
                    {c.student.length} students
                  </Card.Text>
                </Card.Body>
            </Card>
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
                    <CardGroup>{classCard} </CardGroup>
                </div>
        </Container>
    );
};

export default withRouter(HomePage);