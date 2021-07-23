import React from "react";
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import UserProfile from "../components/userprofile";
import styled from "styled-components";

const Style = styled.div`
    text-align: left;
`
const ProfilePage = () => {
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
            </Container>
        </Style>
    );
};

export default withRouter(ProfilePage);