import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { UserPlaceholder } from '../utils/placeholder';

const Assignments = ({ ...props }) => {
    const [profile, setProfile] = useState(UserPlaceholder);
    const [assignment, setAssignment] = useState([
        {
            title: 'Springfield PYP 2020 Paper 1',
            questions: [1, 2, 3],
            status: 'incomplete',
            mark: '100',
            deadline: '25/7/2021',
            id: '1'
        },
        {
            title: 'Springfield PYP 2020 Paper 2',
            questions: [1, 2, 3],
            status: 'incomplete',
            mark: '100',
            deadline: '26/7/2021',
            id: '2'
        },
        {
            title: 'Springfield PYP 2019 Paper 1',
            questions: [1, 2, 3],
            status: 'incomplete',
            mark: '100',
            deadline: '27/7/2021',
            id: '3'
        }
    ]);

    const allAssignments = assignment.concat(profile.assignments);

    useEffect(() => {
        setProfile(profile);
    }, [props.userProfile]);

    function onClickAssignment(queryId) {
        props.history.push('/assignment/' + queryId);
        //TODO pushing based on ID to go to each assignment
    }
    const AssignmentList = allAssignments.map((assignment) => {
        return (
            <Card
                id="assignment-list"
                key={assignment.id}
                onClick={(assignment) => onClickAssignment(assignment.id)}
            >
                <Card.Body>
                    <Row className="align-items-center">
                        <Card.Title className="ml-3">
                            {assignment.title}
                        </Card.Title>
                    </Row>
                </Card.Body>
            </Card>
        );
    });
    return <div className="container">{AssignmentList}</div>;
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    userProfile: state.userProfile
});

export default connect(mapStateToProps)(withRouter(Assignments));
