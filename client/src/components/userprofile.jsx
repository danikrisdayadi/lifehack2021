import React from "react";
import {ProgressBar, Image, Card, Col, Row} from "react-bootstrap";
import DogProfile from '../assets/hurt.png';
import styled from "styled-components";
import { gradient } from "../utils/colours";

const UserProfile = () => {
    const student = [
        {
          name: "Mathematics",
          level: 12,
          currentXP: 15,
          maxXP: 200
        },
        {
          name: "Physics",
          level: 25,
          currentXP: 140,
          maxXP: 200
        },
        {
          name: "Economics",
          level: 45,
          currentXP: 500,
          maxXP: 790
        }
        ,
        {
          name: "Chemistry",
          level: 80,
          currentXP: 1234,
          maxXP: 2500
        }
      ];

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

    const userSummary = student.map((c) => {
      return (
        <div>
          <p>Lv. {c.level} {c.name}
          <ProgressBar now={c.currentXP / c.maxXP * 100} variant={"progress" + Math.floor(c.level / 10)}/></p>
        </div>
        
      )
    });

    return (
      <Style>
        <Card >
            <Card.Body>
              <Row className="align-items-center">
                  <Col lg="auto">
                      <Image src={DogProfile} />
                  </Col>
                  <Col style={{textAlign: "left"}}>
                    {userSummary}
                  </Col>
                </Row>
            </Card.Body>
        </Card>
      </Style>
    )
};


export default UserProfile;
