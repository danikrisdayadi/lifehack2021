import React, {useState} from 'react';
import {Button, Card} from 'react-bootstrap';

const AssignmentCover = () => {
    const [assignment, setAssignment] = useState(
        {
            title: "Springfield PYP 2020 Paper 1",
            questions: [1,2,3],
            status: "incomplete",
            mark: "100",
            deadline: "25/7/2021",
            id: "1"
        }
    );
    function startAssignment() {
        //set path to next question
        console.log("START ASSIGNMENT")
    }
    return (
        <div className="container">
            <Card>
                <Card.Header>Assignment {assignment.id}</Card.Header>
                <Card.Body>
                  <Card.Title>{assignment.title}</Card.Title>
                  <Card.Text>
                      <h6>Marks: {assignment.mark}</h6>
                      <h6>Due: {assignment.deadline}</h6>
                  </Card.Text>
                  <Button variant="warning" onClick={()=>startAssignment()}>Start Assignment Now</Button>
                </Card.Body>
            </Card>
        </div>

    );
};

export default AssignmentCover;
