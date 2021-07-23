import React, { useState } from 'react';
import { Card, Image, ProgressBar, Button, Container, Col, Row } from 'react-bootstrap';
import DogProfile from '../assets/hurt.png';
import styled from 'styled-components';
import Coin from '../assets/coin.svg'
const LeaderBoard = ({ ...props }) => {
    const gradient = ["#001219", "#005f73", "#0a9396", "#94d2bd", "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226"];

    const Style = styled.div`
        .bg-progress0 {
            background-color: ${gradient[0]};
        }
        .bg-progress1 {
            background-color: ${gradient[1]};
        }
        .bg-progress2 {
            background-color: ${gradient[2]};
        }
        .bg-progress3 {
            background-color: ${gradient[3]};
        }
        .bg-progress4 {
            background-color: ${gradient[4]};
        }
        .bg-progress5 {
            background-color: ${gradient[5]};
        }
        .bg-progress6 {
            background-color: ${gradient[6]};
        }
        .bg-progress7 {
            background-color: ${gradient[7]};
        }
        .bg-progress8 {
            background-color: ${gradient[8]};
        }

    `
    const students = [
        {
            name: 'Ayam 0',
            profile: DogProfile,
            level: 35,
            progress: 80
        },
        {
            name: 'Ayam 1',
            profile: DogProfile,
            level: 21,
            progress: 80
        },
        {
            name: 'Ayam 2',
            profile: DogProfile,
            level: 16,
            progress: 90
        },
        {
            name: 'Ayam 3',
            profile: DogProfile,
            level: 9,
            progress: 50
        }
    ];

    let rank = 0;

    const leaderboard = students.map((student) => {
        rank += 1;
        return (
            <Style>
            <Card key={student.name}>
                <Card.Body>
                    <Row className="align-items-center">
                    <Col lg="auto" >
                            <h3 style={{marginBottom: 0}}>
                                #{rank}
                            </h3>
                    </Col>
                    <Col lg="auto">
                        <Image
                            src={student.profile}
                            width="100px"
                        />
                    </Col>
                    <Col lg={6}>
                        <Row><h5>{student.name}</h5></Row>
                        <Row>
                            <ProgressBar
                                now={student.progress}
                                variant={'progress' + Math.floor(student.level / 10)}
                                label={`${student.progress}/250`}
                                style={{width: "100%", color: "#9b2226 !important"}}
                            />
                        </Row>
                    </Col>
                    <Col>
                        <h3 style={{marginBottom: 0}}>Lv. {student.level}</h3>
                        </Col>
                    <Col>
                        <Button>Give {' '}
                            <img src={Coin} width="20px"/>
                        </Button>
                    </Col>
                    </Row>
                </Card.Body>
            </Card>
            </Style>
        );
    });

    return (
        <Container>
            <div id="leaderboard-title" style={{ textAlign: 'left' }}>
                <h2>Subject: Mathematics LeaderBoard</h2>
                <p>Level: Secondary 1</p>
            </div>
            <div className="container">
                <div>{leaderboard}</div>
            </div>
        </Container>
    );
};

export default LeaderBoard;
