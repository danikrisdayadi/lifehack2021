import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import UserProfile from "../components/userprofile";
import styled from "styled-components";

const Style = styled.div`
    text-align: left;

`
const ProfilePage = () => {
    const availableAvatars = ["dog", "bird", "rat"];
    const avatars = availableAvatars.map((avatar) => {
        return (
            <Col >
                <Row className="justify-content-center" style={{height: 100}}>
                    <img src={`${process.env.PUBLIC_URL}/avatars/${avatar}.png`} alt="avatar" width="150"/>
                </Row>
                <Row className="justify-content-center">
                    <Button style={{marginTop: 20}}>Select</Button>
                </Row>
            </Col>
        )
    })
    return (
        <Style>
            <Container>
                <h1>ZeGrandmaster</h1>
                <br></br>
                <h3>Profile Summary</h3>
                <UserProfile />
                <br />
                <br />
                <h3>Owned Avatars</h3>
                <Row lg={6}>
                    {avatars}
                </Row>
            </Container>
        </Style>
    );
};

export default withRouter(ProfilePage);