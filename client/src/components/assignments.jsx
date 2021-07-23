import React, {useState} from "react";
import { Card, Row} from 'react-bootstrap';


const Assignments = ({...props}) => {
    const [assignmentlist, setAssignment] = useState([
        {
            title: "Springfield PYP 2020 Paper 1",
            questions: [1,2,3],
            status: "incomplete",
            mark: "100",
            deadline: "25/7/2021",
            id: "1"
        },
        {
            title: "Springfield PYP 2020 Paper 2",
            questions: [1,2,3],
            status: "incomplete",
            mark: "100",
            deadline: "26/7/2021",
            id: "2"
        },
        {
            title: "Springfield PYP 2019 Paper 1",
            questions: [1,2,3],
            status: "incomplete",
            mark: "100",
            deadline: "27/7/2021",
            id: "3"
        }
    ]);
    function onClickAssignment(assignment) {
        console.log(assignment)
        props.history.push("/assignment/1")
        console.log(props.history)
        //TODO pushing based on ID to go to each assignment
    }
    const AssignmentList = assignmentlist.map((assignment) => {
        return (
            <Card key={assignment.id} onClick={(assignment) => onClickAssignment(assignment)}>
                <Card.Body>
                    <Row className="align-items-center">
                    <Card.Title className="ml-3">{assignment.title}</Card.Title>
                    </Row>
                </Card.Body>
            </Card>
        );
    });
    return (
        <div className="container">
            {AssignmentList}
        </div>
    );
}


export default Assignments;