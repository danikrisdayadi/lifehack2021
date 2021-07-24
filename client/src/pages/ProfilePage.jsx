import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Coin from '../assets/coin.svg'
import UserProfile from "../components/userprofile";
import styled from "styled-components";
import { AvatarPlaceholder } from "../utils/placeholder";
const Style = styled.div`
    text-align: left;

`
const ProfilePage = () => {
    const [selectedAvatar, setselectedAvatar] = useState(AvatarPlaceholder);
    const selectAvatar = (selectedName) => {
        const newAvatar = {
            name: selectedName,
            picture: {location: '', key: ''},
            price: 0,
            unlocked: false,
            _id: ''
        }
        console.log("Selectavatar")
    }

    const dogAvatar = {
        name: 'dog',
        picture: { location: 'dog.png', key: '' },
        price: 100,
        unlocked: true,
        _id: ''
    }
    const birdAvatar = {
        name: 'bird',
        picture: { location: 'bird.png', key: '' },
        price: 150,
        unlocked: false,
        _id: ''
    }
    const ratAvatar = {
        name: 'rat',
        picture: { location: 'rat.png', key: '' },
        price: 250,
        unlocked: false,
        _id: ''
    }
    const availableAvatars = [dogAvatar, birdAvatar, ratAvatar];
    const avatars = availableAvatars.map((avatar) => {
        return (
            <Col >
                <Row className="justify-content-center" style={{height: 100}}>
                    <img src={`${process.env.PUBLIC_URL}/avatars/${avatar.picture.location}`} alt="avatar" width="150"/>
                </Row>
                <Row className="justify-content-center">
                    {avatar.unlocked ? 
                        <Button style={{marginTop: 20}} onClick={selectAvatar(avatar)}>Select</Button> : 
                        <Button style={{marginTop: 20}} onClick={selectAvatar(avatar)} variant="success">{avatar.price} <Image src={Coin} width="20px" style={{marginLeft: 5}}/></Button>}
                    
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