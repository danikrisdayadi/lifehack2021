import React from "react";
import {ProgressBar, Image, Card, Col, Row} from "react-bootstrap";
import DogProfile from '../assets/hurt.png';


const UserProfile = () => {
    return (
        <Card >
            <Card.Body>
              <Row className="align-items-center">
                  <Col lg="auto">
                      <Image src={DogProfile} />
                  </Col>
                  <Col>
                    <p>Lvl 2 Mathematics
                    <ProgressBar now="80" variant="success" /></p>
                    <p>Lvl 1 Physics
                    <ProgressBar now="60" variant="info" /></p>
                    <p>Lvl 3 Chemistry
                    <ProgressBar now="90" variant="warning"/></p>
                  </Col>
                </Row>
            </Card.Body>
        </Card>
    )
};


export default UserProfile;
