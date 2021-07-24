import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Card,
    Image,
    ProgressBar,
    Button,
    Container,
    Col,
    Row,
    CardGroup
} from 'react-bootstrap';

import styled from 'styled-components';
import Coin from '../assets/coin.svg';
import Blur from 'react-css-blur';

const ShopPage = () => {
    const gradient = ['#001219', '#0a9396'];
    const DogProfile = `${process.env.PUBLIC_URL}/avatars/dog.png`
    const characters = [
        {
            image: DogProfile,
            price: 50
        },
        {
            image: DogProfile,
            price: 80
        },
        {
            image: DogProfile,
            price: 100
        },
        {
            image: DogProfile,
            price: 120
        },
        {
            image: DogProfile,
            price: 200
        },
        {
            image: DogProfile,
            price: 220
        },
        {
            image: DogProfile,
            price: 270
        },
        {
            image: DogProfile,
            price: 300
        }
    ];

    const button = (character) => {
        if (true) {
            // if character is not purchased
            // if (user.characters.indexOf(character) < 0) {
            return (
                <Button variant="light" style={{ marginTop: 20 }}>
                    {' '}
                    {character.price} <img src={Coin} width="20px" alt="coin" />
                </Button>
            );
        } else if (true) {
            // if character is used as avatar
            // } else if (user.characters.indexOf(character) > -1) {
            return (
                <Button
                    style={{
                        marginTop: 20,
                        backgroundColor: '#17A2B8'
                    }}
                >
                    Selected
                </Button>
            );
        } else {
            // if character is purchased but not used as avatar
            return (
                <Button
                    variant="secondary"
                    style={{
                        marginTop: 20
                    }}
                >
                    Select
                </Button>
            );
        }
    };

    const characterImage = (character) => {
        if (true) {
            // if character is not purchased
            // if (user.characters.indexOf(character) < 0) {
            return (
                <Blur radius="3px">
                    <Image src={character.image} width="100px" />
                </Blur>
            );
        } else {
            // if character is purchased but not used as avatar
            return <Image src={character.image} width="100px" />;
        }
    };

    const charactersList = characters.map((character) => {
        return (
            <Col>
                <Card style={{ width: '18rem', border: '0px', flex: 1 }}>
                    <Card.Body>
                        <Col lg="auto">
                            <Row>{characterImage(character)}</Row>
                            <Row>{button(character)}</Row>
                        </Col>
                    </Card.Body>
                </Card>
            </Col>
        );
    });

    return (
        <Container>
            <div id="leaderboard-title" style={{ textAlign: 'left' }}>
                <h1>Shop</h1>
                <br></br>
                <h5>
                    300 <img src={Coin} width="20px" alt="coin" />
                </h5>
                <br></br>
                <h4>Avatars (34% complete)</h4>
            </div>
            <div className="container"></div>
            <Row lg={4}>{charactersList} </Row>
        </Container>
    );
};

export default withRouter(ShopPage);
